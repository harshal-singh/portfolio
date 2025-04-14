import { marked } from "marked";

export const convertMarkdownToHtml = async (
  markdown: string
): Promise<string> => {
  return await marked(markdown, {
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert line breaks to <br>
  });
};
