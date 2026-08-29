"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { ExternalLink, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LANDING_LINKS = [
  { href: "/admin/landing/hero", label: "Hero & Profile" },
  { href: "/admin/landing/impact", label: "Impact & Achievements" },
  { href: "/admin/landing/about", label: "About" },
  { href: "/admin/landing/skills", label: "Skills" },
  { href: "/admin/landing/experience", label: "Experience" },
  { href: "/admin/landing/projects", label: "Projects" },
  { href: "/admin/landing/testimonials", label: "Testimonials" },
  { href: "/admin/landing/blog-teaser", label: "Writing teaser" },
  { href: "/admin/landing/education", label: "Education" },
  { href: "/admin/landing/pages", label: "Pages & contact" },
];

const BLOG_LINKS = [
  { href: "/admin/blog", label: "Blog listing page" },
  { href: "/admin/blog/posts", label: "All posts" },
  { href: "/admin/blog/ai", label: "AI ideas" },
];

function NavLink({
  href,
  label,
  exact,
}: {
  href: string;
  label: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? "bg-accent/15 text-accent"
          : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
      }`}
    >
      {label}
    </Link>
  );
}

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const { spreadsheetId, publicReadConfigured } = useAdmin();

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/8 bg-background p-6 overflow-y-auto">
        <Link
          href="/admin"
          className="heading text-xl text-zinc-200 block mb-1 shrink-0"
        >
          harshal singh<span className="text-accent">.</span>
        </Link>
        <p className="text-xs text-zinc-600 mb-8 shrink-0">Portfolio admin</p>

        <nav className="space-y-6 flex-1">
          <div>
            <p className="mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2 px-3">
              Overview
            </p>
            <NavLink href="/admin" label="Dashboard" exact />
          </div>

          <div>
            <p className="mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2 px-3">
              Landing page
            </p>
            <div className="space-y-0.5">
              {LANDING_LINKS.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </div>

          <div>
            <p className="mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2 px-3">
              Blog
            </p>
            <div className="space-y-0.5">
              {BLOG_LINKS.map((l) => (
                <NavLink
                  key={l.href}
                  href={l.href}
                  label={l.label}
                  exact={l.href === "/admin/blog"}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-6 pt-6 border-t border-white/8 space-y-2 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 px-3"
          >
            View site <ExternalLink className="w-3 h-3" />
          </Link>
          {spreadsheetId ? (
            <a
              href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 px-3"
            >
              Open sheet <ExternalLink className="w-3 h-3" />
            </a>
          ) : null}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 px-3"
          >
            <LogOut className="w-3 h-3" /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen pl-64">
        <div className="max-w-3xl mx-auto px-6 py-10">
          {!publicReadConfigured ? (
            <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200/80">
              Public site may still use seed data until{" "}
              <code className="mono text-xs">PORTFOLIO_SPREADSHEET_ID</code> and
              the service account are configured in{" "}
              <code className="mono text-xs">.env.local</code>.
            </div>
          ) : null}

          <header className="mb-8">
            <h1 className="heading text-2xl md:text-3xl text-zinc-100">
              {title}
            </h1>
            {description ? (
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {description}
              </p>
            ) : null}
          </header>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
