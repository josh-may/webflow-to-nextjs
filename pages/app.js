import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        setIsDarkMode(JSON.parse(saved));
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const scrapePageHTML = async (url) => {
    console.log("scrapePageHTML...");
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) {
      throw new Error("Failed to scrape page");
    }
    const { html } = await response.json();
    return html;
  };

  const getParenElement = async (htmlChild) => {
    try {
      const prompt = `Read the website HTML and return the CSS selector of the first html element that contains sibling elements. The result will either be the body or an html element close to it. Only return the result without any explanation. 

The result should be returned like this:
#__next > div > main
body
#main
...

website HTML:
${htmlChild}
`;

      const anthropicResponse = await fetch("/api/anthropic-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!anthropicResponse.ok) {
        throw new Error("Failed to analyze HTML");
      }

      const data = await anthropicResponse.json();
      return data.result;
    } catch (error) {
      console.error("Error in findCoreHtmlComponents:", error);
      throw error;
    }
  };

  const getSiblingArr = async (htmlChild, parenElement) => {
    console.log("getSiblingArr...");
    try {
      const prompt = `Read the HTML below and create an array of all the CSS Selectors of the sibling html elements under this parent element "${parenElement}". Return only the result without any explanation. 

Here are some example of what im looking for:
[
  "#root > div.flex.flex-col.min-h-screen.overflow-hidden > main > section.bg-white.dark\\:bg-gray-900",
  "#root > div.flex.flex-col.min-h-screen.overflow-hidden > main > section:nth-child(2)",
  ...
]

[
  "#__next > div > div > div.grid-item.css-1ccnjsp",
  "#__next > div > div > div:nth-child(2)",
  "#__next > div > div > div.grid-item.css-1qjwwd4",
  "#__next > div > div > div:nth-child(4)",
  ...
]

[
  "#__next > div > main > header",
  "#__next > div > main > section.w-full.mb-4.sm\:mb-6",
  "#meeting-info",
  ...
]
      
${htmlChild}
`;

      const anthropicResponse = await fetch("/api/anthropic-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!anthropicResponse.ok) {
        throw new Error("Failed to analyze HTML");
      }

      const data = await anthropicResponse.json();
      return data.result;
    } catch (error) {
      console.error("Error in findCoreHtmlComponents:", error);
      throw error;
    }
  };

  const getPageScreenshots = async (url) => {
    try {
      const testSelector = "#__next > div > main > section.w-full.mb-4.sm:mb-6";

      const response = await fetch("/api/take-screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cssSelector: testSelector,
          url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn(`Failed to capture screenshot: ${data.error}`);
        return null;
      }

      console.log(data.imageUrl);

      return {
        selector: testSelector,
        imageUrl: data.imageUrl,
      };
    } catch (error) {
      console.error("Screenshot error:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit...");
    if (!url) return;
    setIsLoading(true);

    try {
      // const pageHTML = await scrapePageHTML(url);
      // const htmlChild = await getHtmlChild(pageHTML);
      // const parenElement = await getParenElement(htmlChild);
      // const siblingArr = await getSiblingArr(htmlChild, parenElement);

      // Updated to use simplified version
      const screenshot = await getPageScreenshots(url);

      console.log("✅ complete");
    } catch (error) {
      console.error("❌ handleSubmit");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* INPUT */}
      <div className="max-w-6xl min-w-6xl mx-auto w-full flex-1">
        <div className="min-h-[calc(100vh+200px)] mt-10">
          <div
            className={`border-2 ${
              isDarkMode
                ? "border-zinc-600 bg-zinc-800"
                : "border-zinc-300 bg-white"
            } rounded-sm p-8 mb-3 text-center space-y-5 shadow-md`}
          >
            <div className="flex space-x-2 max-w-2xl mx-auto">
              <input
                type="text"
                className={`w-full border-2 ${
                  isDarkMode
                    ? "border-zinc-600 bg-zinc-800 text-white"
                    : "border-zinc-300 bg-white text-zinc-900"
                } rounded-sm px-4 py-2 focus:outline-none focus:border-zinc-600`}
                placeholder="Enter Webflow URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-2 bg-zinc-700 text-white rounded-sm hover:bg-zinc-600 disabled:bg-zinc-500 font-semibold"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className={`py-4 text-center mt-auto ${
          isDarkMode ? "bg-gray-950" : "bg-gray-100"
        }`}
      >
        <div className="max-w-6xl min-w-6xl mx-auto w-full flex justify-center items-center gap-2">
          <span className={`${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Made by{" "}
            <Link
              href="https://joshmmay.com"
              target="_blank"
              className="hover:underline"
            >
              Josh May
            </Link>
          </span>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-sm ${
              isDarkMode ? "text-yellow-300" : "text-zinc-700"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </footer>
    </div>
  );
}
