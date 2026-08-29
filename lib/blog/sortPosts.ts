import { parseBlogDate } from "@/lib/blog/date";
import type { BlogPost } from "@/lib/types";

/** Newest first — use everywhere posts are listed publicly. */
export function sortBlogPostsByDate<T extends Pick<BlogPost, "date">>(
  posts: T[],
): T[] {
  return [...posts].sort((a, b) => {
    const da = parseBlogDate(a.date)?.getTime() ?? 0;
    const db = parseBlogDate(b.date)?.getTime() ?? 0;
    return db - da;
  });
}
