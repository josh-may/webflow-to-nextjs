// pages/index.jsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        setIsDarkMode(JSON.parse(saved));
      }
    }
  }, []);

  const handleConvert = async () => {
    if (!url) return;
    setIsLoading(true);

    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const pageScreenshot = await getPageScreenshot(url);
      const splitScreenshots = await getSplitScreenshots(pageScreenshot);
      const cleanedScreenshots = await removedEmptyScreenshots(
        splitScreenshots
      );

      const result = await getPageSections(cleanedScreenshots);

      if (result) {
        setGeneratedCode(result.code);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(newMode));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <Head>
        <title>Webflow to Next.js Converter</title>
      </Head>

      <div className="max-w-6xl min-w-6xl mx-auto w-full">
        {/* Header */}
        <header
          className={`border-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-400"
          } rounded-md p-4 mb-3 mt-4`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Webflow to Next.js
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
            isDarkMode ? "border-gray-700" : "border-gray-400"
          } rounded-md p-8 mb-3 text-center space-y-5`}
        >
          <h1
            className={`text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Webflow to Next.js Converter
          </h1>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } mb-6 max-w-3xl mx-auto`}
          >
            Convert your Webflow website into Next.js code with Tailwind CSS
            styling. Simply paste your Webflow website URL below and click
            &apos;Convert&apos; to generate the Next.js code for your project.
          </p>

          <div className="flex space-x-2 max-w-2xl mx-auto">
            <input
              type="text"
              className={`w-full border-2 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-400 bg-white text-gray-900"
              } rounded-md px-4 py-2 focus:outline-none focus:border-blue-600`}
              placeholder="Enter Webflow URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-semibold"
            >
              {isLoading ? "Converting..." : "Convert"}
            </button>
          </div>

          {generatedCode && (
            <div className="text-left mt-10 space-y-4">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Generated Next.js Code:
              </h2>
              <pre
                className={`p-6 rounded-md border-2 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-300"
                    : "bg-white border-gray-400 text-gray-900"
                } overflow-auto whitespace-pre-wrap`}
              >
                {generatedCode}
              </pre>
            </div>
          )}
        </div>
        {/*  */}
      </div>
    </div>
  );
}

const getPageScreenshot = async (url) => {
  try {
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to capture screenshot");
    }

    return data.imageUrl;
  } catch (error) {
    console.error("Screenshot error:", error);
    throw error;
  }
};

const getSplitScreenshots = async (imageUrl) => {
  try {
    const response = await fetch("/api/split-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    return data.sections; // Array of { name: string, image: base64 }
  } catch (error) {
    console.error("Image splitting error:", error);
    throw error;
  }
};

const removedEmptyScreenshots = async (splitScreenshots) => {
  const getBase64FromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      if (blob.size === 0) {
        return null;
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(",")[1];
          if (!base64 || base64.length < 100) {
            resolve(null);
          } else {
            resolve(base64);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      return null;
    }
  };

  const imagesData = [];
  const startIndex = Math.max(0, splitScreenshots.length - 2);

  for (let i = startIndex; i < splitScreenshots.length; i++) {
    const screenshot = splitScreenshots[i];
    const base64Data = await getBase64FromUrl(screenshot.image);

    if (!base64Data) {
      continue;
    }

    imagesData.push({
      data: base64Data,
      media_type: "image/png",
    });
  }

  const prompt = `Analyze these screenshots and determine if any are images of just empty white space. Only respond with an array of indices (0 or 1) that correspond to empty white space images. If no images are blank, respond with an empty array. Only output the result without any explanation.`;

  try {
    const res = await fetch("/api/anthropic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        images: imagesData,
      }),
    });

    const data = await res.json();
    const blankIndices = JSON.parse(data.result);

    const cleanedScreenshots = [...splitScreenshots];
    for (let i = blankIndices.length - 1; i >= 0; i--) {
      const actualIndex = startIndex + blankIndices[i];
      cleanedScreenshots.splice(actualIndex, 1);
    }

    return cleanedScreenshots;
  } catch (error) {
    return splitScreenshots;
  }
};

const getPageSections = async (splitScreenshots) => {
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

  const imagesData = [];

  for (let i = 0; i < splitScreenshots.length; i++) {
    const screenshot = splitScreenshots[i];
    const base64Data = await getBase64FromUrl(screenshot.image);

    if (!base64Data) {
      console.warn(`Screenshot ${i + 1} was invalid or empty - skipping`);
      continue;
    }

    imagesData.push({
      data: base64Data,
      media_type: "image/png",
    });
  }

  const prompt = `analyze these ${splitScreenshots.length} screenshots of a website and identify each section in order (nav, hero, pricing...). The screenshots are in the order that users see the website from top to bottom. For each screenshot list what sections appear in it. If a section spans multiple screenshots, please note that. Only output the result without explanation.`;

  try {
    const res = await fetch("/api/anthropic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        images: imagesData,
      }),
    });

    const data = await res.json();
    const sectionsAnalysis = data.result.trim();

    const sections = sectionsAnalysis.split("\n\n");
    let generatedCode = "";

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section.trim()) continue;

      const sectionPrompt = `Convert the following website section into Next.js using Tailwind CSS. Dont write any sude code. Output the result as a <section> element so the final result can easily be copied and pasted into a JSX expression in the index.js file. use html entities when needed. Use <Image> and <Link>. Only output the result.

Section details:
${section}`;

      const codeRes = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: sectionPrompt,
          images: [imagesData[i]],
        }),
      });

      const codeData = await codeRes.json();
      generatedCode += `${codeData.result.trim()}\n\n`;
    }

    return {
      analysis: sectionsAnalysis,
      code: generatedCode,
    };
  } catch (error) {
    console.error("Failed to process images:", error);
    return null;
  }
};
