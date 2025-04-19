import React, { useEffect, useState } from "react";
import { Calendar, Clock, Home } from "lucide-react";
import { useParams } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { blogPosts } from "@/lib/blog-data";
import { convertMarkdownToHtml } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import BlogNotFound from "./BlogNotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    const renderContent = async () => {
      if (post) {
        const htmlContent = await convertMarkdownToHtml(post.content);
        setContent(htmlContent);
      }
    };
    renderContent();
  }, [post]);

  if (!post) {
    return <BlogNotFound />;
  }

  return (
    <section id="blog-post" className="pt-28 sm:pt-36 pb-24 relative">
      <BackButton />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-5"></div>
      <div className="absolute inset-0 bg-gray-950"></div>

      <div className="container-custom relative z-10">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-400 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="mb-10 rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-auto" />
          </div>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </section>
  );
};

export default BlogPost;
