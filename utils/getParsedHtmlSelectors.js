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
  body
    .querySelectorAll("path, svg, img, Image, ul")
    .forEach((el) => el.remove());
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
      "hidden",
      "aria-labelledby",
    ];

    attributesToRemove.forEach((attr) => {
      if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
      }
    });
  });

  const processElement = (element, depth = 0) => {
    if (depth > 6 && element.hasAttribute("class")) {
      element.removeAttribute("class");
    }

    element.childNodes.forEach((child) => {
      if (child.nodeType === 1) {
        processElement(child, depth + 1);
      }
    });
  };

  processElement(body, 1);

  // Remove all text nodes that are not within h1, h2, or h3 tags
  const removeNonHeaderText = (element) => {
    const isWithinHeader = (node) => {
      let current = node;
      while (current) {
        if (current.tagName?.match(/^[Hh][1-3]$/)) {
          return true;
        }
        current = current.parentNode;
      }
      return false;
    };

    element.childNodes.forEach((child) => {
      if (child.nodeType === 3 && !isWithinHeader(child)) {
        // Remove text nodes that aren't within h1-h3 (including nested elements)
        child.remove();
      } else if (child.nodeType === 1) {
        // Recursively process element nodes
        removeNonHeaderText(child);
      }
    });
  };

  removeNonHeaderText(body);

  return body.toString();
};
