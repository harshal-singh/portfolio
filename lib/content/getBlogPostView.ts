import "server-only";
import { auth } from "@/auth";
import { stripBlogPostContent } from "@/lib/blog/postMeta";
import { ADMIN_EMAIL } from "@/lib/constants";
import { getFullBlogPost, getPortfolioContent } from "@/lib/content/getContent";
import { sanitizeForRsc } from "@/lib/content/sanitize";
import type { BlogPostMeta } from "@/lib/blog/postMeta";
import type { BlogPost, Profile } from "@/lib/types";

export interface BlogPostViewData {
  post: BlogPost | null;
  profile: Profile;
  related: BlogPostMeta[];
  /** Admin viewing an unpublished draft — show banner + publish */
  isDraftPreview: boolean;
  isAdmin: boolean;
}

export async function isPortfolioAdmin(): Promise<boolean> {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  return email === ADMIN_EMAIL.toLowerCase();
}

/** Public post view — admins can also see unpublished drafts at /blog/[slug]. */
export async function getBlogPostView(slug: string): Promise<BlogPostViewData> {
  const content = await getPortfolioContent();
  const isAdmin = await isPortfolioAdmin();
  const fullPost = await getFullBlogPost(slug);

  let post: BlogPost | null = fullPost;
  if (!isAdmin && post && !post.published) {
    post = null;
  }

  const isDraftPreview = Boolean(isAdmin && fullPost && !fullPost.published);
  const related = content.blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map(stripBlogPostContent);

  return sanitizeForRsc({
    post,
    profile: content.profile,
    related,
    isDraftPreview,
    isAdmin,
  });
}
