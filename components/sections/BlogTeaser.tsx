import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/data";

export default function BlogTeaser() {
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
            05 — Writing
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold">
            Notes from the trench.
          </h2>
        </div>
        <Link
          href="/blog"
          className="mono text-sm text-zinc-300 inline-flex items-center gap-1.5 link-underline"
        >
          All posts <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {recent.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-accent/25 transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="mono text-[11px] uppercase tracking-wider text-accent">
                {post.category}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="mono text-[11px] text-zinc-500">
                {post.readTime}
              </span>
            </div>
            <h3 className="heading text-xl text-zinc-100 mb-3 group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="mono text-[11px] text-zinc-500">
                {post.date}
              </span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-accent transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
