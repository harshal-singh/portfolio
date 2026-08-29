import {
  BLOG_DRAFT_RETRY_NOTE,
  buildBlogDraftPrompt,
} from "@/lib/ai/blogPrompts";
import {
  buildDraftGroundingRules,
  buildTopicPickerPrompt,
  defaultTopicHint,
  filterUniqueIdeas,
  formatBlogContextForPrompt,
  type BlogGenerationContext,
} from "@/lib/ai/buildBlogContext";
import {
  ensureContentBlocks,
  normalizeContentBlocks,
  parseGeminiJson,
  unwrapDraftPayload,
} from "@/lib/ai/parseGeminiJson";
import { normalizeBlogCover } from "@/lib/blog/covers";
import type { BlogPost } from "@/lib/types";

/**
 * Valid model IDs for Google AI Studio (generativelanguage.googleapis.com/v1beta).
 * See https://ai.google.dev/gemini-api/docs/models — names must match exactly.
 * Note: there is no "gemini-3.1-pro"; use gemini-3.1-pro-preview or gemini-2.5-pro.
 */
const DEFAULT_MODELS = [
  "gemini-3.1-pro-preview",
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-3-flash",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
] as const;

const BLOG_DRAFT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    excerpt: { type: "string" },
    category: { type: "string" },
    cover: {
      type: "string",
      enum: [
        "gradient-1",
        "gradient-2",
        "gradient-3",
        "gradient-4",
        "gradient-5",
        "gradient-6",
      ],
    },
    tags: { type: "array", items: { type: "string" } },
    content: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string" },
          text: { type: "string" },
        },
        required: ["type", "text"],
      },
    },
  },
  required: ["title", "slug", "excerpt", "category", "cover", "tags", "content"],
} as const;

function getApiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set in .env.local");
  return key;
}

function getModelCandidates(): string[] {
  const override = process.env.GEMINI_MODEL?.trim();
  if (override)
    return [override, ...DEFAULT_MODELS.filter((m) => m !== override)];
  return [...DEFAULT_MODELS];
}

function isQuotaError(message: string, status?: number) {
  const lower = message.toLowerCase();
  return (
    status === 429 ||
    lower.includes("quota") ||
    lower.includes("resource_exhausted") ||
    lower.includes("limit: 0")
  );
}

/** Model name wrong or not enabled on this key — try the next candidate. */
function isModelUnavailableError(message: string, status?: number) {
  const lower = message.toLowerCase();
  return (
    status === 404 ||
    lower.includes("not found") ||
    lower.includes("not supported for generatecontent") ||
    lower.includes("is not supported")
  );
}

async function geminiGenerateWithModel(
  model: string,
  prompt: string,
  options?: {
    jsonMode?: boolean;
    schema?: object;
    temperature?: number;
    maxOutputTokens?: number;
  },
): Promise<string> {
  const jsonMode = options?.jsonMode ?? false;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${getApiKey()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options?.temperature ?? 0.75,
          maxOutputTokens: options?.maxOutputTokens ?? 8192,
          ...(jsonMode
            ? {
                responseMimeType: "application/json",
                ...(options?.schema ? { responseSchema: options.schema } : {}),
              }
            : {}),
        },
      }),
    },
  );
  const json = await res.json();
  if (!res.ok) {
    const message = json.error?.message ?? "Gemini request failed";
    const err = new Error(message) as Error & {
      status?: number;
      model?: string;
    };
    err.status = res.status;
    err.model = model;
    throw err;
  }
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

async function geminiGenerate(
  prompt: string,
  options?: {
    jsonMode?: boolean;
    schema?: object;
    temperature?: number;
    maxOutputTokens?: number;
  },
): Promise<string> {
  const models = getModelCandidates();
  let lastError: (Error & { status?: number; model?: string }) | null = null;

  for (const model of models) {
    try {
      return await geminiGenerateWithModel(model, prompt, options);
    } catch (err) {
      const error = err as Error & { status?: number; model?: string };
      lastError = error;
      if (isQuotaError(error.message, error.status)) {
        console.warn(
          `[gemini] ${model} unavailable (${error.message.slice(0, 80)}…), trying next model`,
        );
        continue;
      }
      if (isModelUnavailableError(error.message, error.status)) {
        console.warn(
          `[gemini] ${model} not available on this key (${error.message.slice(0, 80)}…), trying next model`,
        );
        continue;
      }
      throw error;
    }
  }

  throw new Error(
    lastError?.message ??
      "All Gemini models failed. Set GEMINI_MODEL in .env.local (e.g. gemini-2.5-pro or gemini-3.1-pro-preview) and ensure your key is from https://aistudio.google.com/apikey",
  );
}

function parseJsonResponse<T>(raw: string): T {
  return parseGeminiJson<T>(raw);
}

/** ~220 words/min for technical reading */
export function estimateReadTime(
  content: { type: string; text: string }[],
): string {
  const words = content
    .flatMap((b) => b.text.split(/\s+/))
    .filter(Boolean).length;
  const minutes = Math.max(8, Math.min(18, Math.round(words / 220)));
  return `${minutes} min read`;
}

function categoryRule(ctx: BlogGenerationContext): string {
  if (ctx.suggestedCategories.length) {
    return `- category: one of [${ctx.suggestedCategories.join(", ")}] — pick the best fit for the post topic`;
  }
  return "- category: a short label matching the main technology or theme of the post";
}

export interface BlogIdea {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
}

/** Generate 1–3 blog post ideas grounded in live portfolio data. */
export async function generateBlogIdeas(
  count: number,
  topic: string | undefined,
  ctx: BlogGenerationContext,
  options?: { excludeTitles?: string[] },
): Promise<BlogIdea[]> {
  const excludeTitles = options?.excludeTitles ?? [];
  const allExclude = [...excludeTitles];

  for (let attempt = 0; attempt < 3; attempt++) {
    const portfolioBlock = formatBlogContextForPrompt(ctx);
    const topicLine = topic
      ? `Focus topic requested: ${topic} (must still avoid forbidden posts/projects/skills listed below)`
      : defaultTopicHint(ctx);
    const topicPicker = buildTopicPickerPrompt(count, ctx, allExclude);

    const retryNote =
      attempt > 0
        ? `\nRETRY ${attempt + 1}: Your previous ideas repeated forbidden topics. Pick completely different assignments from unused portfolio material.\n`
        : "";

    const prompt = `${retryNote}You are ideating posts for an engineering portfolio journal.

${portfolioBlock}

${topicPicker}

${topicLine}

Generate exactly ${count} unique post ideas. Use ONLY technologies and projects from the portfolio.

Rules for ideas:
- Titles: specific and outcome-oriented (include a number when natural)
- Avoid clickbait: "Beyond the Build", "Unlocking", "Mastering", "The Ultimate Guide"
- Excerpt: 2 sentences — blog meta description (what the reader will learn), not a personal story
- slug: kebab-case, max 60 chars
- tags: Title Case, 2-4 tags
${categoryRule(ctx)}
- NEVER reuse a project, employer, or technology listed under FORBIDDEN
- Excerpt must read like a blog meta description (what the reader learns), not a diary entry

Return ONLY valid JSON array (no markdown):
[{"title":"...","slug":"...","excerpt":"...","category":"...","tags":["..."]}]`;

    const raw = await geminiGenerate(prompt, {
      jsonMode: true,
      temperature: 0.85,
    });
    const parsed = parseJsonResponse<unknown>(raw);
    let ideas: BlogIdea[];
    if (Array.isArray(parsed)) ideas = parsed as BlogIdea[];
    else if (parsed && typeof parsed === "object") {
      const o = parsed as Record<string, unknown>;
      ideas = Array.isArray(o.ideas)
        ? (o.ideas as BlogIdea[])
        : [parsed as BlogIdea];
    } else {
      ideas = [parsed as BlogIdea];
    }

    const unique = filterUniqueIdeas(ideas, ctx, excludeTitles);
    if (unique.length >= count) return unique.slice(0, count);

    console.warn(
      `[gemini] ${unique.length}/${count} ideas passed uniqueness check (attempt ${attempt + 1})`,
    );
    allExclude.push(...ideas.map((i) => i.title));
  }

  throw new Error(
    "Could not generate fresh ideas — too many topics already covered. Try a focus topic or add new projects/skills in admin.",
  );
}

export interface GeneratedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string;
  readTime: string;
  tags: string[];
  content: { type: string; text: string }[];
}

function parseDraftResponse(raw: string): GeneratedBlogPost {
  const parsed = parseJsonResponse<unknown>(raw);
  const payload = unwrapDraftPayload(parsed);

  const draft: GeneratedBlogPost = {
    title: String(payload.title ?? ""),
    slug: String(payload.slug ?? ""),
    excerpt: String(payload.excerpt ?? ""),
    category: String(payload.category ?? ""),
    cover: normalizeBlogCover(payload.cover),
    readTime: String(payload.readTime ?? ""),
    tags: Array.isArray(payload.tags) ? payload.tags.map(String) : [],
    content: [],
  };

  draft.content = normalizeContentBlocks(
    payload.content ?? payload.blocks ?? payload.body ?? payload.sections,
  );

  if (
    draft.content.length < 3 &&
    typeof payload.body === "string" &&
    payload.body.trim()
  ) {
    draft.content = normalizeContentBlocks(payload.body);
  }

  return draft;
}

function normalizeDraft(draft: GeneratedBlogPost): GeneratedBlogPost {
  const content = ensureContentBlocks(draft.content);
  return {
    ...draft,
    slug: draft.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 72),
    cover: normalizeBlogCover(draft.cover),
    tags: (draft.tags ?? []).map((t) =>
      t.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/^Devops$/i, "DevOps"),
    ),
    readTime: estimateReadTime(content),
    content,
  };
}

/** Generate a full draft from a title/topic, grounded in portfolio data. */
export async function generateBlogPost(
  idea: {
    title: string;
    category?: string;
    excerpt?: string;
  },
  ctx: BlogGenerationContext,
  options?: { newAngle?: boolean },
): Promise<GeneratedBlogPost> {
  const portfolioBlock = formatBlogContextForPrompt(ctx);
  const grounding = buildDraftGroundingRules(idea, ctx, options);

  const prompt = buildBlogDraftPrompt({
    portfolioBlock,
    grounding,
    title: idea.title,
    category: idea.category,
    excerpt: idea.excerpt,
  });

  const draftOptions = {
    jsonMode: true as const,
    schema: BLOG_DRAFT_SCHEMA,
    temperature: 0.7,
    maxOutputTokens: 16384,
  };

  const raw = await geminiGenerate(prompt, draftOptions);

  try {
    return normalizeDraft(parseDraftResponse(raw));
  } catch (firstErr) {
    console.warn("[gemini] draft parse failed, retrying once:", firstErr);
    const retryRaw = await geminiGenerate(
      `${prompt}\n\n${BLOG_DRAFT_RETRY_NOTE}`,
      draftOptions,
    );
    return normalizeDraft(parseDraftResponse(retryRaw));
  }
}

/** Generate ideas then full drafts for each (sequential — easier on free tier). */
export async function generateBlogIdeasWithDrafts(
  count: number,
  topic: string | undefined,
  ctx: BlogGenerationContext,
  onProgress?: (done: number, total: number, title: string) => void,
  options?: { excludeTitles?: string[] },
): Promise<Array<BlogIdea & { draft: GeneratedBlogPost }>> {
  const ideas = await generateBlogIdeas(count, topic, ctx, options);
  const results: Array<BlogIdea & { draft: GeneratedBlogPost }> = [];

  for (let i = 0; i < ideas.length; i++) {
    const idea = ideas[i];
    onProgress?.(i, ideas.length, idea.title);
    try {
      const draft = await generateBlogPost(idea, ctx);
      results.push({ ...idea, draft });
    } catch (err) {
      console.error(`[gemini] draft failed for "${idea.title}":`, err);
      throw err instanceof Error
        ? new Error(`Draft failed for "${idea.title}": ${err.message}`)
        : err;
    }
    onProgress?.(i + 1, ideas.length, idea.title);
  }

  return results;
}

export function ideaToBlogPost(
  idea: BlogIdea,
  draft?: GeneratedBlogPost,
): BlogPost {
  const base = draft ?? {
    title: idea.title,
    slug: idea.slug,
    excerpt: idea.excerpt,
    category: idea.category,
    cover: "gradient-1",
    readTime: "8 min read",
    tags: idea.tags,
    content: [{ type: "p", text: idea.excerpt }],
  };
  const content = base.content;
  return {
    slug: base.slug,
    title: base.title,
    excerpt: base.excerpt,
    category: base.category,
    readTime: draft
      ? estimateReadTime(content)
      : (base.readTime ?? "8 min read"),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    cover: normalizeBlogCover(draft?.cover ?? base.cover),
    imageUrl: "",
    tags: base.tags ?? idea.tags,
    published: false,
    featured: false,
    content,
  };
}

// Re-export for convenience
export { buildBlogGenerationContext } from "@/lib/ai/buildBlogContext";
export type { BlogGenerationContext } from "@/lib/ai/buildBlogContext";
