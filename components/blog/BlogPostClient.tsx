"use client";

import { BlogCoverMedia } from "@/components/blog/BlogCoverMedia";
import { LinkedinIcon, TwitterIcon } from "@/components/ui/brand-icons";
import { CmsImage } from "@/components/ui/cms-image";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { Tag } from "@/components/ui/tag";
import type { BlogPostMeta } from "@/lib/blog/postMeta";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface BlogPostClientProps {
  post: BlogPostMeta | null;
  profile: Profile;
  related: BlogPostMeta[];
  toc: { id: string; text: string }[];
  pageUrl: string;
  children?: ReactNode;
}

export default function BlogPostClient({
  post,
  profile,
  related,
  toc,
  pageUrl,
  children,
}: BlogPostClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [post?.slug]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2[id^='h-'], h3[id^='h-']"),
    );
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
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => headings.forEach((h) => observer.unobserve(h));
  }, [toc]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-56 pb-32 text-center">
        <p className="text-label text-accent mb-3">404</p>
        <h1 className="text-h1 text-foreground mb-6">
          This post doesn&apos;t exist.
        </h1>
        <button
          onClick={() => router.push("/blog")}
          className="mono text-sm text-foreground inline-flex items-center gap-2 link-underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to journal
        </button>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(pageUrl);
  const shareTitle = encodeURIComponent(post.title);

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <article className="relative">
      <ReadingProgress />
      <div className="relative pt-28 md:pt-32 min-h-110 overflow-hidden">
        <div className="absolute inset-0">
          <BlogCoverMedia
            post={post}
            showCategoryWatermark={!post.imageUrl?.trim()}
            watermarkClassName="text-[14rem] md:text-[22rem] text-white/2.5"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/75" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-10 md:pb-14">
          <Link
            href="/blog"
            className="mono text-xs text-foreground inline-flex items-center gap-2 mb-6 link-underline w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to journal
          </Link>
          <span className="mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-md border border-border text-accent w-fit">
            {post.category}
          </span>
          <h1 className="heading text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05] mt-5 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 mt-6 mono text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              {profile.photoUrl ? (
                <CmsImage
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center heading text-[10px] font-bold leading-0">
                  HS
                </span>
              )}
              {profile.name}
            </span>
          </div>
        </div>
      </div>

      <div className="site-container py-16 grid md:grid-cols-12 gap-10">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <p className="text-label mb-4">On this page</p>
            <ul className="space-y-2.5 mb-8">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className={cn(
                      "text-sm transition-colors block leading-snug",
                      activeSection === t.id
                        ? "text-accent font-medium"
                        : "text-muted hover:text-accent",
                    )}
                  >
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-border-subtle">
              <p className="text-label mb-3">Share</p>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                  aria-label="Share on X (opens in new tab)"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                  aria-label="Share on LinkedIn (opens in new tab)"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="md:col-span-9 max-w-3xl">
          <p className="text-xl md:text-2xl text-muted leading-relaxed border-l-2 border-accent pl-5 mb-12 italic">
            {post.excerpt}
          </p>
          {children}

          <div className="mt-14 pt-8 border-t border-border-subtle">
            <p className="text-label mb-3">Tagged</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t} size="md">
                  #{t}
                </Tag>
              ))}
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl border border-border-subtle bg-surface flex item-start sm:items-center flex-col sm:flex-row gap-5">
            {profile.photoUrl ? (
              <CmsImage
                src={profile.photoUrl}
                alt={profile.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center heading font-bold text-lg">
                HS
              </div>
            )}
            <div className="flex-1">
              <p className="heading text-foreground">{profile.name}</p>
              <p className="text-sm text-muted">
                {profile.role} · {profile.location}
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mono text-xs text-foreground inline-flex items-center gap-1.5 link-underline"
            >
              Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <section className="site-container pb-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-h1 text-foreground">Keep reading</h2>
          <Link
            href="/blog"
            className="mono text-sm text-foreground link-underline"
          >
            All posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block p-6 rounded-xl border border-border-subtle bg-surface hover:border-accent/25 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="mono text-[11px] uppercase tracking-wider text-accent">
                  {p.category}
                </span>
                <span className="text-muted">·</span>
                <span className="mono text-[11px] text-muted">
                  {p.readTime}
                </span>
              </div>
              <h3 className="heading text-lg text-foreground group-hover:text-accent transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed line-clamp-2 mt-3">
                {p.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
