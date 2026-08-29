"use client";

import { BlogCoverMedia } from "@/components/blog/BlogCoverMedia";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { sortBlogPostsByDate } from "@/lib/blog/sortPosts";
import type { BlogPost, SectionMeta } from "@/lib/types";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BlogTeaserProps {
  section: SectionMeta;
  posts: BlogPost[];
}

export default function BlogTeaser({ section, posts }: BlogTeaserProps) {
  const featured = posts.filter((p) => p.featured);
  const display =
    featured.length > 0
      ? sortBlogPostsByDate(featured).slice(0, 3)
      : sortBlogPostsByDate(posts).slice(0, 3);

  return (
    <section className="site-container site-section">
      <Reveal>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <SectionHeader
            label={section.label}
            title={section.title}
            description={section.description ?? undefined}
            align="left"
            className="mb-0"
          />
          <Link
            href="/blog"
            className="mono text-sm text-foreground inline-flex items-center gap-1.5 link-underline"
          >
            All posts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {display.map((post, index) => (
          <Reveal key={post.slug} delay={index * 100}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-border-subtle bg-surface hover:border-accent/25 transition-all h-full overflow-hidden shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border-subtle">
                <BlogCoverMedia post={post} watermarkClassName="text-3xl" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="mono text-[11px] uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="mono text-[11px] text-muted">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="heading text-xl text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="mono text-[11px] text-muted">
                    {post.date}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
