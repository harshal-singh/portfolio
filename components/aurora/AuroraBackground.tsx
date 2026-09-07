"use client";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useEffect } from "react";

export function AuroraBackground() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const blobs = Array.from(document.querySelectorAll<HTMLElement>("[data-aurora-blob]"));
    let tx = 0.5;
    let ty = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      tx = event.clientX / window.innerWidth;
      ty = event.clientY / window.innerHeight;
    };

    const loop = () => {
      cx += (tx - cx) * 0.035;
      cy += (ty - cy) * 0.035;
      const sy = window.scrollY;

      blobs.forEach((blob, index) => {
        const k = (index + 1) * 14;
        const direction = index % 2 ? -1 : 1;
        const x = (cx - 0.5) * k * direction;
        const y = (cy - 0.5) * k * direction + sy * 0.04 * (index % 2 ? 1 : -1);
        blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      frame = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-[-20%] z-0 opacity-85 blur-[70px] dark:opacity-50"
        aria-hidden
      >
        <span
          data-aurora-blob
          className="absolute left-[-6%] top-[-4%] h-[52vw] w-[52vw] rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,.55), transparent 66%)",
          }}
        />
        <span
          data-aurora-blob
          className="absolute right-[-6%] top-[6%] h-[46vw] w-[46vw] rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,.42), transparent 66%)",
          }}
        />
        <span
          data-aurora-blob
          className="absolute bottom-[-8%] left-[14%] h-[48vw] w-[48vw] rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,.45), transparent 66%)",
          }}
        />
        <span
          data-aurora-blob
          className="absolute bottom-[2%] right-[8%] h-[36vw] w-[36vw] rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(45,212,191,.42), transparent 66%)",
          }}
        />
      </div>
    </>
  );
}
