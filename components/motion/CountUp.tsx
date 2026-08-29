"use client";

import { useInView } from "@/lib/hooks/useInView";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

function parseMetric(value: string): { prefix: string; num: number; suffix: string } | null {
  const match = value.trim().match(/^([^0-9]*)([\d.]+)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function CountUp({ value, className, duration = 900 }: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ margin: "-5% 0px" });
  const reducedMotion = usePrefersReducedMotion();
  const parsed = useMemo(() => parseMetric(value), [value]);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || !inView || reducedMotion) {
      setDisplay(value);
      return;
    }

    const { prefix, num, suffix } = parsed;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current =
        num % 1 === 0 ? Math.round(num * eased) : Math.round(num * eased * 10) / 10;
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, reducedMotion, value, duration, parsed]);

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  );
}
