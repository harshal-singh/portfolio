import "server-only";
import { unstable_cache } from "next/cache";
import { CONTENT_CACHE_TAG } from "@/lib/constants";
import { seedContent } from "@/lib/seed";
import type { PortfolioContent } from "@/lib/types";
import { buildPortfolioContent } from "@/lib/google/serialize";
import { batchGetAllTabs } from "@/lib/google/rows";
import { BOOTSTRAP_TABS } from "@/lib/google/spreadsheet";
import { getSheetsClientForRead } from "@/lib/google/sheetsClient";

async function fetchFromSheet(): Promise<PortfolioContent | null> {
  const client = getSheetsClientForRead();
  if (!client) return null;

  try {
    const tabs = await batchGetAllTabs(
      client.sheets,
      client.spreadsheetId,
      BOOTSTRAP_TABS
    );
    return buildPortfolioContent(tabs);
  } catch (err) {
    console.error("[content] failed to read from Google Sheet:", err);
    return null;
  }
}

/** Cached sheet read — one batchGet per cache window; zero API calls on warm requests. */
const getCachedSheetContent = unstable_cache(
  async () => fetchFromSheet(),
  ["portfolio-sheet-content"],
  {
    tags: [CONTENT_CACHE_TAG],
    revalidate: 3600,
  }
);

/**
 * Primary data loader for public pages.
 * Uses ISR-cached Google Sheets read when configured; falls back to seed data.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const fromSheet = await getCachedSheetContent();
  return fromSheet ?? seedContent;
}
