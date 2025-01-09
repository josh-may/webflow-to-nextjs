import { parse } from "node-html-parser";

export const getParsedComponentHTML = (html) => {
  return parse(html);
};
