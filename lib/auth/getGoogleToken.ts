import "server-only";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export interface GoogleTokenPayload {
  accessToken: string;
  spreadsheetId: string;
  error?: string;
}

export async function getGoogleToken(
  req: NextRequest
): Promise<GoogleTokenPayload | null> {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token?.accessToken) return null;

  if (!token.spreadsheetId) {
    return {
      accessToken: token.accessToken as string,
      spreadsheetId: "",
      error: (token.error as string | undefined) ?? "SpreadsheetSetupError",
    };
  }

  return {
    accessToken: token.accessToken as string,
    spreadsheetId: token.spreadsheetId as string,
    error: token.error as string | undefined,
  };
}
