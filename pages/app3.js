// pages/index.jsx
import { useState, useEffect } from "react";
import { getParsedHTML } from "../utils/getParsedHtmlSelectors";
import { getParsedComponentHTML } from "../utils/nodeHtmlParser";
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

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const handleSubmit = async () => {
    if (!url) return;
    setIsLoading(true);
    setGeneratedCode("");
    const startTime = Date.now();

    try {
      // const browserScreenshot = await getBrowserScreenshot(url);
      // const jsxBoilerplate = await getJsxBoilerplate(browserScreenshot);

      const pageHTML = await scrapePageHTML(url);
      // getComponentsNames - parse html so it can easily read the text, find all the main components, output as array of strings
      // findComponentCssSelector - parse html, loop over each component found in the array, find the CSS selector of that component

      const parsedHTML = getParsedHTML(pageHTML);
      console.log("parsedHTML");
      console.log(parsedHTML);

      const coreComponents = await getCoreComponents(parsedHTML);
      console.log(coreComponents);

      // const pageScreenshots = await getPageScreenshots(coreComponents, url);

      // const reactCode = await convertToReact(pageScreenshots);

      // const wrapperCode = jsxBoilerplate.replace(
      //   "<section></section>",
      //   reactCode.map((component) => component.code).join("\n")
      // );

      // setGeneratedCode(wrapperCode);

      const endTime = Date.now();
      const totalSeconds = (endTime - startTime) / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = (totalSeconds % 60).toFixed(2);

      const timeDisplay =
        minutes > 0
          ? `${minutes} minute${
              minutes !== 1 ? "s" : ""
            } and ${seconds} seconds`
          : `${seconds} seconds`;

      console.log(`Time: ${timeDisplay}`);
      console.log("✅ Conversion complete!");
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
      <Head>
        <title>Webflow to Next.js Converter</title>
      </Head>

      <div className="max-w-6xl min-w-6xl mx-auto w-full flex-1">
        {/* HEADER */}
        <header
          className={`border-2 ${
            isDarkMode
              ? "border-zinc-600 bg-zinc-800"
              : "border-zinc-300 bg-white"
          } rounded-sm p-4 mb-3 mt-4 shadow-md`}
        >
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold ml-4">
              Webflow to Next.js Converter
            </Link>
          </div>
        </header>

        <div className="min-h-[calc(100vh+200px)]">
          {/* INPUT */}
          <div
            className={`border-2 ${
              isDarkMode
                ? "border-zinc-600 bg-zinc-800"
                : "border-zinc-300 bg-white"
            } rounded-sm p-8 mb-3 text-center space-y-5 shadow-md`}
          >
            <h1 className="text-4xl font-bold">
              Paste your URL below and click Submit
            </h1>

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

          {generatedCode && (
            <div
              className={`border-2 ${
                isDarkMode
                  ? "border-zinc-600 bg-zinc-800"
                  : "border-zinc-300 bg-white"
              } rounded-sm p-8 mb-3 shadow-md`}
            >
              <h2 className={`text-2xl font-bold mb-4`}>
                Generated Next.js Code:
              </h2>
              <pre className={`text-left overflow-x-auto`}>
                <code>{generatedCode}</code>
              </pre>
            </div>
          )}
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

const getBrowserScreenshot = async (url) => {
  console.log("📸 Taking screenshot...");
  try {
    const response = await fetch("/api/take-screenshot-browser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to capture screenshot: ${data.error}`);
    }

    if (!data.imageUrl) {
      throw new Error("No image URL returned");
    }

    return data.imageUrl;
  } catch (error) {
    console.error("Screenshot error:", error);
    throw error;
  }
};

const scrapePageHTML = async (url) => {
  console.log("🐞 Scraping page HTML...");
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

const getCoreComponents = async (parsedHTML) => {
  console.log("🔍 getParsedHTML...");
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

const getPageScreenshots = async (coreComponents, url) => {
  console.log("📸 Taking screenshots...");
  try {
    const screenshots = [];
    for (const component of coreComponents) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

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
            `Failed to capture screenshot for selector "${component.selector}":`,
            data.error,
            data.details
          );

          if (data.error.includes("timeout") || data.error.includes("empty")) {
            console.log(`Retrying screenshot for "${component.selector}"...`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }

          continue;
        }

        if (!data.imageUrl) {
          console.warn(
            `No image URL returned for selector "${component.selector}"`
          );
          continue;
        }

        screenshots.push({
          ...component,
          imageUrl: data.imageUrl,
        });
      } catch (componentError) {
        console.warn(
          `Error processing "${component.selector}":`,
          componentError
        );
        continue;
      }
    }

    if (screenshots.length === 0) {
      throw new Error("No screenshots were successfully captured");
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
  console.log("🧩 Converting to Next.js...");
  let finalComponents = [];
  const sessionId = Math.random().toString(36).substring(7);

  for (const component of pageScreenshots) {
    try {
      const base64Data = await getBase64FromUrl(component.imageUrl);
      if (!base64Data) {
        console.warn(`Skipping ${component.selector} - invalid screenshot`);
        continue;
      }

      // First convert screenshot to Next.js
      const initialReactCode = await convertScreenshotToReact(
        base64Data,
        sessionId
      );

      // Then update with HTML information
      const finalCode = await updateReactWithHTML(initialReactCode, component);

      finalComponents.push({
        name: component.name,
        selector: component.selector,
        code: finalCode,
      });
    } catch (error) {
      console.error(`Failed to convert component ${component.name}:`, error);
    }
  }
  return finalComponents;
};

const convertScreenshotToReact = async (base64Data, sessionId) => {
  const componentImage = {
    data: base64Data,
    media_type: "image/png",
  };

  const visualPrompt = `Convert this screenshot into Next.js and Tailwindcss. Focus only on the visual layout and styling. If there's a header in the component and it isn't explicitly the header component, ignore it. Output a single <section> element that can be copied directly into a JSX file. Use Next.js <Image> components for images. Only output the Next.js code without any explanation, code fence markers, or pseudo code.`;

  const codeRes = await fetch("/api/anthropic-vision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: visualPrompt,
      images: [componentImage],
      sessionId,
    }),
  });

  const codeData = await codeRes.json();
  return codeData.result
    .trim()
    .replace(/^```jsx?\n/, "")
    .replace(/\n```$/, "");
};

const updateReactWithHTML = async (reactCode, component) => {
  const htmlPrompt = `Update this Next.js code with the proper links and images (if they exist) from the old HTML. Use Next.js <Link> components. Use HTML entities when needed. Don't use .map() or loops. Ignore nested dropdowns. Only output the Next.js code without any explanation, code fence markers, or pseudo code.

Original Next.js code:
${reactCode}

HTML to incorporate:
${component.html}`;

  const updateRes = await fetch("/api/anthropic-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: htmlPrompt,
    }),
  });

  const updateData = await updateRes.json();
  return updateData.result
    .trim()
    .replace(/^```jsx?\n/, "")
    .replace(/\n```$/, "");
};

const getJsxBoilerplate = async (browserScreenshot) => {
  const base64Data = await getBase64FromUrl(browserScreenshot);
  const sessionId = Math.random().toString(36).substring(7);

  const componentImage = {
    data: base64Data,
    media_type: "image/png",
  };

  const visualPrompt = `Review the screenshot and then update my Next.js and tailwindcss boilerplate code to match the background color, text color, max and min width of the website. Im converting this website from webflow to Next.js and i first need to up the boilerplate so the background color, text color, max and min width are correct then after this im going to add all the components in. Keep the only <section></section> code so i can later run a find replace to update the actual components that will go there. output the updated boilerplate code without any explanation. 
  
here's the old boilerplate:

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
      <section></section>
      </div>
    </>
  );
}
`;

  const codeRes = await fetch("/api/anthropic-vision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: visualPrompt,
      images: [componentImage],
      sessionId,
    }),
  });

  const codeData = await codeRes.json();
  return codeData.result
    .trim()
    .replace(/^```jsx?\n/, "")
    .replace(/\n```$/, "");
};
