import BlogPostClient from "@/components/blog/BlogPostClient";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { blogPosts } = await getPortfolioContent();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getPortfolioContent();
  const post = content.blogPosts.find((p) => p.slug === slug) ?? null;
  const related = content.blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return <BlogPostClient post={post} profile={content.profile} related={related} />;
}
