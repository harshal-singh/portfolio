import { seedContent } from "@/lib/seed";
import { normalizeExperienceList } from "@/lib/experience/normalize";
import { normalizeProjectList } from "@/lib/projects/normalize";
import { normalizeBlogCover } from "@/lib/blog/covers";
import type {
  Achievement,
  BlogPost,
  Education,
  Experience,
  PortfolioContent,
  Profile,
  Project,
  SectionMeta,
  Testimonial,
  Stat,
} from "@/lib/types";
import { SECTION_IDS, SHEET_TABS, type SheetTab } from "./schema";

function splitPipe(value: string | undefined): string[] {
  if (!value) return [];
  return value.split("|").map((s) => s.trim()).filter(Boolean);
}

function splitTechnologies(value: string | undefined): string[] {
  if (!value) return [];
  const sep = value.includes("|") ? "|" : ",";
  return value.split(sep).map((s) => s.trim()).filter(Boolean);
}

function sortByOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

function profileFromRows(rows: string[][]): Profile {
  const map = Object.fromEntries(rows.map((r) => [r[0], r[1] ?? ""]));
  const fallback = seedContent.profile;
  return {
    name: map.name || fallback.name,
    firstName: map.firstName || fallback.firstName,
    lastName: map.lastName || fallback.lastName,
    role: map.role || fallback.role,
    shortBio: map.shortBio || fallback.shortBio,
    location: map.location || fallback.location,
    email: map.email || fallback.email,
    phone: map.phone || fallback.phone,
    website: map.website || fallback.website,
    status: map.status || fallback.status,
    heroCurrentRole: map.heroCurrentRole || fallback.heroCurrentRole,
    heroHeadline: map.heroHeadline ?? fallback.heroHeadline,
    heroHighlight: map.heroHighlight ?? fallback.heroHighlight,
    heroValueProp: map.heroValueProp ?? fallback.heroValueProp,
    heroPrimaryCtaLabel: map.heroPrimaryCtaLabel ?? fallback.heroPrimaryCtaLabel,
    heroPrimaryCtaHref: map.heroPrimaryCtaHref ?? fallback.heroPrimaryCtaHref,
    heroSecondaryCtaLabel: map.heroSecondaryCtaLabel ?? fallback.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: map.heroSecondaryCtaHref ?? fallback.heroSecondaryCtaHref,
    footerTagline: map.footerTagline || fallback.footerTagline,
    contactAvailabilityDescription:
      map.contactAvailabilityDescription ?? fallback.contactAvailabilityDescription,
    contactFormLabel: map.contactFormLabel ?? fallback.contactFormLabel,
    contactFormHint: map.contactFormHint ?? fallback.contactFormHint,
    contactFormSuccessMessage:
      map.contactFormSuccessMessage ?? fallback.contactFormSuccessMessage,
    headerContactLabel: map.headerContactLabel ?? fallback.headerContactLabel,
    contactCtaButtonLabel:
      map.contactCtaButtonLabel ?? fallback.contactCtaButtonLabel,
    photoUrl: map.photoUrl ?? fallback.photoUrl,
    resumePdfUrl: map.resumePdfUrl ?? fallback.resumePdfUrl,
    socials: {
      github: map.socialGithub || fallback.socials.github,
      linkedin: map.socialLinkedin || fallback.socials.linkedin,
      twitter: map.socialTwitter || fallback.socials.twitter,
    },
  };
}

function sectionsFromRows(rows: string[][]): Record<string, SectionMeta> {
  const sections = { ...seedContent.sections };
  for (const row of rows) {
    const [id, label = "", title = "", description = ""] = row;
    if (!id) continue;
    sections[id] = { label, title, description };
  }
  return sections;
}

function statsFromRows(rows: string[][]): Stat[] {
  const parsed = sortByOrder(
    rows.map(([id, value, label, sortOrder]) => ({
      id,
      value: value ?? "",
      label: label ?? "",
      sortOrder: Number(sortOrder) || 0,
    }))
  ).map(({ sortOrder: _, ...rest }) => rest);
  return parsed.length > 0 ? parsed : seedContent.stats;
}

function achievementsFromRows(rows: string[][]): Achievement[] {
  const parsed = sortByOrder(
    rows.map(([id, metric, label, description, context, sortOrder]) => ({
      id,
      metric: metric ?? "",
      label: label ?? "",
      description: description ?? "",
      context: context ?? "",
      sortOrder: Number(sortOrder) || 0,
    }))
  ).map(({ sortOrder: _, ...rest }) => rest);
  return parsed.length > 0 ? parsed : seedContent.achievements;
}

function aboutFromRows(rows: string[][]): string[] {
  return sortByOrder(
    rows.map(([, sortOrder, text]) => ({
      sortOrder: Number(sortOrder) || 0,
      text: text ?? "",
    }))
  ).map((r) => r.text);
}

function marqueeFromRows(rows: string[][]): string[] {
  return sortByOrder(
    rows.map(([, text, sortOrder]) => ({
      text: text ?? "",
      sortOrder: Number(sortOrder) || 0,
    }))
  ).map((r) => r.text);
}

function skillsFromRows(rows: string[][]): Record<string, string[]> {
  const grouped: Record<string, { name: string; sortOrder: number }[]> = {};
  for (const [, category, name, sortOrder] of rows) {
    if (!category || !name) continue;
    grouped[category] ??= [];
    grouped[category].push({ name, sortOrder: Number(sortOrder) || 0 });
  }
  const result: Record<string, string[]> = {};
  for (const [category, items] of Object.entries(grouped)) {
    result[category] = sortByOrder(items).map((i) => i.name);
  }
  return Object.keys(result).length > 0 ? result : seedContent.skills;
}

function experienceFromRows(
  rows: string[][],
  pointRows: string[][],
  impactRows: string[][],
  metricRows: string[][],
): Experience[] {
  const seedById = Object.fromEntries(seedContent.experience.map((e) => [e.id, e]));

  const pointsByExp: Record<string, { text: string; sortOrder: number }[]> = {};
  for (const [, experienceId, text, sortOrder] of pointRows) {
    if (!experienceId || !text) continue;
    pointsByExp[experienceId] ??= [];
    pointsByExp[experienceId].push({ text, sortOrder: Number(sortOrder) || 0 });
  }

  const impactByExp: Record<string, { text: string; sortOrder: number }[]> = {};
  for (const [, experienceId, text, sortOrder] of impactRows) {
    if (!experienceId || !text) continue;
    impactByExp[experienceId] ??= [];
    impactByExp[experienceId].push({ text, sortOrder: Number(sortOrder) || 0 });
  }

  const metricsByExp: Record<
    string,
    { id: string; value: string; label: string; sortOrder: number }[]
  > = {};
  for (const [id, experienceId, value, label, sortOrder] of metricRows) {
    if (!experienceId || !value) continue;
    metricsByExp[experienceId] ??= [];
    metricsByExp[experienceId].push({
      id: id ?? "",
      value: value ?? "",
      label: label ?? "",
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const parsed = sortByOrder(
    rows.map((row) => {
      const [id, company, role, location, period, current, col6, col7, col8, col9] = row;
      const legacy = row.length <= 7;
      const overview = legacy ? "" : (col6 ?? "");
      const technologies = legacy ? "" : (col7 ?? "");
      const sortOrder = legacy ? Number(col6) || 0 : Number(col8) || 0;
      const gapAfterNote = legacy ? "" : (col9 ?? "");
      const fallback = seedById[id];

      return {
        id,
        company: company ?? "",
        role: role ?? "",
        location: location ?? "",
        period: period ?? "",
        current: current === "true",
        overview: overview || fallback?.overview || "",
        gapAfterNote: gapAfterNote || fallback?.gapAfterNote || "",
        sortOrder,
        points: sortByOrder(pointsByExp[id] ?? []).map((p) => p.text),
        impact: sortByOrder(impactByExp[id] ?? []).map((p) => p.text),
        technologies: splitTechnologies(technologies).length
          ? splitTechnologies(technologies)
          : (fallback?.technologies ?? []),
        metrics: sortByOrder(metricsByExp[id] ?? []).map(({ sortOrder: _, ...m }) => m),
      };
    }),
  ).map(({ sortOrder: _, ...rest }) => rest);

  const jobs =
    parsed.length > 0
      ? parsed.map((job) => {
          const fallback = seedById[job.id];
          const impact = job.impact?.length ? job.impact : (fallback?.impact ?? []);
          const metrics = job.metrics?.length ? job.metrics : (fallback?.metrics ?? []);
          return { ...job, impact, metrics };
        })
      : seedContent.experience;

  return normalizeExperienceList(jobs);
}

function parseOptionalMs(value: string | undefined): number | undefined {
  if (!value?.trim()) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

function parseScrollEnabled(
  value: string | undefined,
  fallback: boolean | undefined,
): boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback ?? false;
}

function projectScrollFromRow(
  row: string[],
  fallback?: (typeof seedContent.projects)[number],
) {
  return {
    imageScrollEnabled: parseScrollEnabled(row[15], fallback?.imageScrollEnabled),
    imageScrollDurationMs:
      parseOptionalMs(row[16]) ?? fallback?.imageScrollDurationMs,
    imageScrollReturnMs: parseOptionalMs(row[17]) ?? fallback?.imageScrollReturnMs,
  };
}

function projectsFromRows(
  rows: string[][],
  outcomeRows: string[][],
  metricRows: string[][],
  contentRows: string[][],
): Project[] {
  const seedById = Object.fromEntries(seedContent.projects.map((p) => [p.id, p]));
  const seedBySlug = Object.fromEntries(seedContent.projects.map((p) => [p.slug, p]));

  const outcomesByProject: Record<string, { text: string; sortOrder: number }[]> = {};
  for (const [, projectId, text, sortOrder] of outcomeRows) {
    if (!projectId || !text) continue;
    outcomesByProject[projectId] ??= [];
    outcomesByProject[projectId].push({ text, sortOrder: Number(sortOrder) || 0 });
  }

  const metricsByProject: Record<
    string,
    { id: string; value: string; label: string; sortOrder: number }[]
  > = {};
  for (const [id, projectId, value, label, sortOrder] of metricRows) {
    if (!projectId || !value) continue;
    metricsByProject[projectId] ??= [];
    metricsByProject[projectId].push({
      id: id ?? "",
      value: value ?? "",
      label: label ?? "",
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const contentBySlug: Record<string, { type: string; text: string; sortOrder: number }[]> =
    {};
  for (const [, slug, sortOrder, type, text] of contentRows) {
    if (!slug) continue;
    contentBySlug[slug] ??= [];
    contentBySlug[slug].push({
      type: type ?? "p",
      text: text ?? "",
      sortOrder: Number(sortOrder) || 0,
    });
  }

  const parsed = sortByOrder(
    rows.map((row) => {
      const legacy = row.length <= 10;
      const fallback = legacy ? seedById[row[0]] : seedById[row[0]] ?? seedBySlug[row[1]];

      if (legacy) {
        const [id, name, tagline, description, stack, year, role, link, accent, sortOrderCol] =
          row;
        const slug = id;
        return {
          id,
          slug,
          name: name ?? "",
          tagline: tagline ?? "",
          description: description ?? "",
          overview: fallback?.overview ?? "",
          stack: splitPipe(stack).length ? splitPipe(stack) : (fallback?.stack ?? []),
          year: year ?? "",
          role: role ?? "",
          link: link ?? "#",
          accent: (accent === "white" ? "white" : "lime") as "lime" | "white",
          cover: fallback?.cover ?? "gradient-1",
          featured: fallback?.featured ?? false,
          sortOrder: Number(sortOrderCol) || 0,
          outcomes: sortByOrder(outcomesByProject[id] ?? []).map((p) => p.text),
          metrics: sortByOrder(metricsByProject[id] ?? []).map(({ sortOrder: _, ...m }) => m),
          content: sortByOrder(contentBySlug[slug] ?? []).map(({ type, text }) => ({ type, text })),
          imageUrl: fallback?.imageUrl ?? "",
          ...projectScrollFromRow(row, fallback),
        };
      }

      const [
        id,
        slug,
        name,
        tagline,
        description,
        overview,
        stack,
        year,
        role,
        link,
        accent,
        cover,
        featured,
        sortOrderCol,
        imageUrlCol,
      ] = row;

      return {
        id,
        slug: slug || id,
        name: name ?? "",
        tagline: tagline ?? "",
        description: description ?? "",
        overview: overview || fallback?.overview || "",
        stack: splitPipe(stack).length ? splitPipe(stack) : (fallback?.stack ?? []),
        year: year ?? "",
        role: role ?? "",
        link: link ?? "#",
        accent: (accent === "white" ? "white" : "lime") as "lime" | "white",
        cover: normalizeBlogCover(cover || fallback?.cover),
        featured: featured === "true",
        imageUrl: imageUrlCol || fallback?.imageUrl || "",
        ...projectScrollFromRow(row, fallback),
        sortOrder: Number(sortOrderCol) || 0,
        outcomes: sortByOrder(outcomesByProject[id] ?? []).map((p) => p.text),
        metrics: sortByOrder(metricsByProject[id] ?? []).map(({ sortOrder: _, ...m }) => m),
        content: sortByOrder(contentBySlug[slug || id] ?? []).map(({ type, text }) => ({
          type,
          text,
        })),
      };
    }),
  ).map(({ sortOrder: _, ...rest }) => rest);

  const jobs =
    parsed.length > 0
      ? parsed.map((project) => {
          const fallback = seedById[project.id] ?? seedBySlug[project.slug];
          return {
            ...project,
            imageUrl: project.imageUrl || fallback?.imageUrl || "",
            imageScrollEnabled:
              project.imageScrollEnabled ?? fallback?.imageScrollEnabled ?? false,
            imageScrollDurationMs:
              project.imageScrollDurationMs ?? fallback?.imageScrollDurationMs,
            imageScrollReturnMs:
              project.imageScrollReturnMs ?? fallback?.imageScrollReturnMs,
            outcomes: project.outcomes?.length
              ? project.outcomes
              : (fallback?.outcomes ?? []),
            metrics: project.metrics?.length ? project.metrics : (fallback?.metrics ?? []),
            content: project.content?.length ? project.content : (fallback?.content ?? []),
          };
        })
      : seedContent.projects;

  return normalizeProjectList(jobs);
}

function testimonialsFromRows(rows: string[][]): Testimonial[] {
  const parsed = sortByOrder(
    rows.map(([id, quote, author, role, company, published, sortOrder]) => ({
      id,
      quote: quote ?? "",
      author: author ?? "",
      role: role ?? "",
      company: company ?? "",
      published: published === "true",
      sortOrder: Number(sortOrder) || 0,
    })),
  ).map(({ sortOrder: _, ...rest }) => rest);
  return parsed.length > 0 ? parsed : seedContent.testimonials;
}

function educationFromRows(rows: string[][]): Education[] {
  return sortByOrder(
    rows.map(([id, school, degree, period, grade, sortOrder]) => ({
      id,
      school: school ?? "",
      degree: degree ?? "",
      period: period ?? "",
      grade: grade ?? "",
      sortOrder: Number(sortOrder) || 0,
    }))
  ).map(({ sortOrder: _, ...rest }) => rest);
}

function blogPostsFromRows(
  postRows: string[][],
  contentRows: string[][]
): BlogPost[] {
  const contentBySlug: Record<string, { type: string; text: string; sortOrder: number }[]> =
    {};
  for (const [, slug, sortOrder, type, text] of contentRows) {
    if (!slug) continue;
    contentBySlug[slug] ??= [];
    contentBySlug[slug].push({
      type: type ?? "p",
      text: text ?? "",
      sortOrder: Number(sortOrder) || 0,
    });
  }

  return sortByOrder(
    postRows.map((row) => {
      const [
        slug,
        title,
        excerpt,
        category,
        readTime,
        date,
        cover,
        tags,
        published,
        col9,
        col10,
        col11,
      ] = row;

      let featured = false;
      let imageUrl = "";
      let sortOrder = 0;

      if (row.length >= 12) {
        featured = col9 === "true";
        imageUrl = col10 ?? "";
        sortOrder = Number(col11) || 0;
      } else if (row.length >= 11) {
        featured = col9 === "true";
        sortOrder = Number(col10) || 0;
      } else {
        sortOrder = Number(col9) || 0;
      }

      return {
        slug,
        title: title ?? "",
        excerpt: excerpt ?? "",
        category: category ?? "",
        readTime: readTime ?? "",
        date: date ?? "",
        cover: cover ?? "gradient-1",
        imageUrl,
        tags: splitPipe(tags),
        published: published !== "false",
        featured,
        sortOrder,
        content: sortByOrder(contentBySlug[slug] ?? []).map(({ type, text }) => ({
          type,
          text,
        })),
      };
    }),
  ).map(({ sortOrder: _, ...rest }) => rest);
}

function blogCategoriesFromRows(rows: string[][]): string[] {
  const cats = sortByOrder(
    rows.map(([name, sortOrder]) => ({
      name: name ?? "",
      sortOrder: Number(sortOrder) || 0,
    }))
  ).map((r) => r.name);
  return cats.length > 0 ? cats : seedContent.blogCategories;
}

export function buildPortfolioContent(
  tabs: Record<SheetTab, string[][]>
): PortfolioContent {
  const blogPosts = blogPostsFromRows(
    tabs[SHEET_TABS.BLOG_POSTS],
    tabs[SHEET_TABS.BLOG_CONTENT]
  );

  return {
    profile: profileFromRows(tabs[SHEET_TABS.PROFILE]),
    aboutParagraphs: aboutFromRows(tabs[SHEET_TABS.ABOUT]),
    sections: sectionsFromRows(tabs[SHEET_TABS.SECTIONS]),
    stats: statsFromRows(tabs[SHEET_TABS.STATS]),
    achievements: achievementsFromRows(tabs[SHEET_TABS.ACHIEVEMENTS]),
    marquee: marqueeFromRows(tabs[SHEET_TABS.MARQUEE]),
    skills: skillsFromRows(tabs[SHEET_TABS.SKILLS]),
    experience: experienceFromRows(
      tabs[SHEET_TABS.EXPERIENCE],
      tabs[SHEET_TABS.EXPERIENCE_POINTS],
      tabs[SHEET_TABS.EXPERIENCE_IMPACT],
      tabs[SHEET_TABS.EXPERIENCE_METRICS],
    ),
    projects: projectsFromRows(
      tabs[SHEET_TABS.PROJECTS],
      tabs[SHEET_TABS.PROJECT_OUTCOMES],
      tabs[SHEET_TABS.PROJECT_METRICS],
      tabs[SHEET_TABS.PROJECT_CONTENT],
    ),
    testimonials: testimonialsFromRows(tabs[SHEET_TABS.TESTIMONIALS]),
    education: educationFromRows(tabs[SHEET_TABS.EDUCATION]),
    blogPosts: blogPosts.filter((p) => p.published),
    blogCategories: blogCategoriesFromRows(tabs[SHEET_TABS.BLOG_CATEGORIES]),
  };
}

/** All posts including drafts — for admin only. */
export function buildAdminContent(
  tabs: Record<SheetTab, string[][]>
): PortfolioContent & { allBlogPosts: BlogPost[] } {
  const allBlogPosts = blogPostsFromRows(
    tabs[SHEET_TABS.BLOG_POSTS],
    tabs[SHEET_TABS.BLOG_CONTENT]
  );
  const publicContent = buildPortfolioContent(tabs);
  return { ...publicContent, allBlogPosts };
}

export function profileToRows(profile: Profile): unknown[][] {
  return [
    ["name", profile.name],
    ["firstName", profile.firstName],
    ["lastName", profile.lastName],
    ["role", profile.role],
    ["shortBio", profile.shortBio],
    ["location", profile.location],
    ["email", profile.email],
    ["phone", profile.phone],
    ["website", profile.website],
    ["status", profile.status],
    ["heroCurrentRole", profile.heroCurrentRole],
    ["heroHeadline", profile.heroHeadline],
    ["heroHighlight", profile.heroHighlight],
    ["heroValueProp", profile.heroValueProp],
    ["heroPrimaryCtaLabel", profile.heroPrimaryCtaLabel],
    ["heroPrimaryCtaHref", profile.heroPrimaryCtaHref],
    ["heroSecondaryCtaLabel", profile.heroSecondaryCtaLabel],
    ["heroSecondaryCtaHref", profile.heroSecondaryCtaHref],
    ["footerTagline", profile.footerTagline],
    ["contactAvailabilityDescription", profile.contactAvailabilityDescription],
    ["contactFormLabel", profile.contactFormLabel],
    ["contactFormHint", profile.contactFormHint],
    ["contactFormSuccessMessage", profile.contactFormSuccessMessage],
    ["headerContactLabel", profile.headerContactLabel],
    ["contactCtaButtonLabel", profile.contactCtaButtonLabel],
    ["photoUrl", profile.photoUrl],
    ["resumePdfUrl", profile.resumePdfUrl],
    ["socialGithub", profile.socials.github],
    ["socialLinkedin", profile.socials.linkedin],
    ["socialTwitter", profile.socials.twitter],
  ];
}

export function sectionsToRows(sections: Record<string, SectionMeta>): unknown[][] {
  const ids = [...new Set([...SECTION_IDS, ...Object.keys(sections)])];
  return ids.map((id) => [
    id,
    sections[id]?.label ?? "",
    sections[id]?.title ?? "",
    sections[id]?.description ?? "",
  ]);
}

export function achievementsToRows(achievements: Achievement[]): unknown[][] {
  return achievements.map((a, i) => [
    a.id || `achievement-${i}`,
    a.metric,
    a.label,
    a.description,
    a.context,
    String(i),
  ]);
}

export function experienceToRows(experience: Experience[]): {
  jobs: unknown[][];
  points: unknown[][];
  impact: unknown[][];
  metrics: unknown[][];
} {
  const jobs = experience.map((e, i) => [
    e.id,
    e.company,
    e.role,
    e.location,
    e.period,
    e.current ? "true" : "false",
    e.overview,
    (e.technologies ?? []).join(", "),
    String(i),
    e.gapAfterNote ?? "",
  ]);

  const points = experience.flatMap((e) =>
    (e.points ?? []).map((text, i) => [crypto.randomUUID(), e.id, text, String(i)]),
  );

  const impact = experience.flatMap((e) =>
    (e.impact ?? []).map((text, i) => [crypto.randomUUID(), e.id, text, String(i)]),
  );

  const metrics = experience.flatMap((e) =>
    (e.metrics ?? []).map((m, i) => [
      m.id || crypto.randomUUID(),
      e.id,
      m.value,
      m.label,
      String(i),
    ]),
  );

  return { jobs, points, impact, metrics };
}

export function testimonialsToRows(testimonials: Testimonial[]): unknown[][] {
  return testimonials.map((t, i) => [
    t.id || crypto.randomUUID(),
    t.quote,
    t.author,
    t.role,
    t.company,
    t.published ? "true" : "false",
    String(i),
  ]);
}

export function projectsToRows(projects: Project[]): {
  jobs: unknown[][];
  outcomes: unknown[][];
  metrics: unknown[][];
  content: unknown[][];
} {
  const jobs = projects.map((p, i) => [
    p.id,
    p.slug || p.id,
    p.name,
    p.tagline,
    p.description,
    p.overview ?? "",
    (p.stack ?? []).join("|"),
    p.year,
    p.role,
    p.link,
    p.accent,
    p.cover ?? "gradient-1",
    p.featured ? "true" : "false",
    String(i),
    p.imageUrl ?? "",
    p.imageScrollEnabled ? "true" : "false",
    p.imageScrollDurationMs ? String(p.imageScrollDurationMs) : "",
    p.imageScrollReturnMs ? String(p.imageScrollReturnMs) : "",
  ]);

  const outcomes = projects.flatMap((p) =>
    (p.outcomes ?? []).map((text, i) => [crypto.randomUUID(), p.id, text, String(i)]),
  );

  const metrics = projects.flatMap((p) =>
    (p.metrics ?? []).map((m, i) => [
      m.id || crypto.randomUUID(),
      p.id,
      m.value,
      m.label,
      String(i),
    ]),
  );

  const content = projects.flatMap((p) =>
    (p.content ?? []).map((block, i) => [
      crypto.randomUUID(),
      p.slug || p.id,
      String(i),
      block.type,
      block.text,
    ]),
  );

  return { jobs, outcomes, metrics, content };
}
