"use client";

import { HeroVariantTechColumns } from "@/components/hero-lab/variants/HeroVariantTechColumns";
import {
  createAmbientVariant,
  HeroSplitC5,
} from "@/components/hero-lab/HeroAmbientLayout";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";

interface HeroVariantDef {
  id: string;
  code: string;
  title: string;
  tagline: string;
  bestFor: string;
  component: ComponentType<{ profile: Profile }>;
}

const VARIANTS: HeroVariantDef[] = [
  {
    id: "c5-split",
    code: "C5",
    title: "Split + torus knot",
    tagline: "Your pick — 3D in a right panel, copy on the left.",
    bestFor: "Contained wow; familiar layout.",
    component: HeroSplitC5,
  },
  {
    id: "w4-portal",
    code: "W4",
    title: "Portal arch (full section)",
    tagline: "A wireframe gateway arch + side pillars frames the hero like an entry point.",
    bestFor: '"Walk into my work" — structured, memorable frame.',
    component: createAmbientVariant("ambient-portal-arch", "Move cursor · portal arch"),
  },
  {
    id: "w5-cage",
    code: "W5",
    title: "Geodesic cage (full section)",
    tagline: "Nested icosahedron dome + floor rings wrap the content in a wire shell.",
    bestFor: "Architectural systems vibe — bold but clean.",
    component: createAmbientVariant("ambient-geodesic-cage", "Move cursor · geodesic cage"),
  },
  {
    id: "t1-tech-columns",
    code: "T1",
    title: "Tech logo columns",
    tagline:
      "Two dim monochrome columns — left scrolls down, right scrolls up, infinite loop.",
    bestFor: "Stack signal without color noise; pairs well with minimal hero.",
    component: HeroVariantTechColumns,
  },
];

interface HeroLabClientProps {
  profile: Profile;
}

export function HeroLabClient({ profile }: HeroLabClientProps) {
  const [activeId, setActiveId] = useState(VARIANTS[0].id);

  useEffect(() => {
    const sections = VARIANTS.map((v) => document.getElementById(`hero-${v.id}`));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id.replace("hero-", ""));
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.2, 0.5] },
    );
    sections.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-24 bg-background">
      <div className="site-container pt-28 pb-10 border-b border-border-subtle">
        <p className="text-label text-accent mb-3">Preview · not live</p>
        <h1 className="text-h1 text-foreground font-semibold max-w-2xl">
          Hero lab · C5 + new wrap variants
        </h1>
        <p className="mt-4 text-muted max-w-2xl leading-relaxed">
          <strong className="text-foreground">C5</strong> kept.{" "}
          <strong className="text-foreground">W4</strong> and{" "}
          <strong className="text-foreground">W5</strong> are full-section 3D wraps.{" "}
          <strong className="text-foreground">T1</strong> adds dim vertical tech-logo columns.
        </p>
        <Link href="/" className="inline-flex mt-6 mono text-sm text-accent link-underline">
          ← Back to live homepage
        </Link>
      </div>

      <div className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-30 w-44">
        <p className="text-label mb-3 px-2">Jump to</p>
        <nav className="flex flex-col gap-1">
          {VARIANTS.map((v) => (
            <a
              key={v.id}
              href={`#hero-${v.id}`}
              className={cn(
                "px-3 py-2 rounded-lg text-sm transition-colors border",
                activeId === v.id
                  ? "bg-accent-muted border-accent/30 text-accent"
                  : "border-transparent text-muted hover:text-foreground hover:bg-surface",
              )}
            >
              <span className="mono text-xs mr-2">{v.code}</span>
              {v.title.split(" ")[0]}
            </a>
          ))}
        </nav>
      </div>

      {VARIANTS.map((variant) => {
        const Component = variant.component;
        return (
          <section
            key={variant.id}
            id={`hero-${variant.id}`}
            className="border-b border-border scroll-mt-20"
          >
            <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-md border-b border-border-subtle">
              <div className="site-container py-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mono text-xs text-accent mb-1">{variant.code}</p>
                  <h2 className="heading text-lg text-foreground font-semibold">
                    {variant.title}
                  </h2>
                  <p className="text-sm text-muted mt-1">{variant.tagline}</p>
                </div>
                <p className="text-xs text-muted max-w-xs leading-relaxed">
                  <span className="text-muted-foreground font-medium">Best for: </span>
                  {variant.bestFor}
                </p>
              </div>
            </div>
            <Component profile={profile} />
          </section>
        );
      })}

      <div className="site-container pt-16">
        <div className="p-6 rounded-2xl border border-border-subtle bg-surface max-w-2xl">
          <p className="text-label text-accent mb-2">Pick one</p>
          <p className="text-foreground font-medium">
            Reply with <span className="mono text-accent">C5</span>,{" "}
            <span className="mono text-accent">W4</span>,{" "}
            <span className="mono text-accent">W5</span>, or{" "}
            <span className="mono text-accent">T1</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
