import "server-only";
import { unstable_cache } from "next/cache";
import { stripBlogPostContent } from "@/lib/blog/postMeta";
import { CONTENT_CACHE_TAG } from "@/lib/constants";
import { seedContent } from "@/lib/seed";
import type { BlogPost, PortfolioContent } from "@/lib/types";
import { buildAdminContent } from "@/lib/google/serialize";
import { batchGetAllTabs } from "@/lib/google/rows";
import { BOOTSTRAP_TABS } from "@/lib/google/spreadsheet";
import { getSheetsClientForRead } from "@/lib/google/sheetsClient";
import { sanitizeForRsc } from "@/lib/content/sanitize";

type CachedSheet = PortfolioContent & { allBlogPosts: BlogPost[] };

async function fetchAdminContentFromSheet(): Promise<CachedSheet | null> {
  const client = getSheetsClientForRead();
  if (!client) return null;

  try {
    const tabs = await batchGetAllTabs(
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
  ["portfolio-sheet-content"],
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
    blogPosts: cached.allBlogPosts
      .filter((p) => p.published)
      .map((p) => ({ ...stripBlogPostContent(p), content: [] })),
  };
}

/** Full post including content blocks — for /blog/[slug] only. */
export async function getFullBlogPost(slug: string): Promise<BlogPost | null> {
  const cached = await getCachedSheet();
  return cached.allBlogPosts.find((p) => p.slug === slug) ?? null;
}

/** All posts including drafts — admin reads. */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const cached = await getCachedSheet();
  return cached.allBlogPosts;
}
