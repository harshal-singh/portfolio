import type { BlogPost } from "@/lib/types";

/** Filter chips for /blog — "All" plus unique categories from posts. */
export function uniqueBlogCategories(posts: Pick<BlogPost, "category">[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];

  for (const post of posts) {
    const cat = post.category?.trim();
    if (!cat) continue;
    const key = cat.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    categories.push(cat);
  }

  return ["All", ...categories.sort((a, b) => a.localeCompare(b))];
}
