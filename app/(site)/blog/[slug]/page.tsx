import BlogPostClient from "@/components/blog/BlogPostClient";
import { BlogContentBlocks } from "@/components/blog/BlogContentBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildToc, stripBlogPostContent } from "@/lib/blog/postMeta";
import { getBlogPostView } from "@/lib/content/getBlogPostView";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/metadata/jsonLd";
import { createPageMetadata } from "@/lib/metadata/page";
import { absoluteUrl } from "@/lib/metadata/site";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { getPortfolioContent } = await import("@/lib/content/getContent");
  const { blogPosts } = await getPortfolioContent();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { post } = await getBlogPostView(slug);
  if (!post) {
    return createPageMetadata("Post not found", "Blog article", {
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
  return createPageMetadata(post.title, post.excerpt, {
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { post, profile, related } = await getBlogPostView(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd(post, profile),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogPostClient
        post={stripBlogPostContent(post)}
        profile={profile}
        related={related}
        toc={buildToc(post.content)}
        pageUrl={absoluteUrl(`/blog/${post.slug}`)}
      >
        <BlogContentBlocks blocks={post.content} withHeadingIds />
      </BlogPostClient>
    </>
  );
}
