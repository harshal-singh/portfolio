"use client";

import { Input } from "@/components/ui/input";
import { blogCategories, blogPosts, gradientMap } from "@/lib/data";
import { ArrowUpRight, Calendar, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function BlogCard({
  post,
  featured = false,
}: {
  post: (typeof blogPosts)[0];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-2xl border border-white/[0.07] bg-white/[0.015] hover:border-accent/25 transition-all overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${
          gradientMap[post.cover] || gradientMap["gradient-1"]
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="heading text-6xl md:text-8xl font-bold text-white/[0.04] text-center">
            {post.category}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-white/10 text-accent">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-4 mono text-[11px] text-zinc-500 mb-3">
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
          className={`heading ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          } text-zinc-100 mb-3 group-hover:text-accent transition-colors leading-snug`}
        >
          {post.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-5">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="mono text-[10px] text-zinc-500 px-2 py-0.5 rounded bg-white/[0.04] border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-zinc-500 group-hover:text-accent transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [query, active]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Header */}
      <div className="mb-14 max-w-3xl rise-in">
        <p className="mono text-xs uppercase tracking-widest text-accent mb-4">
          The Journal
        </p>
        <h1 className="heading text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
          Writing about the{" "}
          <span className="text-accent">craft</span> of building software.
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Pragmatic notes from the trench — architecture decisions, performance
          work, and the small patterns that make codebases pleasant to live in.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-4 backdrop-blur-md bg-background/70 border-y border-white/5 mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`mono text-xs px-3 py-1.5 rounded-md border transition-colors ${
                  active === c
                    ? "bg-accent text-background border-accent"
                    : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-zinc-500">
          <p className="mono text-sm">No posts match your filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              featured={i === 0 && active === "All" && !query}
            />
          ))}
        </div>
      )}
    </div>
  );
}
