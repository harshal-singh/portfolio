"use client";

import { LinkedinIcon, TwitterIcon } from "@/components/ui/brand-icons";
import { blogPosts, gradientMap, profile } from "@/lib/data";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const toc = useMemo(
    () =>
      post?.content
        ?.filter((b) => b.type === "h2")
        .map((b) => ({ id: `h-${b.text.replace(/\s/g, "-").toLowerCase()}`, text: b.text })) || [],
    [post]
  );

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2[id^='h-']"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          } else if (
            headings.length > 0 &&
            entry.target.id === headings[0].id &&
            entry.boundingClientRect.top > 100
          ) {
            setActiveSection("");
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));

    return () => {
      headings.forEach((h) => observer.unobserve(h));
    };
  }, [toc]);

  const related = useMemo(
    () => blogPosts.filter((p) => p.slug !== slug).slice(0, 3),
    [slug]
  );

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-56 pb-32 text-center">
        <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
          404
        </p>
        <h1 className="heading text-4xl text-zinc-100 mb-6">
          This post doesn&apos;t exist.
        </h1>
        <button
          onClick={() => router.push("/blog")}
          className="mono text-sm text-zinc-300 inline-flex items-center gap-2 link-underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to journal
        </button>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  let h2Index = 0;

  return (
    <article className="relative">
      {/* Cover */}
      <div
        className={`relative h-[40vh] md:h-[55vh] overflow-hidden bg-gradient-to-br ${
          gradientMap[post.cover] || gradientMap["gradient-1"]
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="heading text-[14rem] md:text-[22rem] font-bold text-white/[0.025] select-none">
            {post.category}
          </span>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-10 md:pb-14">
          <Link
            href="/blog"
            className="mono text-xs text-zinc-300 inline-flex items-center gap-2 mb-6 link-underline w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to journal
          </Link>
          <span className="mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-accent w-fit">
            {post.category}
          </span>
          <h1 className="heading text-3xl md:text-5xl lg:text-6xl font-semibold text-zinc-100 leading-[1.05] mt-5 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 mt-6 mono text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center heading text-[10px] font-bold leading-0">
                HS
              </span>
              {profile.name}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-12 gap-10">
        {/* TOC */}
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <p className="mono text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
              On this page
            </p>
            <ul className="space-y-2.5 mb-8">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className={`text-sm transition-colors block leading-snug ${
                      activeSection === t.id
                        ? "text-accent font-medium"
                        : "text-zinc-400 hover:text-accent"
                    }`}
                  >
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-white/5">
              <p className="mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                Share
              </p>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}`}
                  className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/`}
                  className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={copyLink}
                  className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Article content */}
        <div className="md:col-span-9 max-w-3xl">
          <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed border-l-2 border-accent pl-5 mb-12 italic">
            {post.excerpt}
          </p>
          <div className="prose prose-invert max-w-none space-y-6">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                const id = `h-${block.text.replace(/\s/g, "-").toLowerCase()}`;
                return (
                  <h2
                    key={i}
                    id={id}
                    className="heading text-2xl md:text-3xl text-zinc-100 mt-12 mb-2 scroll-mt-24"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "code") {
                return (
                  <pre
                    key={i}
                    className="max-w-[calc(100vw-48px)] bg-surface-code border border-white/10 rounded-lg p-5 overflow-x-auto"
                  >
                    <code className="mono text-sm text-zinc-300 leading-relaxed whitespace-pre">
                      {block.text}
                    </code>
                  </pre>
                );
              }
              return (
                <p
                  key={i}
                  className="text-zinc-300 text-[17px] leading-[1.8]"
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="mt-14 pt-8 border-t border-white/5">
            <p className="mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
              Tagged
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="mono text-xs px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/5 text-zinc-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mt-10 p-6 rounded-xl border border-white/[0.07] bg-white/[0.015] flex item-start sm:items-center flex-col sm:flex-row gap-5">
            <div className="w-14 h-14 rounded-full bg-accent text-background flex items-center justify-center heading font-bold text-lg">
              HS
            </div>
            <div className="flex-1">
              <p className="heading text-zinc-100">{profile.name}</p>
              <p className="text-sm text-zinc-400">
                {profile.role} · {profile.location}
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mono text-xs text-zinc-300 inline-flex items-center gap-1.5 link-underline"
            >
              Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="heading text-3xl md:text-4xl text-zinc-100">
            Keep reading
          </h2>
          <Link href="/blog" className="mono text-sm text-zinc-300 link-underline">
            All posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-accent/25 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="mono text-[11px] uppercase tracking-wider text-accent">
                  {p.category}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="mono text-[11px] text-zinc-500">
                  {p.readTime}
                </span>
              </div>
              <h3 className="heading text-lg text-zinc-100 group-hover:text-accent transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mt-3">
                {p.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
