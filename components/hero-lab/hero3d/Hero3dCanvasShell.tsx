"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { useHero3dMouse } from "./useHero3dMouse";

export const HERO_3D_ACCENT = "#2B6BDC";
export const HERO_3D_BG = "#09090b";

export function Hero3dSceneWrapper({
  className,
  hint,
  camera,
  fog,
  render,
}: {
  className?: string;
  hint?: string;
  camera?: { position: [number, number, number]; fov?: number };
  fog?: boolean;
  render: (mouse: { x: number; y: number }) => ReactNode;
}) {
  const { mouse, reducedMotion } = useHero3dMouse();

  if (reducedMotion) {
    return (
      <div className={`${className ?? ""} bg-background`} aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 55% 45%, rgba(212,255,79,0.1) 0%, transparent 65%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${className ?? ""} bg-background h-full w-full min-h-[inherit]`}
      aria-hidden
    >
      <Canvas
        camera={{
          position: camera?.position ?? [0, 0, 4.5],
          fov: camera?.fov ?? 45,
        }}
        dpr={[1, 1.75]}
        gl={{ alpha: false, antialias: true }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: HERO_3D_BG,
        }}
      >
        <color attach="background" args={[HERO_3D_BG]} />
        {fog ? <fog attach="fog" args={[HERO_3D_BG, 4, 14]} /> : null}
        <ambientLight intensity={0.55} />
        <Suspense fallback={null}>{render(mouse)}</Suspense>
      </Canvas>
      {hint ? (
        <p className="absolute bottom-4 left-4 mono text-[10px] uppercase tracking-wider text-muted pointer-events-none z-10">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
