import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "muted";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          default: "bg-surface-elevated text-foreground border border-border-subtle",
          accent: "bg-accent-muted text-accent border border-accent/20",
          outline: "border border-border text-muted-foreground",
          muted: "bg-surface text-muted",
        }[variant],
        className,
      )}
      {...props}
    />
  );
}
