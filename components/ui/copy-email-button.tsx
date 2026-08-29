"use client";

import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import { Copy, Mail } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: "inline" | "card" | "ghost";
  showEmail?: boolean;
}

export function CopyEmailButton({
  email,
  className,
  variant = "inline",
  showEmail = true,
}: CopyEmailButtonProps) {
  const { copy } = useCopyToClipboard();

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={() => copy(email, "Email copied to clipboard")}
        className={cn(
          "flex w-full items-center justify-between gap-3 p-4 rounded-xl border border-border-subtle bg-surface",
          "hover:border-accent/25 transition-colors text-left group",
          className,
        )}
      >
        <span className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-accent" aria-hidden />
          <span className="text-sm text-foreground truncate">
            {showEmail ? email : "Copy email"}
          </span>
        </span>
        <Copy className="w-4 h-4 text-muted group-hover:text-accent shrink-0" />
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        type="button"
        onClick={() => copy(email, "Email copied to clipboard")}
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors",
          className,
        )}
      >
        <Copy className="w-3.5 h-3.5" />
        {showEmail ? email : "Copy email"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => copy(email, "Email copied to clipboard")}
      className={cn(
        "inline-flex items-center gap-2 text-base border border-border px-4 py-3 rounded-md",
        "hover:border-accent/30 hover:bg-accent-muted transition-colors",
        className,
      )}
    >
      <Copy className="w-4 h-4" />
      {showEmail ? email : "Copy email"}
    </button>
  );
}
