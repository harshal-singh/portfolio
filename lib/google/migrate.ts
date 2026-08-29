import type { sheets_v4 } from "googleapis";
import { seedContent } from "@/lib/seed";
import {
  SHEET_HEADERS,
  SHEET_TABS,
  TAB_ORDER,
  type SheetTab,
} from "./schema";
import { batchGetAllTabs, batchUpdateValues, replaceTabData } from "./rows";

/** Read tabs that exist; missing tabs return empty rows (seed fallback in serialize). */
export async function readAllTabsWithFallback(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tabs: SheetTab[],
): Promise<Record<SheetTab, string[][]>> {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = new Set(
    meta.data.sheets?.map((s) => s.properties?.title).filter(Boolean) ?? [],
  );

  const result = {} as Record<SheetTab, string[][]>;
  for (const tab of tabs) {
    result[tab] = [];
  }

  const present = tabs.filter((tab) => existing.has(tab));
  if (present.length > 0) {
    const fetched = await batchGetAllTabs(sheets, spreadsheetId, present);
    Object.assign(result, fetched);
  }

  return result;
}

function nextSheetId(sheets: sheets_v4.Schema$Sheet[] | undefined): number {
  const ids = sheets?.map((s) => s.properties?.sheetId ?? 0) ?? [0];
  return Math.max(...ids, 0) + 1;
}

function achievementsSeedRows() {
  return seedContent.achievements.map((a, i) => [
    a.id,
    a.metric,
    a.label,
    a.description,
    a.context,
    String(i),
  ]);
}

function experienceSeedRows() {
  const impact = seedContent.experience.flatMap((e) =>
    e.impact.map((text, i) => [crypto.randomUUID(), e.id, text, String(i)]),
  );
  const metrics = seedContent.experience.flatMap((e) =>
    e.metrics.map((m, i) => [m.id, e.id, m.value, m.label, String(i)]),
  );
  return { impact, metrics };
}

function projectSeedRows() {
  const outcomes = seedContent.projects.flatMap((p) =>
    (p.outcomes ?? []).map((text, i) => [crypto.randomUUID(), p.id, text, String(i)]),
  );
  const metrics = seedContent.projects.flatMap((p) =>
    (p.metrics ?? []).map((m, i) => [m.id, p.id, m.value, m.label, String(i)]),
  );
  const content = seedContent.projects.flatMap((p) =>
    (p.content ?? []).map((block, i) => [
      crypto.randomUUID(),
      p.slug || p.id,
      String(i),
      block.type,
      block.text,
    ]),
  );
  return { outcomes, metrics, content };
}

/** Add missing sheet tabs and seed Achievements from defaults when new. */
export async function ensureSpreadsheetSchema(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
): Promise<boolean> {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existingTitles = new Set(
    meta.data.sheets?.map((s) => s.properties?.title).filter(Boolean) ?? [],
  );

  const missing = TAB_ORDER.filter((tab) => !existingTitles.has(tab));
  if (missing.length === 0) return false;

  let sheetId = nextSheetId(meta.data.sheets);
  const addRequests = missing.map((title) => ({
    addSheet: {
      properties: {
        title,
        sheetId: sheetId++,
      },
    },
  }));

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests: addRequests },
  });

  if (missing.includes(SHEET_TABS.ACHIEVEMENTS)) {
    await replaceTabData(
      sheets,
      spreadsheetId,
      SHEET_TABS.ACHIEVEMENTS,
      SHEET_HEADERS[SHEET_TABS.ACHIEVEMENTS],
      achievementsSeedRows(),
    );
  }

  const { impact, metrics } = experienceSeedRows();
  const projectSeeds = projectSeedRows();
  if (missing.includes(SHEET_TABS.EXPERIENCE_IMPACT)) {
    await replaceTabData(
      sheets,
      spreadsheetId,
      SHEET_TABS.EXPERIENCE_IMPACT,
      SHEET_HEADERS[SHEET_TABS.EXPERIENCE_IMPACT],
      impact,
    );
  }
  if (missing.includes(SHEET_TABS.EXPERIENCE_METRICS)) {
    await replaceTabData(
      sheets,
      spreadsheetId,
      SHEET_TABS.EXPERIENCE_METRICS,
      SHEET_HEADERS[SHEET_TABS.EXPERIENCE_METRICS],
      metrics,
    );
  }

  if (missing.includes(SHEET_TABS.PROJECT_OUTCOMES)) {
    await replaceTabData(
      sheets,
      spreadsheetId,
      SHEET_TABS.PROJECT_OUTCOMES,
      SHEET_HEADERS[SHEET_TABS.PROJECT_OUTCOMES],
      projectSeeds.outcomes,
    );
  }
  if (missing.includes(SHEET_TABS.PROJECT_METRICS)) {
    await replaceTabData(
      sheets,
      spreadsheetId,
      SHEET_TABS.PROJECT_METRICS,
      SHEET_HEADERS[SHEET_TABS.PROJECT_METRICS],
      projectSeeds.metrics,
    );
  }
  if (missing.includes(SHEET_TABS.PROJECT_CONTENT)) {
    await replaceTabData(
      sheets,
      spreadsheetId,
      SHEET_TABS.PROJECT_CONTENT,
      SHEET_HEADERS[SHEET_TABS.PROJECT_CONTENT],
      projectSeeds.content,
    );
  }

  const seededTabs = new Set<string>([
    SHEET_TABS.ACHIEVEMENTS,
    SHEET_TABS.EXPERIENCE_IMPACT,
    SHEET_TABS.EXPERIENCE_METRICS,
    SHEET_TABS.PROJECT_OUTCOMES,
    SHEET_TABS.PROJECT_METRICS,
    SHEET_TABS.PROJECT_CONTENT,
  ]);
  const headerOnlyTabs = missing.filter((t) => !seededTabs.has(t));
  if (headerOnlyTabs.length > 0) {
    await batchUpdateValues(
      sheets,
      spreadsheetId,
      headerOnlyTabs.map((tab) => ({
        range: `${tab}!A1`,
        values: [[...SHEET_HEADERS[tab]]],
      })),
    );
  }

  return true;
}
