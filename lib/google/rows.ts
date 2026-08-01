import type { sheets_v4 } from "googleapis";
import { SHEET_COL_RANGE, SHEET_DATA_RANGE, TAB_GID, type SheetTab } from "./schema";

export function colLetter(n: number): string {
  let s = "";
  let x = n;
  while (x > 0) {
    const rem = (x - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    x = Math.floor((x - 1) / 26);
  }
  return s;
}

export async function appendRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab,
  values: unknown[]
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!${SHEET_COL_RANGE}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}

export async function appendRows(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab,
  rows: unknown[][]
) {
  if (rows.length === 0) return;
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!${SHEET_COL_RANGE}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: rows },
  });
}

export async function batchUpdateValues(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  data: { range: string; values: unknown[][] }[]
) {
  if (data.length === 0) return;
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: { valueInputOption: "RAW", data },
  });
}

export async function readTabRows(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab
): Promise<string[][]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!${SHEET_DATA_RANGE}`,
  });
  return res.data.values ?? [];
}

export interface FoundRow {
  rowNumber: number;
  values: string[];
}

export async function findRowByKey(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab,
  key: string,
  column = 0
): Promise<FoundRow | null> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!${SHEET_DATA_RANGE}`,
  });
  const rows = res.data.values ?? [];
  const index = rows.findIndex((row) => row[column] === key);
  if (index === -1) return null;
  return { rowNumber: index + 2, values: rows[index] };
}

export async function updateRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab,
  rowNumber: number,
  values: unknown[]
) {
  const lastCol = colLetter(values.length);
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${tab}!A${rowNumber}:${lastCol}${rowNumber}`,
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

export async function deleteRowByNumber(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab,
  rowNumber: number
) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: TAB_GID[tab],
              dimension: "ROWS",
              startIndex: rowNumber - 1,
              endIndex: rowNumber,
            },
          },
        },
      ],
    },
  });
}

export async function batchGetAllTabs(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tabs: SheetTab[]
): Promise<Record<SheetTab, string[][]>> {
  const res = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: tabs.map((tab) => `${tab}!${SHEET_DATA_RANGE}`),
  });

  const result = {} as Record<SheetTab, string[][]>;
  tabs.forEach((tab, i) => {
    result[tab] = res.data.valueRanges?.[i]?.values ?? [];
  });
  return result;
}

/** Replaces all data rows in a tab (keeps header in row 1). */
export async function replaceTabData(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: SheetTab,
  header: readonly string[],
  rows: unknown[][]
) {
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${tab}!A2:Z`,
  });
  await batchUpdateValues(sheets, spreadsheetId, [
    { range: `${tab}!A1`, values: [[...header]] },
    ...(rows.length > 0 ? [{ range: `${tab}!A2`, values: rows }] : []),
  ]);
}
