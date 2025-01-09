import { parse } from "node-html-parser";

export const getParsedHTMLText = (html) => {
  const root = parse(html);

  const body = root.querySelector("body");
  if (!body) {
    console.log("⚠️ No body tag found");
    return "";
  }

  body.querySelectorAll("nav").forEach((nav) => nav.remove());

  body.querySelectorAll("il").forEach((nav) => nav.remove());

  body.querySelectorAll("script").forEach((script) => script.remove());

  body.querySelectorAll("style").forEach((style) => style.remove());

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
      "class",
      "className",
    ];

    attributesToRemove.forEach((attr) => {
      if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
      }
    });
  });

  body.querySelectorAll("path, svg, img, Image").forEach((el) => el.remove());

  // Remove comments
  const removeComments = (node) => {
    node.childNodes = node.childNodes.filter((child) => {
      if (child.nodeType === 8) return false; // 8 is comment node type
      if (child.childNodes) removeComments(child);
      return true;
    });
  };
  removeComments(body);

  // Update the allowedTags to include text-containing elements
  const allowedTags = [
    "div",
    "section",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "footer",
    "main",
    "article",
    "text",
  ];

  const cleanNode = (node) => {
    if (node.nodeType === 1) {
      // Element node
      const tagName = node.tagName.toLowerCase();

      // If it's a text-containing element, check for text content
      if (
        tagName === "div" ||
        tagName === "span" ||
        tagName.match(/^h[1-6]$/)
      ) {
        const textContent = node.text.trim();
        if (textContent) {
          // You can store or process the text content here as needed
        }
      }

      // Continue with existing logic
      if (!allowedTags.includes(tagName)) {
        return node.childNodes;
      }
      node.rawAttrs = "";
    }
    return [node];
  };

  const processNode = (node) => {
    if (!node.childNodes) return;

    let newChildren = [];
    node.childNodes.forEach((child) => {
      const processedNodes = cleanNode(child);
      processedNodes.forEach((processedNode) => {
        processNode(processedNode);
        newChildren.push(processedNode);
      });
    });
    node.childNodes = newChildren;
  };

  processNode(body);

  // Remove empty lines and excessive whitespace
  const cleanedHTML = body
    .toString()
    .replace(/^\s*[\r\n]/gm, "") // Remove empty lines
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();

  return cleanedHTML;
};
