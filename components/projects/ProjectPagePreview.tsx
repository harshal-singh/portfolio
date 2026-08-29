"use client";

import { resolvePublicAsset } from "@/lib/assets";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import {
  DEFAULT_PROJECT_SCROLL_DURATION_MS,
  DEFAULT_PROJECT_SCROLL_RETURN_MS,
} from "@/lib/projects/meta";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProjectPagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  /** When true (e.g. row hover), scroll through the page preview. */
  active?: boolean;
  /** Scroll duration in ms when hovering (default 5000). */
  scrollDurationMs?: number;
  /** Return-to-top duration in ms on mouse leave (default 450). */
  returnDurationMs?: number;
}

export function ProjectPagePreview({
  src,
  alt,
  className,
  active = false,
  scrollDurationMs = DEFAULT_PROJECT_SCROLL_DURATION_MS,
  returnDurationMs = DEFAULT_PROJECT_SCROLL_RETURN_MS,
}: ProjectPagePreviewProps) {
  const resolved = resolvePublicAsset(src);
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const containerWidth = container.clientWidth;
    if (!containerWidth || !image.naturalWidth) return;

    const scaledHeight =
      (image.naturalHeight / image.naturalWidth) * containerWidth;
    setMaxScroll(Math.max(0, scaledHeight - container.clientHeight));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure]);

  if (!resolved) return null;

  const canScroll = !reducedMotion && maxScroll > 0;
  const scrollOffset = active && canScroll ? maxScroll : 0;
  const transition = canScroll
    ? active
      ? `transform ${scrollDurationMs}ms linear 1s`
      : `transform ${returnDurationMs}ms ease-out`
    : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm",
        "aspect-16/10",
        className,
      )}
    >
      <div
        className="will-change-transform"
        style={{
          transform: `translateY(-${scrollOffset}px)`,
          transition,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- full-page scroll preview */}
        <img
          ref={imageRef}
          src={resolved}
          alt={alt}
          className="block w-full h-auto"
          loading="lazy"
          decoding="async"
          onLoad={measure}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
    </div>
  );
}
