import sharp from "sharp";
import fetch from "node-fetch";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;
    const uniqueId = uuidv4();

    // Fetch the image
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();

    // Define viewport height (typical desktop viewport)
    const viewportHeight = 1080;

    // Calculate number of sections needed
    const numSections = Math.ceil(metadata.height / viewportHeight);

    // Split image into sections and upload to S3
    const sections = await Promise.all(
      Array.from({ length: numSections }, async (_, i) => {
        const section = await sharp(imageBuffer)
          .extract({
            left: 0,
            top: i * viewportHeight,
            width: metadata.width,
            height: Math.min(
              viewportHeight,
              metadata.height - i * viewportHeight
            ),
          })
          .toBuffer();

        const fileName = `section-${uniqueId}-${i + 1}.png`;

        // Upload to S3
        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: "show-notes-generator",
            Key: fileName,
            Body: section,
            ContentType: "image/png",
          },
        });

        await upload.done();

        return {
          name: `screenshot_${i + 1}`,
          image: `https://show-notes-generator.s3.us-east-2.amazonaws.com/${fileName}`,
        };
      })
    );

    res.status(200).json({ sections });
  } catch (error) {
    console.error("Error splitting image:", error);
    res.status(500).json({ error: "Failed to split image" });
  }
}
