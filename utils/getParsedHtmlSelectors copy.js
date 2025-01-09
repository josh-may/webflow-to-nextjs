import { parse } from "node-html-parser";

export const getParsedHtmlSelectors = (html) => {
  const root = parse(html);

  const body = root.querySelector("body");
  if (!body) {
    console.log("⚠️ No body tag found");
    return "";
  }

  body.querySelectorAll("script").forEach((script) => script.remove());
  body.querySelectorAll("style").forEach((style) => style.remove());
  body.querySelectorAll("path, svg, img, Image").forEach((el) => el.remove());
  body
    .querySelectorAll(".w-embed.w-iframe, iframe")
    .forEach((el) => el.remove());

  body.querySelectorAll("*").forEach((el) => {
    const attributesToRemove = [
      "style",
      "loading",
      "data-collapse",
      "data-duration",
      "data-easing",
      "data-easing2",
      "data-delay",
      "data-animation",
      "data-hover",
      "srcset",
      "sizes",
      "width",
      "height",
      "id",
      "role",
      "data-w-id",
      "data-testid",
      "decoding",
      "data-nimg",
      "target",
      "data-state",
      "rel",
      "data-orientation",
      "tabindex",
      "href",
      "type",
      "aria-expanded",
      "aria-controls",
      "data-radix-collection-item",
      "hidden aria-labelledby",
    ];

    attributesToRemove.forEach((attr) => {
      if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
      }
    });
  });

  // Function to process elements recursively
  const processElement = (element, depth = 0) => {
    // Remove class attribute only if depth > 6
    if (depth > 6 && element.hasAttribute("class")) {
      element.removeAttribute("class");
    }

    // Process child elements
    element.childNodes.forEach((child) => {
      if (child.nodeType === 1) {
        // Check if it's an element node
        processElement(child, depth + 1);
      }
    });
  };

  // Start processing from body element
  processElement(body, 1);

  return body.toString();
};
