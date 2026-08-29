export interface ParsedCodeBlock {
  lang: string;
  label: string;
  code: string;
}

const LANG_ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  node: "javascript",
  nodejs: "javascript",
  ts: "typescript",
  tsx: "typescript",
  sh: "bash",
  shell: "bash",
  yml: "yaml",
  gql: "graphql",
  plain: "plaintext",
  text: "plaintext",
  txt: "plaintext",
  md: "plaintext",
  http: "plaintext",
  api: "plaintext",
};

export const LANG_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  graphql: "GraphQL",
  json: "JSON",
  bash: "Bash",
  yaml: "YAML",
  plaintext: "Plain text",
};

export function normalizeLang(lang: string | undefined): string {
  const raw = (lang ?? "").trim().toLowerCase();
  if (!raw) return "plaintext";
  return LANG_ALIASES[raw] ?? raw;
}

export function langLabel(lang: string, code: string): string {
  const normalized = normalizeLang(lang);
  if (normalized === "plaintext" && /^(GET|POST|PUT|PATCH|DELETE)\s+\//m.test(code)) {
    return "HTTP";
  }
  if (normalized === "plaintext" && /^[\[{]/.test(code.trim()) && /"\w+"\s*:/.test(code)) {
    return "JSON";
  }
  return LANG_LABELS[normalized] ?? lang.charAt(0).toUpperCase() + lang.slice(1);
}

/** Undo CMS / editor escaping in stored block text. */
export function unescapeCode(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
}

export function parseCodeBlock(text: string): { lang?: string; code: string } {
  const unescaped = unescapeCode(text);
  const match = unescaped.match(/^(?:\/\/|#)\s*lang:\s*([\w.-]+)\s*\n/i);
  if (match) {
    return { lang: match[1], code: unescaped.slice(match[0].length).replace(/^\n/, "") };
  }
  return { code: unescaped };
}

export function inferLanguage(code: string): string {
  const trimmed = code.trimStart();

  if (/^(query|mutation|subscription)\s+\w/m.test(trimmed)) return "graphql";
  if (/^[\[{]/.test(trimmed) && /"[\w-]+"\s*:/.test(trimmed)) return "json";
  if (/^(GET|POST|PUT|PATCH|DELETE)\s+\//m.test(trimmed)) return "plaintext";
  if (/\buseEffect\b|\buseState\b|\buseMemo\b/.test(code)) return "javascript";
  if (/^import\s+/.test(trimmed) || /:\s*(string|number|boolean|void)\b/.test(code)) {
    return "typescript";
  }
  if (/^[\w-]+:\s/m.test(trimmed) && trimmed.includes("\n")) return "yaml";

  return "plaintext";
}

export function prepareCodeBlock(text: string): ParsedCodeBlock {
  const { lang, code } = parseCodeBlock(text);
  const resolvedLang = lang ? normalizeLang(lang) : inferLanguage(code);
  return {
    lang: resolvedLang,
    label: langLabel(resolvedLang, code),
    code,
  };
}
