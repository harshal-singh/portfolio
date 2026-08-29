import "server-only";
import { stripBlogPostContent } from "@/lib/blog/postMeta";
import { getFullBlogPost, getPortfolioContent } from "@/lib/content/getContent";
import { sanitizeForRsc } from "@/lib/content/sanitize";
import type { BlogPostMeta } from "@/lib/blog/postMeta";
import type { BlogPost, Profile } from "@/lib/types";

export interface BlogPostViewData {
  post: BlogPost | null;
  profile: Profile;
  related: BlogPostMeta[];
}

/** Public blog post view — no auth; only published posts are returned. */
export async function getBlogPostView(slug: string): Promise<BlogPostViewData> {
  const content = await getPortfolioContent();
  const fullPost = await getFullBlogPost(slug);

  const post =
    fullPost && fullPost.published ? fullPost : null;

  const related = content.blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map(stripBlogPostContent);

  return sanitizeForRsc({
    post,
    profile: content.profile,
    related,
  });
}
