import "server-only";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import type { sheets_v4 } from "googleapis";
import { ADMIN_EMAIL } from "@/lib/constants";
import { getGoogleToken } from "@/lib/auth/getGoogleToken";
import { getSheetsClient } from "@/lib/google/sheetsClient";

export interface ApiContext {
  sheets: sheets_v4.Sheets;
  spreadsheetId: string;
}

function googleErrorStatus(err: unknown): number | undefined {
  if (!err || typeof err !== "object") return undefined;
  const e = err as { code?: unknown; status?: unknown; response?: { status?: unknown } };
  const raw = e.code ?? e.status ?? e.response?.status;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string" && /^\d+$/.test(raw)) return Number(raw);
  return undefined;
}

export function withGoogleAuth<RouteParams = unknown>(
  handler: (req: NextRequest, ctx: ApiContext, routeParams: RouteParams) => Promise<NextResponse>
) {
  return async (req: NextRequest, routeParams: RouteParams) => {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = token.email?.toLowerCase();
    if (email !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const googleToken = await getGoogleToken(req);
    if (!googleToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (googleToken.error || !googleToken.spreadsheetId) {
      return NextResponse.json({ error: googleToken.error ?? "SpreadsheetSetupError" }, { status: 401 });
    }
    try {
      const sheets = getSheetsClient(googleToken.accessToken);
      return await handler(req, { sheets, spreadsheetId: googleToken.spreadsheetId }, routeParams);
    } catch (err) {
      console.error("[api] request failed:", err);
      const status = googleErrorStatus(err);
      if (status === 401) {
        return NextResponse.json({ error: "RefreshAccessTokenError" }, { status: 401 });
      }
      if (status === 403) {
        return NextResponse.json({ error: "Google denied access to your sheet." }, { status: 403 });
      }
      if (status === 429) {
        return NextResponse.json(
          { error: "Google is rate-limiting requests. Please try again in a moment." },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
  };
}
