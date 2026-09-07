"use client";

import { cn } from "@/lib/utils";
import { type HTMLAttributes, useEffect, useRef } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      node.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    node.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => node.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div ref={ref} className={cn("glass", className)} {...props}>
      {children}
    </div>
  );
}
