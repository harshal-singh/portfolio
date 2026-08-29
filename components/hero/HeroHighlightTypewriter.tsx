"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

export const DEFAULT_PHRASES = [
  "loads faster.",
  "scales easily.",
  "looks perfect.",
];

type Phase = "waiting" | "typing" | "pause" | "deleting";

type HeroHighlightTypewriterProps = {
  phrases?: string[];
  /** Delay before typing starts (ms) — sync with headline reveal */
  startDelay?: number;
  className?: string;
};

export function HeroHighlightTypewriter({
  phrases = DEFAULT_PHRASES,
  startDelay = 0,
  className,
}: HeroHighlightTypewriterProps) {
  const items = useMemo(
    () => (phrases.length > 0 ? phrases : DEFAULT_PHRASES),
    [phrases],
  );

  const [phase, setPhase] = useState<Phase>("waiting");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const current = items[phraseIndex] ?? items[0];
  const displayed = current.slice(0, charIndex);

  useEffect(() => {
    setPhraseIndex(0);
    setCharIndex(0);
    setPhase("waiting");

    const timer = window.setTimeout(() => setPhase("typing"), startDelay);
    return () => window.clearTimeout(timer);
  }, [startDelay, items]);

  useEffect(() => {
    if (phase === "waiting") return;

    let timer: number;

    if (phase === "typing") {
      if (charIndex < current.length) {
        timer = window.setTimeout(() => setCharIndex((c) => c + 1), 55);
      } else {
        timer = window.setTimeout(() => setPhase("deleting"), 1800);
      }
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        timer = window.setTimeout(() => setCharIndex((c) => c - 1), 35);
      } else {
        setPhraseIndex((i) => (i + 1) % items.length);
        setPhase("typing");
      }
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [phase, charIndex, current, items.length]);

  return (
    <span
      className={cn("inline text-accent", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{displayed}</span>
    </span>
  );
}

export function estimateTypewriterFinishMs(
  phrases: string[],
  startDelay: number,
): number {
  const longest = Math.max(...phrases.map((p) => p.length), 0);
  return startDelay + longest * 55 + 120;
}
