/** Hero gradient covers — ids must match keys in lib/seed.ts gradientMap. */
export const BLOG_COVER_IDS = [
  "gradient-1",
  "gradient-2",
  "gradient-3",
  "gradient-4",
  "gradient-5",
  "gradient-6",
] as const;

export type BlogCoverId = (typeof BLOG_COVER_IDS)[number];

/** Hints for the AI — pick one that fits the post topic/mood. */
export const BLOG_COVER_HINTS: Record<BlogCoverId, string> = {
  "gradient-1": "lime/emerald — performance, growth, Next.js, general engineering",
  "gradient-2": "cyan/blue — cloud, APIs, backend, DevOps, Docker, Azure",
  "gradient-3": "rose/orange — frontend, UX, design systems, React, Vue",
  "gradient-4": "violet/fuchsia — AI/ML, Gemini, real-time, WebRTC, innovation",
  "gradient-5": "amber/orange — CI/CD, pipelines, tooling, productivity",
  "gradient-6": "teal/emerald — security, testing, reliability, infrastructure",
};

export const DEFAULT_BLOG_COVER: BlogCoverId = "gradient-1";

export function normalizeBlogCover(value: unknown): BlogCoverId {
  const id = String(value ?? "").trim() as BlogCoverId;
  if (BLOG_COVER_IDS.includes(id)) return id;
  return DEFAULT_BLOG_COVER;
}

export function blogCoverPromptBlock(): string {
  const lines = BLOG_COVER_IDS.map(
    (id) => `- "${id}": ${BLOG_COVER_HINTS[id]}`,
  );
  return `=== COVER GRADIENT (required — pick ONE id for the post hero) ===
Choose the gradient that best matches the topic mood. Do not always pick gradient-1.
${lines.join("\n")}`;
}

export const BLOG_COVER_LABELS: Record<BlogCoverId, string> = {
  "gradient-1": "Emerald / lime",
  "gradient-2": "Cyan / blue",
  "gradient-3": "Rose / orange",
  "gradient-4": "Violet / fuchsia",
  "gradient-5": "Amber / orange",
  "gradient-6": "Teal / emerald",
};
