import { NextResponse } from "next/server";
import { revalidatePortfolioContent } from "@/lib/content/revalidate";
import { withGoogleAuth } from "@/lib/api/withGoogleAuth";
import { batchGetAllTabs, replaceTabData } from "@/lib/google/rows";
import { buildAdminContent } from "@/lib/google/serialize";
import { BOOTSTRAP_TABS } from "@/lib/google/spreadsheet";
import { SHEET_HEADERS, SHEET_TABS } from "@/lib/google/schema";

export const POST = withGoogleAuth(async (req, { sheets, spreadsheetId }) => {
  const { slug } = (await req.json()) as { slug?: string };
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const tabs = await batchGetAllTabs(sheets, spreadsheetId, BOOTSTRAP_TABS);
  const { allBlogPosts, blogCategories } = buildAdminContent(tabs);
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const posts = allBlogPosts.map((p) =>
    p.slug === slug ? { ...p, published: true } : p,
  );

  await replaceTabData(
    sheets,
    spreadsheetId,
    SHEET_TABS.BLOG_POSTS,
    SHEET_HEADERS[SHEET_TABS.BLOG_POSTS],
    posts.map((p, i) => [
      p.slug,
      p.title,
      p.excerpt,
      p.category,
      p.readTime,
      p.date,
      p.cover,
      p.tags.join("|"),
      p.published ? "true" : "false",
      String(i),
    ]),
  );

  revalidatePortfolioContent();
  return NextResponse.json({ ok: true, slug });
});
