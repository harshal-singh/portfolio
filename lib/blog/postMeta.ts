import type { BlogBlock, BlogPost } from "@/lib/types";

/** Listing / teaser fields only — keeps RSC payloads small (Node 24 streaming bug). */
export type BlogPostMeta = Omit<BlogPost, "content">;

export function stripBlogPostContent(post: BlogPost): BlogPostMeta {
  const { content: _, ...meta } = post;
  return meta;
}

export function headingId(text: string) {
  return `h-${text.replace(/\s/g, "-").toLowerCase()}`;
}

export function buildToc(content: BlogBlock[]) {
  return content
    .filter((b) => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}
