import type { PortfolioContent } from "@/lib/types";

/** Everything the AI needs — built from the live Google Sheet, never hardcoded. */
export interface BlogGenerationContext {
  author: {
    name: string;
    role: string;
    location?: string;
    shortBio?: string;
    currentRole?: string;
  };
  skillsByCategory: Record<string, string[]>;
  /** Flat deduped skill/tool names */
  skillTags: string[];
  experience: Array<{
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    tagline: string;
    stack: string[];
    role: string;
  }>;
  /** Derived from skills, stacks, and blog filter categories — for idea/draft categories */
  suggestedCategories: string[];
  /** Titles + categories of existing posts — avoid repeating themes */
  existingPosts: Array<{
    title: string;
    category: string;
    tags: string[];
    status: "published" | "draft";
  }>;
  /** Avoid repeating topics already on the journal */
  existingPostTitles: string[];
}

function uniqueStrings(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Build AI context from portfolio CMS content. Update skills/exp/projects in admin — prompts follow automatically. */
export function buildBlogGenerationContext(
  content: Pick<
    PortfolioContent,
    "profile" | "skills" | "experience" | "projects" | "blogCategories" | "blogPosts"
  > & { allBlogPosts?: PortfolioContent["blogPosts"] },
): BlogGenerationContext {
  const { profile, skills, experience, projects, blogCategories } = content;
  const allPosts = content.allBlogPosts ?? content.blogPosts;

  const skillsByCategory = Object.fromEntries(
    Object.entries(skills).map(([cat, list]) => [cat, list.filter(Boolean)]),
  );

  const skillTags = uniqueStrings(Object.values(skillsByCategory).flat());

  const projectStacks = projects.flatMap((p) => p.stack);
  const blogCats = blogCategories.filter((c) => c.toLowerCase() !== "all");

  const suggestedCategories = uniqueStrings([
    ...Object.keys(skillsByCategory),
    ...skillTags.slice(0, 12),
    ...projectStacks,
    ...blogCats,
  ]).slice(0, 20);

  return {
    author: {
      name: profile.name,
      role: profile.role,
      location: profile.location || undefined,
      shortBio: profile.shortBio || undefined,
      currentRole: profile.heroCurrentRole || undefined,
    },
    skillsByCategory,
    skillTags,
    experience: experience.map((job) => ({
      company: job.company,
      role: job.role,
      period: job.period,
      highlights: job.points.filter(Boolean).slice(0, 3),
    })),
    projects: projects.map((p) => ({
      name: p.name,
      tagline: p.tagline,
      stack: p.stack,
      role: p.role,
    })),
    suggestedCategories,
    existingPosts: allPosts.map((p) => ({
      title: p.title,
      category: p.category,
      tags: p.tags,
      status: p.published ? ("published" as const) : ("draft" as const),
    })),
    existingPostTitles: allPosts.map((p) => p.title).filter(Boolean),
  };
}

/** Compact prompt block — keeps token use reasonable. */
export function formatBlogContextForPrompt(ctx: BlogGenerationContext): string {
  const lines: string[] = [];

  lines.push("=== AUTHOR (from portfolio) ===");
  lines.push(
    `${ctx.author.name} — ${ctx.author.role}${ctx.author.location ? ` · ${ctx.author.location}` : ""}`,
  );
  if (ctx.author.currentRole) lines.push(`Current focus: ${ctx.author.currentRole}`);
  if (ctx.author.shortBio) lines.push(`Bio: ${ctx.author.shortBio}`);

  if (ctx.skillTags.length) {
    lines.push("\n=== SKILLS & TOOLS ===");
    for (const [category, items] of Object.entries(ctx.skillsByCategory)) {
      if (items.length) lines.push(`${category}: ${items.join(", ")}`);
    }
  }

  if (ctx.experience.length) {
    lines.push("\n=== EXPERIENCE (use for realistic scenarios) ===");
    for (const job of ctx.experience) {
      lines.push(`• ${job.role} @ ${job.company} (${job.period})`);
      for (const h of job.highlights) lines.push(`  - ${h}`);
    }
  }

  if (ctx.projects.length) {
    lines.push("\n=== PROJECTS (use for war stories & stack examples) ===");
    for (const p of ctx.projects) {
      lines.push(`• ${p.name} — ${p.tagline} [${p.stack.join(", ")}] (${p.role})`);
    }
  }

  if (ctx.suggestedCategories.length) {
    lines.push(`\n=== SUGGESTED CATEGORIES (pick one per post) ===`);
    lines.push(ctx.suggestedCategories.join(", "));
  }

  if (ctx.existingPosts.length) {
    lines.push(
      "\n=== EXISTING POSTS — published AND drafts (do NOT repeat these topics, projects, or technologies) ===",
    );
    for (const p of ctx.existingPosts) {
      lines.push(
        `• [${p.status}] "${p.title}" [${p.category}] tags: ${p.tags.join(", ")}`,
      );
    }
  }

  return lines.join("\n");
}

/** Grounding rules for a single draft — avoids defaulting to the same project story every time. */
export function buildDraftGroundingRules(
  idea: { title: string; excerpt?: string },
  ctx: BlogGenerationContext,
  options?: { newAngle?: boolean },
): string {
  const titleLower = idea.title.toLowerCase();
  const excerptLower = (idea.excerpt ?? "").toLowerCase();
  const combined = `${titleLower} ${excerptLower}`;

  const matchedProject = ctx.projects.find((p) =>
    combined.includes(p.name.toLowerCase()),
  );
  const matchedJob = ctx.experience.find((e) =>
    combined.includes(e.company.toLowerCase()),
  );

  let anchorRule: string;
  if (matchedProject) {
    anchorRule = `Center the post on project "${matchedProject.name}" but use a NEW scenario — not a generic "building ${matchedProject.name}" recap. Pick one specific technical decision or bug from the stack (${matchedProject.stack.slice(0, 4).join(", ")}).`;
  } else if (matchedJob) {
    anchorRule = `Ground in work at ${matchedJob.company} with a specific moment from ${matchedJob.role} — avoid a generic "my time at ${matchedJob.company}" overview.`;
  } else {
    anchorRule =
      "This idea is NOT tied to a named project or employer in the title. Write a skill/craft/process post (debugging, testing, architecture trade-offs, tooling). Do NOT invent a story about a portfolio project unless the brief explicitly asks for it.";
  }

  const avoidTitles = ctx.existingPosts
    .filter((p) => p.title.toLowerCase() !== titleLower)
    .slice(0, 10)
    .map((p) => `"${p.title}"`)
    .join("; ");

  const lines = [
    "Grounding rules (critical):",
    `- Write as ${ctx.author.name}. Use only technologies from their portfolio — no invented stacks`,
    `- ${anchorRule}`,
    "- Use the author's projects/employers as case-study evidence — not as a personal journal entry",
    "- Code examples must match their real stack (Docker/Azure if that's what they use, etc.)",
  ];

  if (avoidTitles) {
    lines.push(
      `- Do NOT repeat themes, openings, or lessons from existing posts: ${avoidTitles}`,
    );
  }

  if (options?.newAngle) {
    lines.push(
      "- Fresh angle: different opening scenario, different section focus, different code example, different takeaway",
    );
  }

  return lines.join("\n");
}

const POST_FORMATS = [
  "how-to tutorial with steps",
  "post-mortem / lesson learned",
  "opinion or hot take",
  "checklist / principles",
  "comparison or trade-offs",
  "debugging war story",
  "general craft (no company or project name in title)",
] as const;

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function postTextBlob(post: {
  title: string;
  category: string;
  tags: string[];
}): string {
  return `${post.title} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
}

/** What projects, employers, and skills are already covered by published + draft posts. */
export function analyzeTopicCoverage(
  ctx: BlogGenerationContext,
  extraTitles: string[] = [],
) {
  const usedProjects = new Set<string>();
  const usedCompanies = new Set<string>();
  const usedSkills = new Set<string>();

  const posts = [
    ...ctx.existingPosts,
    ...extraTitles.map((title) => ({ title, category: "", tags: [] as string[] })),
  ];

  for (const post of posts) {
    const blob = postTextBlob(post);
    for (const p of ctx.projects) {
      if (blob.includes(p.name.toLowerCase())) usedProjects.add(p.name);
      for (const s of p.stack) {
        if (blob.includes(s.toLowerCase())) usedSkills.add(s);
      }
    }
    for (const e of ctx.experience) {
      if (blob.includes(e.company.toLowerCase())) usedCompanies.add(e.company);
    }
    for (const skill of ctx.skillTags) {
      if (blob.includes(skill.toLowerCase())) usedSkills.add(skill);
    }
  }

  const forbiddenTitles = [
    ...ctx.existingPosts.map((p) => p.title),
    ...extraTitles,
  ].filter(Boolean);

  return { usedProjects, usedCompanies, usedSkills, forbiddenTitles, posts };
}

/** Build a shuffled pool of fresh topic angles from unused CMS material. */
export function buildFreshTopicSuggestions(
  count: number,
  ctx: BlogGenerationContext,
  extraTitles: string[] = [],
): string[] {
  const { usedProjects, usedCompanies, usedSkills } = analyzeTopicCoverage(
    ctx,
    extraTitles,
  );
  const pool: string[] = [];

  for (const p of ctx.projects) {
    if (!usedProjects.has(p.name)) {
      pool.push(
        `[Project] "${p.name}" — ${p.tagline}; stack: ${p.stack.slice(0, 5).join(", ")}`,
      );
    }
  }

  for (const job of ctx.experience) {
    if (!usedCompanies.has(job.company)) {
      for (const h of job.highlights.slice(0, 2)) {
        pool.push(`[Experience] ${job.company} (${job.role}): ${h}`);
      }
    }
  }

  const unusedSkills = ctx.skillTags.filter((s) => !usedSkills.has(s));
  for (const skill of unusedSkills) {
    pool.push(
      `[Skill/tool] ${skill} — standalone tutorial or opinion (no project name in title)`,
    );
  }

  const craftTopics = [
    "code review habits",
    "debugging under pressure",
    "technical debt estimation",
    "on-call incident response",
    "mentoring junior developers",
    "build vs buy decisions",
    "documentation that engineers actually read",
  ];
  for (const topic of craftTopics) {
    pool.push(
      `[Craft] ${topic} — general engineering practice, no project or company in title`,
    );
  }

  if (pool.length === 0) {
    pool.push(
      "[Fresh angle] Pick an experience highlight or skill NOT yet covered in existing posts",
    );
  }

  return shuffle(pool).slice(0, Math.max(count + 4, 6));
}

/** Assign shuffled fresh topics and list forbidden overlaps from existing posts. */
export function buildTopicPickerPrompt(
  count: number,
  ctx: BlogGenerationContext,
  extraTitles: string[] = [],
): string {
  const coverage = analyzeTopicCoverage(ctx, extraTitles);
  const suggestions = buildFreshTopicSuggestions(count, ctx, extraTitles);
  const assigned = shuffle(suggestions).slice(0, count);

  const forbidden: string[] = [];

  if (coverage.forbiddenTitles.length) {
    forbidden.push(
      "Post titles already on the journal (published OR draft — do not rephrase or rewrite):",
    );
    for (const t of coverage.forbiddenTitles) {
      forbidden.push(`  • "${t}"`);
    }
  }
  if (coverage.usedProjects.size) {
    forbidden.push(
      `Projects already written about — pick a DIFFERENT project or skip projects: ${[...coverage.usedProjects].join(", ")}`,
    );
  }
  if (coverage.usedCompanies.size) {
    forbidden.push(
      `Employers already covered: ${[...coverage.usedCompanies].join(", ")}`,
    );
  }
  if (coverage.usedSkills.size) {
    forbidden.push(
      `Technologies already covered in posts — use different ones: ${[...coverage.usedSkills].slice(0, 20).join(", ")}`,
    );
  }

  const assignmentLines = assigned.map((s, i) => {
    const format = POST_FORMATS[i % POST_FORMATS.length];
    return `- Idea ${i + 1}: ${s} · format: ${format}`;
  });

  return `
=== TOPIC PICKER (${count} fresh ideas) ===
Propose ${count} NEW blog ideas grounded in the portfolio above.
Each idea MUST follow its assignment below — do not reuse anchors across ideas.

${forbidden.length ? `=== FORBIDDEN (already published or saved as draft) ===\n${forbidden.join("\n")}` : "No existing posts yet — pick diverse topics from the full portfolio."}

=== YOUR ASSIGNMENTS (one per idea — mandatory) ===
${assignmentLines.join("\n")}

Critical:
- Do NOT write about forbidden projects, employers, or technologies even with different wording
- If Vue.js / Socket.io / a project name appears in FORBIDDEN, skip it entirely
- Each idea must feel like a completely different article
`;
}

/** Check if an idea repeats an existing or session topic. */
export function ideaOverlapsExisting(
  idea: { title: string; excerpt: string; tags: string[] },
  ctx: BlogGenerationContext,
  extraTitles: string[] = [],
): boolean {
  const coverage = analyzeTopicCoverage(ctx, extraTitles);
  const blob = `${idea.title} ${idea.excerpt} ${idea.tags.join(" ")}`.toLowerCase();

  for (const title of coverage.forbiddenTitles) {
    if (titlesTooSimilar(idea.title, title)) return true;
  }

  for (const proj of coverage.usedProjects) {
    if (blob.includes(proj.toLowerCase())) return true;
  }

  for (const skill of coverage.usedSkills) {
    if (skill.length > 3 && blob.includes(skill.toLowerCase())) return true;
  }

  return false;
}

function titlesTooSimilar(a: string, b: string): boolean {
  const words = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3);
  const wa = words(a);
  const wb = words(b);
  if (!wa.length || !wb.length) return false;
  const shared = wa.filter((w) => wb.includes(w)).length;
  return shared >= Math.min(3, Math.ceil(Math.min(wa.length, wb.length) * 0.45));
}

/** Remove ideas that repeat existing posts or duplicate anchors within the batch. */
export function filterUniqueIdeas<T extends { title: string; excerpt: string; tags: string[] }>(
  ideas: T[],
  ctx: BlogGenerationContext,
  extraTitles: string[] = [],
): T[] {
  const kept: T[] = [];
  const seenProjects = new Set<string>();

  for (const idea of ideas) {
    if (ideaOverlapsExisting(idea, ctx, [...extraTitles, ...kept.map((k) => k.title)])) {
      continue;
    }

    const blob = `${idea.title} ${idea.excerpt}`.toLowerCase();
    let dupAnchor = false;
    for (const p of ctx.projects) {
      if (blob.includes(p.name.toLowerCase())) {
        if (seenProjects.has(p.name)) {
          dupAnchor = true;
          break;
        }
        seenProjects.add(p.name);
      }
    }
    if (dupAnchor) continue;

    kept.push(idea);
  }

  return kept;
}

/** @deprecated Use buildTopicPickerPrompt — kept as alias for imports */
export function buildDiversityInstructions(
  count: number,
  ctx: BlogGenerationContext,
  extraTitles: string[] = [],
): string {
  return buildTopicPickerPrompt(count, ctx, extraTitles);
}

export function defaultTopicHint(_ctx: BlogGenerationContext): string {
  return "Pick topics from unused portfolio material. Never repeat published or draft posts.";
}
