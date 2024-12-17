// pages/api/scrape.js
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const response = await scrapingBeeClient.get({
      url,
      params: {
        screenshot: true,
        screenshot_full_page: true,
        render_js: true,
        window_width: 1920,
        window_height: 1080,
        json_response: true,
      },
    });

    const jsonResponse = JSON.parse(response.data);
    const buffer = Buffer.from(jsonResponse.screenshot, "base64");
    const fileName = `screenshot-${uuidv4()}.png`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: "show-notes-generator",
        Key: fileName,
        Body: buffer,
        ContentType: "image/png",
      },
    });

    await upload.done();

    const imageUrl = `https://show-notes-generator.s3.us-east-2.amazonaws.com/${fileName}`;

    return res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to capture screenshot",
      details: error.message,
    });
  }
}
