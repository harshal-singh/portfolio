import BlogPageClient from "@/components/blog/BlogPageClient";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export default async function BlogPage() {
  const content = await getPortfolioContent();

  return (
    <BlogPageClient
      section={content.sections.blog}
      blogPosts={content.blogPosts}
    />
  );
}
