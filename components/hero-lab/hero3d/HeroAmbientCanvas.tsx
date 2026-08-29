"use client";

import { Hero3dSceneWrapper } from "@/components/hero-lab/hero3d/Hero3dCanvasShell";
import {
  AmbientGeodesicCageScene,
  AmbientPortalArchScene,
} from "@/components/hero-lab/hero3d/ambientScenes";
import type { Hero3dSceneId } from "@/components/hero-lab/hero3d/types";

interface HeroAmbientCanvasProps {
  scene: Hero3dSceneId;
  hint?: string;
  className?: string;
}

function renderAmbientScene(scene: Hero3dSceneId, mouse: { x: number; y: number }) {
  switch (scene) {
    case "ambient-portal-arch":
      return <AmbientPortalArchScene mouse={mouse} />;
    case "ambient-geodesic-cage":
      return <AmbientGeodesicCageScene mouse={mouse} />;
    default:
      return <AmbientPortalArchScene mouse={mouse} />;
  }
}

export function HeroAmbientCanvas({
  scene,
  hint,
  className = "",
}: HeroAmbientCanvasProps) {
  return (
    <Hero3dSceneWrapper
      className={`relative ${className}`}
      hint={hint}
      camera={{ position: [0, 0.15, 5.8], fov: 52 }}
      render={(mouse) => renderAmbientScene(scene, mouse)}
    />
  );
}
