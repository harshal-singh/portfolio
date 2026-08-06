/**
 * Prompt templates for AI blog drafts.
 * Style target: Vercel Blog, LogRocket, CSS-Tricks, Dev.to — not personal journaling.
 */

import { blogCoverPromptBlock } from "@/lib/blog/covers";

export const TECH_BLOG_STYLE = `=== TECHNICAL BLOG STYLE (mandatory) ===
Write like a published engineering blog post — the kind on Vercel, LogRocket, CSS-Tricks, or a strong Dev.to tutorial.

Editorial rules:
- Teach the reader something concrete. The reader is "you"; the author shares evidence from real work.
- Open with THE PROBLEM or THE GOAL — not a memoir ("When I started this project…" is OK only as one sentence of context, then move to the topic).
- Every h2 is a scannable section title a reader would expect in a professional tutorial or deep-dive.
- Explain BEFORE every code block (why we're doing this). Explain AFTER (what to notice, what breaks in prod).
- Use metrics, comparisons, and trade-offs — not vague feelings.
- Short paragraphs (2-4 sentences). No walls of text.
- Confident and direct. Opinionated when comparing approaches.

Banned (journal / diary tone):
- "What I learned" or "Lessons learned" as the main closing section title
- "In today's fast-paced world", "delve", "leverage", "game-changer", "Let's dive in"
- Ending that only reflects on personal growth with no actionable summary
- Fewer than 6 h2 sections
- A post that reads like a build log or diary entry`;

/** Block-by-block blueprint the model must follow. */
export const TECH_BLOG_BLUEPRINT = `=== ARTICLE BLUEPRINT (22–32 blocks — follow this order) ===

Write ALL sections below. Use exact section themes; adapt titles to the topic.

1–2. LEAD (two "p" blocks)
   • Block 1: The problem or goal — why this topic matters to engineers right now.
   • Block 2: Scope — what this article covers, who it's for, and what they'll be able to do after reading.

3. h2: "Why [topic] is worth your attention" (or "The problem with [status quo]")
   • "p": Context — industry pain, cost of getting it wrong, or common misconception.

4. h2: "Prerequisites" (or "What you'll need")
   • "ul": 3–5 items — tools, versions, or knowledge assumed. Format: Item one|Item two|Item three

5. h2: "How [core concept] works"
   • "p": Conceptual overview in plain language.
   • "h3": One important sub-concept.
   • "p": Deeper detail on that sub-concept.

6. h2: "Setting up [first major step]"
   • "p": What we're building in this step and why.
   • "code": Working example — first line MUST be // lang: typescript OR # lang: yaml OR # lang: bash
   • "p": Walk through the code — call out 2–3 important lines.

7. h2: "Implementing [second major step]"
   • "p": Next layer of the solution.
   • "code": Second code block (different concern from step 6).
   • "p": What this enables and one thing that can go wrong.

8. h2: "Production considerations" (or "Handling edge cases")
   • "p": Real-world concern — scaling, errors, security, or performance.
   • "blockquote": One sharp pro-tip or warning (1–2 sentences).

9. h2: "Trade-offs and alternatives"
   • "p": No silver bullet — when a different approach wins.
   • "ul": Compare 3 options — e.g. Approach A: fast but brittle|Approach B: slower but safer|Approach C: best for teams at scale

10. h2: "Common mistakes to avoid"
    • "ul": 3–4 specific pitfalls with brief descriptions in each item.

11. h2: "Measuring success" (or "Benchmarks and results" — skip only if purely conceptual)
    • "p": Include at least one concrete number (latency, bundle size, deploy time, error rate, etc.).

12. h2: "Key takeaways"
    • "ul": 4–5 actionable bullet points the reader can apply tomorrow. NOT reflective diary bullets.

13. CLOSING "p": One forward-looking sentence — next step, related topic, or when to revisit this approach.

Block types allowed: p, h2, h3, code, ul, blockquote
Minimum counts: 6+ h2, 1+ h3, 2+ code, 3+ ul, 1+ blockquote, 22+ total blocks`;

export const TECH_BLOG_EXAMPLE = `=== STRUCTURE EXAMPLE (match this shape, not this topic) ===
Title: "Shipping SSR on Next.js: how I cut page loads by 35%"

Blocks (abbreviated):
p | Slow client-rendered marketing pages hurt SEO and LCP. This guide walks through the rendering and caching decisions that cut p75 LCP by 35% on a production CMS.
p | You'll learn how to pick SSR vs ISR per route, fix the image pipeline, and measure changes with field data — not just Lighthouse.
h2 | Why rendering strategy matters per route
p | ...
h2 | Prerequisites
ul | Next.js 14+|Node 20+|Basic familiarity with Web Vitals
h2 | How ISR fits a content-heavy site
p | ...
h3 | When to revalidate vs on-demand
p | ...
h2 | Setting up ISR for marketing pages
p | ...
code | // lang: typescript\\nexport const revalidate = 60;
p | ...
h2 | Fixing the image pipeline
...
h2 | Key takeaways
ul | Pick rendering mode per route, not globally|Images are usually 60% of perf wins|Validate with field Web Vitals, not lab scores alone
p | Start with your slowest public route and measure before touching the rest of the app.`;

export function buildBlogDraftPrompt(params: {
  portfolioBlock: string;
  grounding: string;
  title: string;
  category?: string;
  excerpt?: string;
}): string {
  const { portfolioBlock, grounding, title, category, excerpt } = params;

  return `Write a full technical blog article for an engineering portfolio.

${portfolioBlock}

Post brief:
- Title: ${title}
${category ? `- Category: ${category}` : ""}
${excerpt ? `- Angle / promise to the reader: ${excerpt}` : ""}

${grounding}

${TECH_BLOG_STYLE}

${TECH_BLOG_BLUEPRINT}

${TECH_BLOG_EXAMPLE}

${blogCoverPromptBlock()}

Output rules:
- Title must match the article body
- excerpt: 2–3 sentences written like a blog meta description (what the reader gains), NOT the first paragraph
- slug: kebab-case, max 60 chars
- tags: Title Case, 2–4 tags from the author's stack
- cover: exactly one id from the cover gradient list above
- readTime: ignored (computed server-side)
- content: array of 22–32 blocks following the blueprint above

Return ONLY valid JSON (no markdown fences):
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "category": "...",
  "cover": "gradient-2",
  "readTime": "ignored",
  "tags": ["..."],
  "content": [{"type":"p","text":"..."},{"type":"h2","text":"..."}, ...]
}`;
}

export const BLOG_DRAFT_RETRY_NOTE = `IMPORTANT: Your previous response was too short or not structured like a technical blog.
Return JSON with a "content" array of at least 22 objects following the blueprint:
lead paragraphs → Why it matters → Prerequisites (ul) → How it works (with h3) → Setup (code) → Implementation (code) → Production → Trade-offs (ul) → Mistakes (ul) → Results → Key takeaways (ul) → closing p.
Include "cover" as one of: gradient-1, gradient-2, gradient-3, gradient-4, gradient-5, gradient-6 (pick by topic mood).
Each object MUST have "type" (p|h2|h3|code|ul|blockquote) and "text" (string). ul items separated by |.`;
