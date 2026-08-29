"use client";

import type { Hero3dSceneId } from "@/components/hero-lab/hero3d/types";
import {
  getHeroCopy,
  HeroCtas,
  HeroFooter,
  HeroStatusBadge,
} from "@/components/hero-lab/heroShared";
import type { Profile } from "@/lib/types";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const Hero3dSceneCanvas = dynamic(
  () =>
    import("@/components/hero-lab/hero3d/Hero3dSceneCanvas").then(
      (m) => m.Hero3dSceneCanvas,
    ),
  { ssr: false },
);

const HeroAmbientCanvas = dynamic(
  () =>
    import("@/components/hero-lab/hero3d/HeroAmbientCanvas").then(
      (m) => m.HeroAmbientCanvas,
    ),
  { ssr: false },
);

/** Solid base + top glow — sits behind the 3D canvas */
function HeroBaseBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-background" aria-hidden />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(900px,120vw)] h-[420px] bg-accent-muted rounded-full blur-3xl opacity-70 pointer-events-none"
        aria-hidden
      />
    </>
  );
}

/** Darkens only the left — keeps 3D visible on the right */
function HeroTextScrim() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{
        background: [
          "linear-gradient(90deg, rgba(9,9,11,0.97) 0%, rgba(9,9,11,0.82) 32%, rgba(9,9,11,0.35) 52%, transparent 62%)",
          "linear-gradient(180deg, #09090b 0%, transparent 18%)",
        ].join(", "),
      }}
    />
  );
}

/** C5 — split layout with torus knot panel */
export function HeroSplitC5({ profile }: { profile: Profile }) {
  const copy = getHeroCopy(profile);

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-background">
      <HeroBaseBackground />
      <div className="relative z-10 flex items-center site-container py-16 md:py-20 min-h-[88vh]">
        <div className="grid lg:grid-cols-[1fr_44%] gap-8 lg:gap-10 items-center w-full rise-in">
          <HeroContent profile={profile} copy={copy} />
          <div className="hidden lg:block relative h-[min(420px,50vh)] min-h-[280px]">
            <div className="absolute inset-0 rounded-2xl border border-accent/15 bg-background overflow-hidden ring-1 ring-accent/10">
              <Hero3dSceneCanvas
                scene="torus-knot"
                className="absolute inset-0 w-full h-full"
                hint="Move cursor · torus knot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Full-section ambient 3D wrapping the hero */
export function HeroAmbientWrap({
  profile,
  scene,
  hint,
}: {
  profile: Profile;
  scene: Hero3dSceneId;
  hint: string;
}) {
  const copy = getHeroCopy(profile);

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-background isolate">
      <div className="absolute inset-0 z-0">
        <HeroBaseBackground />
      </div>

      {/* 3D canvas — above base, below text scrim */}
      <div className="absolute inset-0 z-[1] min-h-[88vh]">
        <HeroAmbientCanvas
          scene={scene}
          hint={hint}
          className="absolute inset-0 w-full h-full min-h-[88vh]"
        />
      </div>

      {/* Left-only scrim for copy readability — must NOT cover the whole canvas */}
      <div className="absolute inset-0 z-[2]">
        <HeroTextScrim />
      </div>

      <div className="relative z-10 site-container min-h-[88vh] flex flex-col justify-center py-16 md:py-20">
        <div className="rise-in max-w-3xl">
          <HeroContent profile={profile} copy={copy} />
        </div>
      </div>
    </section>
  );
}

function HeroContent({
  profile,
  copy,
}: {
  profile: Profile;
  copy: ReturnType<typeof getHeroCopy>;
}) {
  return (
    <>
      <HeroStatusBadge status={profile.status} />
      <p className="text-label text-muted mb-4">
        {profile.name} · {profile.role}
      </p>
      <h1 className="text-display text-foreground font-semibold leading-[1.05] max-w-3xl">
        {copy.headline} <span className="text-accent">{copy.highlight}</span>
      </h1>
      <p className="mt-8 text-body-lg text-muted max-w-2xl leading-relaxed">
        {copy.valueProp}
      </p>
      <HeroCtas copy={copy} />
      <HeroFooter profile={profile} />
    </>
  );
}

export function createAmbientVariant(
  scene: Hero3dSceneId,
  hint: string,
): ComponentType<{ profile: Profile }> {
  return function AmbientVariant({ profile }: { profile: Profile }) {
    return <HeroAmbientWrap profile={profile} scene={scene} hint={hint} />;
  };
}
