import "server-only";
import { unstable_cache } from "next/cache";
import { sortBlogPostsByDate } from "@/lib/blog/sortPosts";
import { stripBlogPostContent } from "@/lib/blog/postMeta";
import { CONTENT_CACHE_TAG } from "@/lib/constants";
import { normalizeExperienceList } from "@/lib/experience/normalize";
import { normalizeProjectList } from "@/lib/projects/normalize";
import { stripProjectContent } from "@/lib/projects/meta";
import { SCHEMA_VERSION } from "@/lib/google/schema";
import { seedContent } from "@/lib/seed";
import type { BlogPost, PortfolioContent, Project } from "@/lib/types";
import { buildAdminContent } from "@/lib/google/serialize";
import { readAllTabsWithFallback } from "@/lib/google/migrate";
import { BOOTSTRAP_TABS } from "@/lib/google/spreadsheet";
import { getSheetsClientForRead } from "@/lib/google/sheetsClient";
import { sanitizeForRsc } from "@/lib/content/sanitize";

type CachedSheet = PortfolioContent & { allBlogPosts: BlogPost[] };

async function fetchAdminContentFromSheet(): Promise<CachedSheet | null> {
  const client = getSheetsClientForRead();
  if (!client) return null;

  try {
    const tabs = await readAllTabsWithFallback(
      client.sheets,
      client.spreadsheetId,
      BOOTSTRAP_TABS,
    );
    return buildAdminContent(tabs);
  } catch (err) {
    console.error("[content] failed to read from Google Sheet:", err);
    return null;
  }
}

function seedAsCached(): CachedSheet {
  return { ...seedContent, allBlogPosts: seedContent.blogPosts };
}

/** Cached sheet read — one batchGet per cache window. */
const getCachedSheet = unstable_cache(
  async (): Promise<CachedSheet> => {
    const fromSheet = await fetchAdminContentFromSheet();
    return sanitizeForRsc(fromSheet ?? seedAsCached());
  },
  ["portfolio-sheet-content", SCHEMA_VERSION],
  {
    tags: [CONTENT_CACHE_TAG],
    revalidate: 3600,
  },
);

/**
 * Primary data loader for public pages.
 * Blog post bodies are omitted — use getFullBlogPost(slug) on article pages.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const cached = await getCachedSheet();
  return {
    ...cached,
    experience: normalizeExperienceList(cached.experience),
    projects: normalizeProjectList(cached.projects).map((p) => ({
      ...stripProjectContent(p),
      content: [],
    })),
    testimonials: cached.testimonials.filter((t) => t.published),
    blogPosts: sortBlogPostsByDate(cached.allBlogPosts)
      .filter((p) => p.published)
      .map((p) => ({ ...stripBlogPostContent(p), content: [] })),
  };
}

/** Full post including content blocks — for /blog/[slug] only. */
export async function getFullBlogPost(slug: string): Promise<BlogPost | null> {
  const cached = await getCachedSheet();
  return cached.allBlogPosts.find((p) => p.slug === slug) ?? null;
}

/** Full project including content blocks — for /projects/[slug] only. */
export async function getFullProject(slug: string): Promise<Project | null> {
  const cached = await getCachedSheet();
  const project = normalizeProjectList(cached.projects).find(
    (p) => p.slug === slug || p.id === slug,
  );
  return project ?? null;
}

/** All projects with full content — admin reads and case study pages. */
export async function getAllProjects(): Promise<Project[]> {
  const cached = await getCachedSheet();
  return normalizeProjectList(cached.projects);
}

/** All posts including drafts — admin reads. */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const cached = await getCachedSheet();
  return cached.allBlogPosts;
}
