"use client";

import { useEffect, useState } from "react";

export interface MouseParallax {
  x: number;
  y: number;
}

export function useHero3dMouse(): {
  mouse: MouseParallax;
  reducedMotion: boolean;
} {
  const [mouse, setMouse] = useState<MouseParallax>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return { mouse, reducedMotion };
}
