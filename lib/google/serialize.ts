import { seedContent } from "@/lib/seed";
import type {
  BlogPost,
  Education,
  Experience,
  PortfolioContent,
  Profile,
  Project,
  SectionMeta,
  Stat,
} from "@/lib/types";
import { SECTION_IDS, SHEET_TABS, type SheetTab } from "./schema";

function splitPipe(value: string | undefined): string[] {
  if (!value) return [];
  return value.split("|").map((s) => s.trim()).filter(Boolean);
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
    footerTagline: map.footerTagline || fallback.footerTagline,
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
  return sortByOrder(
    rows.map(([id, value, label, sortOrder]) => ({
      id,
      value: value ?? "",
      label: label ?? "",
      sortOrder: Number(sortOrder) || 0,
    }))
  ).map(({ sortOrder: _, ...rest }) => rest);
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
  pointRows: string[][]
): Experience[] {
  const pointsByExp: Record<string, { text: string; sortOrder: number }[]> = {};
  for (const [, experienceId, text, sortOrder] of pointRows) {
    if (!experienceId || !text) continue;
    pointsByExp[experienceId] ??= [];
    pointsByExp[experienceId].push({ text, sortOrder: Number(sortOrder) || 0 });
  }

  return sortByOrder(
    rows.map(([id, company, role, location, period, current, sortOrder]) => ({
      id,
      company: company ?? "",
      role: role ?? "",
      location: location ?? "",
      period: period ?? "",
      current: current === "true",
      sortOrder: Number(sortOrder) || 0,
      points: sortByOrder(pointsByExp[id] ?? []).map((p) => p.text),
    }))
  ).map(({ sortOrder: _, ...rest }) => rest);
}

function projectsFromRows(rows: string[][]): Project[] {
  return sortByOrder(
    rows.map(
      ([id, name, tagline, description, stack, year, role, link, accent, sortOrder]) => ({
        id,
        name: name ?? "",
        tagline: tagline ?? "",
        description: description ?? "",
        stack: splitPipe(stack),
        year: year ?? "",
        role: role ?? "",
        link: link ?? "#",
        accent: (accent === "white" ? "white" : "lime") as "lime" | "white",
        sortOrder: Number(sortOrder) || 0,
      })
    )
  ).map(({ sortOrder: _, ...rest }) => rest);
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
    postRows.map(
      ([
        slug,
        title,
        excerpt,
        category,
        readTime,
        date,
        cover,
        tags,
        published,
        sortOrder,
      ]) => ({
        slug,
        title: title ?? "",
        excerpt: excerpt ?? "",
        category: category ?? "",
        readTime: readTime ?? "",
        date: date ?? "",
        cover: cover ?? "gradient-1",
        tags: splitPipe(tags),
        published: published !== "false",
        sortOrder: Number(sortOrder) || 0,
        content: sortByOrder(contentBySlug[slug] ?? []).map(({ type, text }) => ({
          type,
          text,
        })),
      })
    )
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
    marquee: marqueeFromRows(tabs[SHEET_TABS.MARQUEE]),
    skills: skillsFromRows(tabs[SHEET_TABS.SKILLS]),
    experience: experienceFromRows(
      tabs[SHEET_TABS.EXPERIENCE],
      tabs[SHEET_TABS.EXPERIENCE_POINTS]
    ),
    projects: projectsFromRows(tabs[SHEET_TABS.PROJECTS]),
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
    ["footerTagline", profile.footerTagline],
    ["socialGithub", profile.socials.github],
    ["socialLinkedin", profile.socials.linkedin],
    ["socialTwitter", profile.socials.twitter],
  ];
}

export function sectionsToRows(sections: Record<string, SectionMeta>): unknown[][] {
  return SECTION_IDS.map((id) => [
    id,
    sections[id]?.label ?? "",
    sections[id]?.title ?? "",
    sections[id]?.description ?? "",
  ]);
}
