import type { BlogPost, PortfolioContent } from "@/lib/types";

export type AdminContent = PortfolioContent & { allBlogPosts: BlogPost[] };

export interface AdminBootstrap {
  content: AdminContent;
  spreadsheetId: string;
  publicReadConfigured: boolean;
  serviceAccountEmail: string | null;
}

export async function fetchAdminContent(): Promise<AdminBootstrap> {
  const res = await fetch("/api/admin/content");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.error ?? "Failed to load content";
    const err = new Error(message) as Error & { code?: string };
    err.code = data.error;
    throw err;
  }
  return data as AdminBootstrap;
}

export async function saveContent(type: string, data: unknown) {
  const res = await fetch("/api/admin/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Save failed");
  }
}
