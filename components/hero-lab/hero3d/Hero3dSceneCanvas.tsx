"use client";

import { TorusKnotScene } from "@/components/hero-lab/hero3d/ambientScenes";
import { Hero3dSceneWrapper } from "@/components/hero-lab/hero3d/Hero3dCanvasShell";
import type { Hero3dSceneId } from "@/components/hero-lab/hero3d/types";

interface Hero3dSceneCanvasProps {
  scene: Hero3dSceneId;
  photoUrl?: string;
  hint?: string;
  className?: string;
}

export function Hero3dSceneCanvas({
  scene,
  hint,
  className = "",
}: Hero3dSceneCanvasProps) {
  return (
    <Hero3dSceneWrapper
      className={`relative ${className}`}
      hint={hint}
      render={(mouse) => {
        if (scene === "torus-knot") return <TorusKnotScene mouse={mouse} />;
        return null;
      }}
    />
  );
}
