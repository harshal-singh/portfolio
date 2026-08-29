import { SHEET_TABS } from "@/lib/google/schema";
import { google } from "googleapis";
import "server-only";

/** Service-account client with write access — contact form submissions only. */
export function getSheetsClientForContactWrite() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );
  const spreadsheetId = process.env.PORTFOLIO_SPREADSHEET_ID;

  if (!email || !key || !spreadsheetId) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    spreadsheetId,
  };
}

export async function appendContactMessage(
  name: string,
  email: string,
  message: string,
): Promise<boolean> {
  const client = getSheetsClientForContactWrite();
  if (!client) return false;

  try {
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: `${SHEET_TABS.CONTACT_MESSAGES}!A:E`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [crypto.randomUUID(), name, email, message, new Date().toISOString()],
        ],
      },
    });
    return true;
  } catch (err) {
    console.warn(
      "[contact] Sheet append skipped (service account is read-only):",
      err instanceof Error ? err.message : err,
    );
    return false;
  }
}
