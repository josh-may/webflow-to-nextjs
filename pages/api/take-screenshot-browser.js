// pages/api/take-screenshot.js

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import { ScrapingBeeClient } from "scrapingbee";

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const scrapingBeeClient = new ScrapingBeeClient(
  process.env.SCRAPINGBEE_API_KEY
);

export const config = {
  api: {
    bodyParser: true,
  },
};

const uploadToS3WithRetry = async (params, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const upload = new Upload({
        client: s3Client,
        params,
      });

      await upload.done();
      return true;
    } catch (error) {
      console.log(`Upload attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
};

// Add retry logic for ScrapingBee requests
const getScreenshotWithRetry = async (client, options, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await client.get(options);
      return response;
    } catch (error) {
      console.log(`Screenshot attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) throw error;
      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { url } = req.body;

  if (!url) {
    console.log("❌ URL is missing");
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    console.log("🔄 Starting screenshot capture");
    const response = await getScreenshotWithRetry(scrapingBeeClient, {
      url: url,
      params: {
        screenshot: true,
        render_js: true,
        json_response: true,
        block_resources: false,
        timeout: 10000,
      },
    });

    // Add validation for screenshot data
    const jsonResponse = JSON.parse(response.data);
    if (!jsonResponse.screenshot || jsonResponse.screenshot.length === 0) {
      throw new Error("Empty screenshot received");
    }

    console.log("📸 Screenshot captured successfully");
    const buffer = Buffer.from(jsonResponse.screenshot, "base64");
    const fileName = `screenshot-${uuidv4()}.png`;

    console.log("⬆️ Uploading to S3...");
    await uploadToS3WithRetry({
      Bucket: "show-notes-generator",
      Key: fileName,
      Body: buffer,
      ContentType: "image/png",
    });
    console.log("✅ Upload complete");

    const imageUrl = `https://show-notes-generator.s3.us-east-2.amazonaws.com/${fileName}`;

    return res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.log("❌ Error:", error.message);
    console.log("Error stack:", error.stack);

    // More specific error response
    return res.status(500).json({
      error: "Failed to capture screenshot",
      details: error.message,
      selector: url,
    });
  }
}
