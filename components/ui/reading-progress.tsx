"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  /** Offset from top when a fixed header is present (px). */
  topOffset?: number;
}

export function ReadingProgress({ topOffset = 64 }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-40 h-0.5 bg-border-transparent print:hidden pointer-events-none"
      style={{ top: topOffset }}
      aria-hidden
    >
      <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
    </div>
  );
}
