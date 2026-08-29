import BlogPageClient from "@/components/blog/BlogPageClient";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const { sections } = await getPortfolioContent();
  return createPageMetadata(
    "Blog",
    sections.blog.description || "Engineering notes on React, Next.js, and shipping product.",
    { path: "/blog" },
  );
}

export default async function BlogPage() {
  const content = await getPortfolioContent();

  return (
    <BlogPageClient
      section={content.sections.blog}
      blogPosts={content.blogPosts}
    />
  );
}
