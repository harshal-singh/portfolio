/** Parse JSON from Gemini — handles markdown fences and minor formatting issues. */
export function parseGeminiJson<T>(raw: string): T {
  let text = raw.trim();
  text = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");

  try {
    return JSON.parse(text) as T;
  } catch {
    const arrayStart = text.indexOf("[");
    const objectStart = text.indexOf("{");
    let start = -1;
    let end = -1;

    if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
      start = arrayStart;
      end = text.lastIndexOf("]");
    } else if (objectStart !== -1) {
      start = objectStart;
      end = text.lastIndexOf("}");
    }

    if (start !== -1 && end !== -1 && end > start) {
      const slice = text.slice(start, end + 1);
      try {
        return JSON.parse(slice) as T;
      } catch {
        // fall through
      }
    }

    throw new Error("AI returned invalid JSON. Try generating the draft again.");
  }
}

function coerceBlock(raw: unknown): { type: string; text: string } | null {
  if (typeof raw === "string") {
    const text = raw.trim();
    return text ? { type: "p", text } : null;
  }
  if (!raw || typeof raw !== "object") return null;

  const o = raw as Record<string, unknown>;
  const type = String(o.type ?? o.blockType ?? o.kind ?? o.tag ?? "p")
    .trim()
    .toLowerCase();
  const textValue = o.text ?? o.content ?? o.body ?? o.value ?? o.data ?? o.markdown;
  const text =
    typeof textValue === "string"
      ? textValue.trim()
      : Array.isArray(textValue)
        ? textValue.map(String).join("\n").trim()
        : "";

  if (!text) return null;
  return { type: type || "p", text };
}

/** Normalize many possible Gemini content shapes into our block format. */
export function normalizeContentBlocks(content: unknown): { type: string; text: string }[] {
  if (content == null) return [];

  if (typeof content === "string") {
    const trimmed = content.trim();
    if (!trimmed) return [];
    try {
      return normalizeContentBlocks(JSON.parse(trimmed));
    } catch {
      return trimmed
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((text) => ({ type: "p", text }));
    }
  }

  if (Array.isArray(content)) {
    return content
      .map(coerceBlock)
      .filter((b): b is { type: string; text: string } => b !== null);
  }

  if (typeof content === "object") {
    const o = content as Record<string, unknown>;
    for (const key of ["blocks", "content", "sections", "items", "body"]) {
      if (key in o) {
        const nested = normalizeContentBlocks(o[key]);
        if (nested.length) return nested;
      }
    }
  }

  return [];
}

export function unwrapDraftPayload(parsed: unknown): Record<string, unknown> {
  let obj: unknown = parsed;
  if (Array.isArray(obj)) obj = obj[0];
  if (!obj || typeof obj !== "object") {
    throw new Error("AI draft response was not an object.");
  }
  const o = obj as Record<string, unknown>;
  if (o.post && typeof o.post === "object") return o.post as Record<string, unknown>;
  if (o.draft && typeof o.draft === "object") return o.draft as Record<string, unknown>;
  if (o.blogPost && typeof o.blogPost === "object") return o.blogPost as Record<string, unknown>;
  return o;
}

export function ensureContentBlocks(
  content: unknown,
): { type: string; text: string }[] {
  const blocks = normalizeContentBlocks(content).filter((b) => b.text.length > 0);

  if (blocks.length < 3) {
    throw new Error(
      `AI draft only produced ${blocks.length} content block(s). Try "Regenerate draft" or "New angle".`,
    );
  }
  return blocks;
}

/** Serialize blocks for the admin textarea (type|text per line). */
export function blocksToEditorLines(blocks: { type: string; text: string }[]): string {
  return blocks.map((b) => `${b.type}|${b.text.replace(/\n/g, "\\n")}`).join("\n");
}
