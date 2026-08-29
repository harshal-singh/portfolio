"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArrowRight, FileText, Layout, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { content } = useAdmin();
  const published = content.allBlogPosts.filter((p) => p.published).length;
  const drafts = content.allBlogPosts.length - published;

  return (
    <AdminShell
      title="Dashboard"
      description="All public site copy lives in this CMS — edit sections here, not in code. Saves go to your Google Sheet and appear on the live site after cache refresh."
    >
      <div className="mb-8 rounded-xl border border-accent/20 bg-accent/5 p-5">
        <p className="text-sm text-zinc-300 leading-relaxed">
          <strong className="text-accent">Content policy:</strong> Headlines,
          page copy, metrics, experience, projects, blog posts, and contact text
          should all be updated through the admin panel. Code changes should
          only be for features and layout — not copy edits.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/landing/hero"
          className="group p-5 rounded-xl border border-white/8 hover:border-accent/30 transition-colors"
        >
          <Layout className="w-5 h-5 text-accent mb-3" />
          <h2 className="heading text-lg text-zinc-100 mb-1">Landing page</h2>
          <p className="text-sm text-zinc-500 mb-4">
            Hero, about, skills, experience, projects, education — each section
            has its own page.
          </p>
          <span className="mono text-xs text-accent inline-flex items-center gap-1">
            Edit landing{" "}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>

        <Link
          href="/admin/blog"
          className="group p-5 rounded-xl border border-white/8 hover:border-accent/30 transition-colors"
        >
          <FileText className="w-5 h-5 text-accent mb-3" />
          <h2 className="heading text-lg text-zinc-100 mb-1">Blog</h2>
          <p className="text-sm text-zinc-500 mb-4">
            {published} published · {drafts} drafts — listing page, posts, and
            AI-assisted writing.
          </p>
          <span className="mono text-xs text-accent inline-flex items-center gap-1">
            Manage blog{" "}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>

        <Link
          href="/admin/blog/ai"
          className="group p-5 rounded-xl border border-white/8 hover:border-accent/30 transition-colors sm:col-span-2"
        >
          <Sparkles className="w-5 h-5 text-accent mb-3" />
          <h2 className="heading text-lg text-zinc-100 mb-1">AI blog ideas</h2>
          <p className="text-sm text-zinc-500 mb-4">
            Generate 1–3 weekly post ideas with Google Gemini (free tier). Pick
            one, edit, publish.
          </p>
          <span className="mono text-xs text-accent inline-flex items-center gap-1">
            Open AI studio{" "}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </AdminShell>
  );
}
