import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md";
}

export function Tag({ className, size = "sm", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center rounded-md border border-border-subtle bg-surface-elevated text-muted-foreground",
        size === "sm" && "text-[11px] px-2 py-1",
        size === "md" && "text-xs px-2.5 py-1",
        className,
      )}
      {...props}
    />
  );
}
