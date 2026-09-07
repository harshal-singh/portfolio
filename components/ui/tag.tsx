import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md";
}

export function Tag({ className, size = "sm", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "aurora-tag",
        size === "md" && "!text-xs !px-2.5 !py-1",
        className,
      )}
      {...props}
    />
  );
}
