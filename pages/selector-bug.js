import { useState, useEffect } from "react";
import { getParsedHTMLText } from "../utils/getParsedHTMLText";
import { getParsedHtmlSelectors } from "../utils/getParsedHtmlSelectors";
import { getHtmlChild } from "../utils/getHtmlChild";
import { getParsedComponentHTML } from "../utils/nodeHtmlParser";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const getComponentsNumber = async (pageHTML) => {
    console.log("getComponentsNumber...");

    const parsedHTMLText = getParsedHTMLText(pageHTML);

    try {
      const prompt = `Analyze the HTML and identify the main website components (banner, header, hero, reviews...). Return an array of strings like this ["banner", "header", "hero", "reviews"]. Only output the array result without any explanation. 
        
HTML to analyze:
${parsedHTMLText}`;

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
      const components = JSON.parse(data.result);
      return components.length;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getComponentSelectors = async (pageHTML, componentNames) => {
    console.log("getComponentSelectors...");
    const parsedHtmlSelectors = getParsedHtmlSelectors(pageHTML);

    console.log("parsedHtmlSelectors");
    console.log(parsedHtmlSelectors);

    const results = [];

    try {
      for (const componentName of componentNames) {
        const prompt = `Analyze the HTML and identify the opening CSS selector for the ${componentName} component. Return an object like this:

    {
      "name": "${componentName}",
      "selector": "ADD SELECTOR HERE"
    }

    Only output the JSON object without any explanation.

    HTML to analyze:
    ${parsedHtmlSelectors}`;

        console.log("prompt");
        console.log(prompt);

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
          throw new Error(`Failed to analyze HTML for ${componentName}`);
        }

        const data = await anthropicResponse.json();
        const result = JSON.parse(data.result);
        results.push(result);
      }

      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCoreComponents = async (parsedHTML) => {
    console.log("getCoreComponents...");
    try {
      const prompt = `Analyze the HTML and identify the main website components (banner, navigation, hero, reviews...). Return a JSON array of objects, where each object has name and selector. Only return the JSON array, no other text.  Example format:
  [
  {"name": "header", "selector": ".site-header"},
  {"name": "hero", "selector": ".hero-section"}
  ]
  
  HTML to analyze:
  ${parsedHTML}`;

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

      const components = JSON.parse(data.result);

      const parsedComponentHTML = getParsedComponentHTML(parsedHTML);
      const componentsWithHTML = components.map((component) => {
        const element = parsedComponentHTML.querySelector(component.selector);
        return {
          ...component,
          html: element ? element.toString() : "",
        };
      });

      return componentsWithHTML;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!url) return;
    setIsLoading(true);
    console.log("handleSubmit...");

    try {
      const pageHTML = await scrapePageHTML(url);

      const htmlChild = getHtmlChild(pageHTML);
      console.log("htmlChild");
      console.log(htmlChild);

      // const componentNumber = await getComponentsNumber(pageHTML);
      // const componentSelectors = await getComponentSelectors(
      //   pageHTML,
      //   componentNames
      // );

      // const parsedHtmlSelectors = getParsedHtmlSelectors(pageHTML);
      // console.log("parsedHtmlSelectors");
      // console.log(parsedHtmlSelectors);

      // const parsedHTMLText = getParsedHTMLText(pageHTML);
      // console.log("parsedHTMLText");
      // console.log(parsedHTMLText);

      // findComponentCssSelector - parse html, loop over each component found in the array, find the CSS selector of that component

      // const coreComponents = await getCoreComponents(parsedHTML);

      console.log("handleSubmit complete");
    } catch (error) {
      console.error("❌ Error in handleSubmit:", error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl min-w-6xl mx-auto w-full flex-1">
        <div className="min-h-[calc(100vh+200px)]">
          {/* INPUT */}
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

      {/* Footer - Removed from flex container */}
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
