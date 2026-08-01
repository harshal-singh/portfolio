import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import { ADMIN_EMAIL } from "@/lib/constants";
import { findOrCreateSpreadsheet } from "@/lib/google/spreadsheet";

declare module "next-auth" {
  interface Session {
    spreadsheetId?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    spreadsheetId?: string;
    error?: string;
    lastSetupRetry?: number;
  }
}

const GOOGLE_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/drive.file",
].join(" ");

/** Avoid hammering Google Drive API while setup is failing (e.g. API disabled). */
const SETUP_RETRY_COOLDOWN_MS = 30_000;

async function provisionSpreadsheet(
  token: JWT,
  accessToken: string,
  email: string | null | undefined
) {
  token.spreadsheetId = await findOrCreateSpreadsheet(accessToken, email);
  token.error = undefined;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      authorization: {
        params: {
          scope: GOOGLE_SCOPES,
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    signIn({ user }) {
      return user.email === ADMIN_EMAIL;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        try {
          await provisionSpreadsheet(token, account.access_token!, user?.email);
        } catch (err) {
          console.error("[auth] failed to find/create spreadsheet:", err);
          token.error = "SpreadsheetSetupError";
        }
        return token;
      }

      // Retry once setup recovers (e.g. after enabling Drive API in Cloud Console).
      if (!token.spreadsheetId && token.accessToken) {
        const lastRetry = token.lastSetupRetry ?? 0;
        if (Date.now() - lastRetry > SETUP_RETRY_COOLDOWN_MS) {
          token.lastSetupRetry = Date.now();
          try {
            await provisionSpreadsheet(
              token,
              token.accessToken as string,
              token.email as string | undefined
            );
          } catch {
            token.error = "SpreadsheetSetupError";
          }
        }
      }

      if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.spreadsheetId = token.spreadsheetId;
      session.error = token.error;
      return session;
    },
  },
});

const inflightRefreshes = new Map<string, Promise<JWT>>();

function refreshAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    return Promise.resolve({ ...token, error: "RefreshAccessTokenError" });
  }
  const key = token.refreshToken;
  const existing = inflightRefreshes.get(key);
  if (existing) return existing;

  const promise = doRefreshAccessToken(token).finally(() => inflightRefreshes.delete(key));
  inflightRefreshes.set(key, promise);
  return promise;
}

async function doRefreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
      }),
    });
    const refreshed = await response.json();
    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + refreshed.expires_in),
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (err) {
    console.error("[auth] failed to refresh access token:", err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}
