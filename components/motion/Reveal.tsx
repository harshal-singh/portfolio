"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks/useInView";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ margin: "-8% 0px" });
  const reducedMotion = usePrefersReducedMotion();
  const visible = reducedMotion || inView;

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
