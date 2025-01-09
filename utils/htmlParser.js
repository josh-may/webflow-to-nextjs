// utils/htmlParser.js
import { parse } from "node-html-parser";

export const getParsedHTML = (html) => {
  const root = parse(html);
  const body = root.querySelector("body");

  const limitDepth = (element, currentDepth = 0, maxDepth = 5) => {
    if (!element || currentDepth >= maxDepth) {
      return "";
    }

    const children = element.childNodes.filter((node) => node.nodeType === 1);
    const childrenHtml = children
      .map((child) => limitDepth(child, currentDepth + 1, maxDepth))
      .join("\n");

    const id = element.id ? ` id="${element.id}"` : "";
    const className = element.classList?.value
      ? ` class="${element.classList.value}"`
      : "";

    const indent = "  ".repeat(currentDepth);
    const tag = element.tagName.toLowerCase();

    if (childrenHtml) {
      return `${indent}<${tag}${id}${className}>\n${childrenHtml}\n${indent}</${tag}>`;
    }
    return `${indent}<${tag}${id}${className} />`;
  };

  const limitedBodyContent = limitDepth(body);
  return `<!DOCTYPE html>\n<html>\n${limitedBodyContent}\n</html>`;
};
