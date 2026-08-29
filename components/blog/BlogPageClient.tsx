"use client";

import { BlogCoverMedia } from "@/components/blog/BlogCoverMedia";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag";
import { uniqueBlogCategories } from "@/lib/blog/categories";
import { sortBlogPostsByDate } from "@/lib/blog/sortPosts";
import type { BlogPost, SectionMeta } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Calendar, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "../layout/PageHeader";

function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block rounded-2xl border border-border-subtle bg-surface hover:border-accent/25 transition-all overflow-hidden",
        featured && "md:col-span-2",
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <BlogCoverMedia post={post} />
        {!post.imageUrl?.trim() ? (
          <div className="absolute top-4 left-4">
            <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border text-accent">
              {post.category}
            </span>
          </div>
        ) : null}
      </div>
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-4 mono text-[11px] text-muted mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h3
          className={cn(
            "heading text-foreground mb-3 group-hover:text-accent transition-colors leading-snug",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-5">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <span className="text-muted group-hover:text-accent transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface BlogPageClientProps {
  section: SectionMeta;
  blogPosts: BlogPost[];
}

export default function BlogPageClient({
  section,
  blogPosts,
}: BlogPageClientProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const blogCategories = useMemo(
    () => uniqueBlogCategories(blogPosts),
    [blogPosts],
  );

  const filtered = useMemo(() => {
    return sortBlogPostsByDate(blogPosts).filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [query, active, blogPosts]);

  return (
    <>
      <PageHeader
        label={section.label}
        title={section.title}
        description={section.description}
      />

      <div className="site-container pb-20 md:pb-28">
        <div className="sticky top-16 z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-4 backdrop-blur-md bg-background/70 border-y border-border-subtle mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10"
                aria-label="Search blog posts"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "mono text-xs px-3 py-1.5 rounded-md border transition-colors",
                    active === c
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted hover:text-foreground hover:border-accent/30",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-24 text-muted"
            role="status"
            aria-live="polite"
          >
            <p className="mono text-sm">No posts match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
