// pages/api/anthropic.js
import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Adjust size limit as needed
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { prompt, images } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const anthropicApiKey = process.env.ANTHROPIC_API_KEY || "YOUR-ANTHROPIC-KEY";
  const anthropic = new Anthropic({ apiKey: anthropicApiKey });

  try {
    // Prepare the message content with images
    const messageContent = [];

    // Add images if they exist
    if (images && images.length) {
      for (const imageData of images) {
        messageContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: imageData.media_type,
            data: imageData.data,
          },
        });
      }
    }

    // Add the text prompt
    messageContent.push({
      type: "text",
      text: prompt,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
    });

    return res.status(200).json({ result: response.content[0].text || "" });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return res.status(500).json({ error: "Failed to process prompt." });
  }
}
