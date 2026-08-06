import { normalizeBlogCover } from "@/lib/blog/covers";
import type { BlogPost, Profile } from "@/lib/types";

export function draftToPreviewPost(
  draft: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    cover?: string;
    readTime: string;
    tags: string[];
    content: { type: string; text: string }[];
  },
): BlogPost {
  return {
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt,
    category: draft.category,
    readTime: draft.readTime,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    cover: normalizeBlogCover(draft.cover),
    tags: draft.tags,
    published: false,
    content: draft.content,
  };
}
