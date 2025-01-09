// pages/index.jsx
import { useState, useEffect } from "react";
import { getParsedHTML } from "../utils/htmlParser";
import { parseHTML } from "../utils/nodeHtmlParser";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        setIsDarkMode(JSON.parse(saved));
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!url) return;
    setIsLoading(true);

    try {
      const pageHTML = await scrapePageHTML(url);

      const parsedHTML = await getParsedHTML(pageHTML);
      console.log("parsedHTML");
      console.log(parsedHTML);

      const parentHtmlElement = await getParentHtmlElement(parsedHTML);
      console.log("parentHtmlElement");
      console.log(parentHtmlElement);

      //   const coreHtmlComponents = await findCoreHtmlComponents(
      //     parentHtmlElement,
      //     parsedHTML
      //   );

      //   const componentCssSelectors = await findComponentCssSelectors(
      //     coreHtmlComponents,
      //     pageHTML
      //   );

      //   const cleanedComponentCssSelectors = await cleanComponentCssSelectors(
      //     componentCssSelectors,
      //     pageHTML
      //   );

      //   const pageScreenshots = await getPageScreenshots(
      //     cleanedComponentCssSelectors,
      //     url
      //   );

      //   const code = await convertToReact(pageScreenshots);
      //   setGeneratedCode(code);
    } catch (error) {
      console.error("❌ Error in handleSubmit:", error);
    }

    setIsLoading(false);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <Head>
        <title>Webflow to React Converter</title>
      </Head>

      <div className="max-w-6xl min-w-6xl mx-auto w-full">
        {/* Header */}
        <header
          className={`border-2 ${
            isDarkMode ? "border-gray-600" : "border-gray-400"
          } rounded-md p-4 mb-3 mt-4`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Webflow to React
            </Link>
            <nav className="flex space-x-8 items-center">
              <Link
                href="/"
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-600`}
              >
                Home
              </Link>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-300"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div
          className={`border-2 ${
            isDarkMode ? "border-gray-600" : "border-gray-400"
          } rounded-md p-8 mb-3 text-center space-y-5`}
        >
          <h1
            className={`text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Webflow to React Converter
          </h1>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } mb-6 max-w-3xl mx-auto`}
          >
            Convert your Webflow website into React code with Tailwind CSS
            styling. Simply paste your Webflow website URL below and click
            &apos;Submit&apos; to generate the React code for your project.
          </p>

          <div className="flex space-x-2 max-w-2xl mx-auto">
            <input
              type="text"
              className={`w-full border-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white"
                  : "border-gray-400 bg-white text-gray-900"
              } rounded-md px-4 py-2 focus:outline-none focus:border-blue-600`}
              placeholder="Enter Webflow URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-semibold"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Generated Code Display */}
        {generatedCode && (
          <div
            className={`border-2 ${
              isDarkMode ? "border-gray-600" : "border-gray-400"
            } rounded-md p-8 mb-3`}
          >
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              Generated React Code:
            </h2>
            <pre
              className={`text-left overflow-x-auto ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

const scrapePageHTML = async (url) => {
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

const getParentHtmlElement = async (parsedHTML) => {
  try {
    const parentElementPrompt = `Analyze this HTML structure and identify the root container element that contains all main content. Return ONLY the element tag name in lowercase (e.g., "body", "main", or "div") without any explanation or additional text. Focus on the highest-level container:\n\n${parsedHTML}`;

    const anthropicResponse = await fetch("/api/anthropic-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: parentElementPrompt,
      }),
    });

    if (!anthropicResponse.ok) {
      throw new Error("Failed to analyze HTML");
    }

    const data = await anthropicResponse.json();

    return data.result;
  } catch (error) {
    console.error("Error in getParentHtmlElement:", error);
    throw error;
  }
};

const findCoreHtmlComponents = async (parentHtmlElement, parsedHTML) => {
  try {
    const componentsPrompt = `Analyze this HTML structure and list ONLY the direct child elements under the ${parentHtmlElement} element. Return the elements as a JSON array of objects, where each object has 'tag' and 'class' properties. Exclude any <script> elements. Example format: [{"tag": "div", "class": "container"}]. Only return the JSON array without explanation. Here's the HTML:\n\n${parsedHTML}`;

    const anthropicResponse = await fetch("/api/anthropic-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: componentsPrompt,
      }),
    });

    if (!anthropicResponse.ok) {
      throw new Error("Failed to analyze HTML");
    }

    const data = await anthropicResponse.json();
    return JSON.parse(data.result);
  } catch (error) {
    console.error("Error in findCoreHtmlComponents:", error);
    throw error;
  }
};

const findComponentCssSelectors = async (coreHtmlComponents, pageHTML) => {
  try {
    const componentSelectors = [];
    const root = parseHTML(pageHTML);

    for (const component of coreHtmlComponents) {
      const selector = component.class
        ? `${component.tag}.${component.class.split(",")[0].trim()}`
        : component.tag;

      const element = root.querySelector(selector);
      const elementHTML = element ? element.toString() : "";

      if (!elementHTML) {
        continue;
      }

      const componentPrompt = `Review this HTML chunk below and identify all website components (e.g. banner, header, hero, social proof, pricing...). Break all components into individual sections and dont group them. For example if the hero has a typicaly hero section and then a demo video under it label that as two components - hero, demo vidoe. Sometimes the chunk will have no website components, and sometimes it will just have one, and sometimes many. If no component is found, return null. Output a JSON array containing objects with 'type' and 'selector' properties for each component found. Example format: [{"type": "hero", "selector": ".hero-section"}, {"type": "social-proof", "selector": ".testimonials"}] or null. Only output the JSON array and nothing else. Here's the HTML chunk:\n\n${elementHTML}`;

      const anthropicResponse = await fetch("/api/anthropic-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: componentPrompt }),
      });

      if (!anthropicResponse.ok) {
        throw new Error("Failed to analyze component");
      }

      const data = await anthropicResponse.json();

      if (data.result && data.result !== "null") {
        try {
          const parsedResults = JSON.parse(data.result);
          if (Array.isArray(parsedResults)) {
            parsedResults.forEach((result) => {
              if (result && result.type && result.selector) {
                componentSelectors.push(result);
              }
            });
          }
        } catch (e) {
          console.error("Error parsing component results:", e);
        }
      }
    }

    return componentSelectors;
  } catch (error) {
    console.error("Error in findComponentCssSelectors:", error);
    throw error;
  }
};

const cleanComponentCssSelectors = async (componentCssSelectors, pageHTML) => {
  try {
    const root = parseHTML(pageHTML);
    const cleanedSelectors = [];
    const elementMap = new Map();
    componentCssSelectors.forEach(({ selector, type }) => {
      const element = root.querySelector(selector);
      if (element) {
        elementMap.set(selector, {
          html: element.toString(),
          type: type,
        });
      }
    });
    elementMap.forEach((value, selector) => {
      let isNested = false;

      elementMap.forEach((compareValue, compareSelector) => {
        if (selector === compareSelector) return;
        if (compareValue.html.includes(value.html)) {
          isNested = true;
        }
      });
      if (!isNested) {
        cleanedSelectors.push({
          type: value.type,
          selector: selector,
        });
      }
    });

    return cleanedSelectors;
  } catch (error) {
    console.error("Error in cleanComponentCssSelectors:", error);
    throw error;
  }
};

const getPageScreenshots = async (componentSelectors, url) => {
  try {
    const screenshots = [];

    for (const component of componentSelectors) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("/api/take-screenshot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cssSelector: component.selector,
            url,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.warn(
            `Failed to capture screenshot for selector ${component.selector}:`,
            data.error
          );
          continue;
        }

        screenshots.push({
          ...component,
          imageUrl: data.imageUrl,
        });
      } catch (componentError) {
        console.warn(`Error processing ${component.selector}:`, componentError);

        continue;
      }
    }

    return screenshots;
  } catch (error) {
    console.error("Screenshot error:", error);
    throw error;
  }
};

const getBase64FromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    if (blob.size === 0) {
      console.warn("Empty blob detected");
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        if (!base64 || base64.length < 100) {
          console.warn("Invalid or empty image data detected");
          resolve(null);
        } else {
          resolve(base64);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return null;
  }
};

const convertToReact = async (pageScreenshots) => {
  const screenshotsWithBase64 = [];
  for (const screenshot of pageScreenshots) {
    const base64Data = await getBase64FromUrl(screenshot.imageUrl);
    screenshotsWithBase64.push({
      ...screenshot,
      base64Data,
    });
  }

  const validScreenshots = screenshotsWithBase64.filter((s) => s.base64Data);
  let generatedCode = "";

  const components = validScreenshots.reduce((acc, screenshot) => {
    if (!acc[screenshot.type]) {
      acc[screenshot.type] = {
        screenshots: [],
        selector: screenshot.selector,
      };
    }
    acc[screenshot.type].screenshots.push(screenshot.base64Data);
    return acc;
  }, {});

  for (const [componentName, details] of Object.entries(components)) {
    const componentImages = details.screenshots.map((data) => ({
      data: data,
      media_type: "image/png",
    }));

    const sectionPrompt = `Convert this ${componentName} website component from the provided screenshots into React and Tailwind CSS. If theres a sticky header in the screenshot, ignore it unless the component to convert is the header or navigation.

    Requirements:
    - Output a single <section> element that can be copied directly into a JSX file
    - Use semantic HTML elements
    - Use Next.js <Image> component for images
    - Use Next.js <Link> component for links
    - Use HTML entities when needed
    
    Only output the React code without any explanation, comments, sudo code, or code block markers.`;

    try {
      const codeRes = await fetch("/api/anthropic-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: sectionPrompt,
          images: componentImages,
        }),
      });

      const codeData = await codeRes.json();
      generatedCode += `{/* ${componentName} */}\n${codeData.result.trim()}\n\n`;
    } catch (error) {
      console.error(`Failed to convert component ${componentName}:`, error);
    }
  }

  return generatedCode;
};
