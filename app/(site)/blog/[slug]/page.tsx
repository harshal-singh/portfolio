import BlogPostClient from "@/components/blog/BlogPostClient";
import { BlogContentBlocks } from "@/components/blog/BlogContentBlocks";
import { BlogDraftAdminBar } from "@/components/blog/BlogDraftAdminBar";
import { buildToc, stripBlogPostContent } from "@/lib/blog/postMeta";
import { getBlogPostView } from "@/lib/content/getBlogPostView";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { getPortfolioContent } = await import("@/lib/content/getContent");
  const { blogPosts } = await getPortfolioContent();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { post, profile, related, isDraftPreview } = await getBlogPostView(slug);

  return (
    <>
      {isDraftPreview && post ? (
        <BlogDraftAdminBar slug={post.slug} title={post.title} />
      ) : null}
      <BlogPostClient
        post={post ? stripBlogPostContent(post) : null}
        profile={profile}
        related={related}
        toc={post ? buildToc(post.content) : []}
      >
        {post ? <BlogContentBlocks blocks={post.content} withHeadingIds /> : null}
      </BlogPostClient>
    </>
  );
}
