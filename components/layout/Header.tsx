"use client";

import { GlassCard } from "@/components/aurora/GlassCard";
import { primaryNav } from "@/lib/navigation";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  profile: Profile;
}

export default function Header({ profile }: HeaderProps) {
  const contactLabel = profile.headerContactLabel || "Get in touch";

  return (
    <header className="sticky top-0 z-[100] px-4 pt-3 pb-3 md:px-6">
      <div className="site-container !px-0">
        <GlassCard className="flex items-center justify-between gap-4 !rounded-full px-3 py-2 pl-5 md:pl-6">
          <a
            href="#top"
            className="jk text-[0.95rem] font-extrabold tracking-[-0.02em] text-foreground"
          >
            {profile.name}
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[0.85rem] font-medium text-muted transition-colors",
                  "hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="aurora-pill shrink-0">
            {contactLabel}
          </a>

          {/* Search + theme toggle — disabled for single-page landing
          <button type="button" onClick={toggleCommand} className="aurora-ghost hidden lg:inline-flex">
            <Search className="h-3.5 w-3.5" />
            <kbd className="mono text-[10px]">{modKey}</kbd>
          </button>
          <ThemeToggle className="aurora-ghost hidden lg:flex" />
          */}
        </GlassCard>
      </div>
    </header>
  );
}
