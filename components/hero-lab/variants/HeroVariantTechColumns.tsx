"use client";

import {
  getHeroCopy,
  HeroCtas,
  HeroFooter,
  HeroStatusBadge,
} from "@/components/hero-lab/heroShared";
import { TechLogoScrollColumns } from "@/components/ui/tech-logo-columns";
import type { Profile } from "@/lib/types";

/** Example: hero copy + dim vertical tech logo columns (T1) */
export function HeroVariantTechColumns({ profile }: { profile: Profile }) {
  const copy = getHeroCopy(profile);

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-background pointer-events-none"
        aria-hidden
      />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-95 bg-accent-muted rounded-full blur-3xl pointer-events-none opacity-80" />

      <div className="relative z-10 site-container min-h-[88vh] flex items-center py-16 md:py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center w-full rise-in">
          <div className="max-w-3xl">
            <HeroStatusBadge status={profile.status} />
            <p className="text-label text-muted mb-4">
              {profile.name} · {profile.role}
            </p>
            <h1 className="text-display text-foreground font-semibold leading-[1.05] max-w-3xl">
              {copy.headline}{" "}
              <span className="text-accent">{copy.highlight}</span>
            </h1>
            <p className="mt-8 text-body-lg text-muted max-w-2xl leading-relaxed">
              {copy.valueProp}
            </p>
            <HeroCtas copy={copy} />
            <HeroFooter profile={profile} />
          </div>

          <div className="hidden md:flex justify-center lg:justify-end w-30 xl:w-36 shrink-0 self-stretch min-h-90 lg:min-h-105 border-l border-border-subtle/60 pl-6 xl:pl-10">
            <TechLogoScrollColumns className="w-full" />
          </div>
        </div>

        <div className="md:hidden mt-10 -mx-4 sm:-mx-6">
          <TechLogoScrollColumns />
        </div>
      </div>
    </section>
  );
}
