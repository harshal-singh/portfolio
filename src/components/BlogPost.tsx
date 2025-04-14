import { useEffect, useState } from "react";
import { BlogPost as BlogPostType } from "@/lib/blog-data";
import { convertMarkdownToHtml } from "@/lib/markdown";

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const renderContent = async () => {
      const htmlContent = await convertMarkdownToHtml(post.content);
      setContent(htmlContent);
    };
    renderContent();
  }, [post.content]);

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <header className="mb-8 border-b pb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{post.category}</span>
          <time className="text-sm text-muted-foreground">{post.date}</time>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
      </header>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
