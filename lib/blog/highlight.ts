import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import graphql from "highlight.js/lib/languages/graphql";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";
import { normalizeLang } from "@/lib/blog/codeBlock";

let registered = false;

function ensureLanguages() {
  if (registered) return;
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("graphql", graphql);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("yaml", yaml);
  hljs.registerLanguage("plaintext", plaintext);
  registered = true;
}

export function highlightCode(code: string, lang: string): string {
  ensureLanguages();
  const normalized = normalizeLang(lang);

  try {
    if (normalized !== "plaintext" && hljs.getLanguage(normalized)) {
      return hljs.highlight(code, { language: normalized, ignoreIllegals: true }).value;
    }
  } catch {
    // fall through to plaintext
  }

  return hljs.highlight(code, { language: "plaintext", ignoreIllegals: true }).value;
}
