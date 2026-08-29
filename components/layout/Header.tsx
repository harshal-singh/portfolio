"use client";

import { useCommandPalette } from "@/components/command/CommandPaletteProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { primaryNav } from "@/lib/navigation";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  profile: Profile;
}

export default function Header({ profile }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modKey, setModKey] = useState("Ctrl+K");
  const pathname = usePathname();
  const { toggle: toggleCommand } = useCommandPalette();
  const contactLabel = profile.headerContactLabel || "Get in touch";

  useEffect(() => {
    setModKey(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘+K" : "Ctrl+K");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "border-b fixed top-0 inset-x-0 z-50 transition-all duration-300",
        open
          ? "bg-background border-transparent"
          : scrolled
            ? "backdrop-blur-md bg-background/95 border-border-subtle"
            : "border-transparent",
      )}
    >
      <div className="site-container h-16 flex items-center justify-between">
        <Link
          href="/"
          className="heading lowercase text-2xl font-bold text-foreground hover:text-muted transition-colors relative z-50"
        >
          harshal singh
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm link-underline py-1",
                isActive(item.href)
                  ? "text-foreground nav-link-active"
                  : "text-muted hover:text-foreground",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 relative z-50">
          <button
            type="button"
            onClick={toggleCommand}
            className="hidden lg:inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-transparent text-muted hover:text-foreground hover:border-accent/30 hover:bg-accent-muted transition-colors"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" aria-hidden />
            <kbd className="mono text-[10px]">{modKey}</kbd>
          </button>
          <ThemeToggle className="hidden lg:flex" />
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium hover:bg-accent-hover transition-colors"
          >
            {contactLabel} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
          <ThemeToggle className="lg:hidden" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground p-2 min-w-11 min-h-11 flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="lg:hidden fixed inset-0 top-16 bg-background flex flex-col h-[calc(100dvh-4rem)]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="px-6 pt-4 pb-10 flex flex-col gap-8 flex-1 overflow-y-auto">
            <span className="border-t border-border-subtle" />
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-3xl font-medium heading transition-colors",
                  isActive(item.href)
                    ? "text-accent"
                    : "text-foreground hover:text-accent",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-auto border-t border-border-subtle pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-4 rounded-xl font-medium text-lg w-full"
              >
                {contactLabel} <ArrowUpRight className="w-5 h-5" aria-hidden />
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
