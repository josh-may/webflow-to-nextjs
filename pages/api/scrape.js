// pages/api/scrape.js

import { ScrapingBeeClient } from "scrapingbee";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const client = new ScrapingBeeClient(process.env.SCRAPINGBEE_API_KEY);

    const response = await client.get({
      url: url,
      params: {
        render_js: true,
        wait_for: "body",
        return_page_source: true,
      },
    });

    // Convert the response buffer to text
    const decoder = new TextDecoder();
    const fullHtml = decoder.decode(response.data);

    return res.status(200).json({
      html: fullHtml,
    });
  } catch (error) {
    console.error("ScrapingBee error:", error);
    return res.status(500).json({
      error: "Failed to scrape the page",
      details: error.message,
    });
  }
}
