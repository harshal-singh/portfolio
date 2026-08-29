"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:!bg-background group-[.toaster]:!text-foreground group-[.toaster]:!shadow-2xl group-[.toaster]:!rounded-xl !font-sans",
          description: "group-[.toast]:!text-muted text-sm",
          actionButton:
            "group-[.toast]:!bg-accent group-[.toast]:!text-accent-foreground font-medium",
          cancelButton:
            "group-[.toast]:!bg-surface-elevated group-[.toast]:!text-foreground group-[.toast]:!border-border",
          success: "group-[.toaster]:!bg-green-500 group-[.toaster]:!border-green-400",
          error: "group-[.toaster]:!bg-red-500 group-[.toaster]:!border-red-400",
        },
      }}
    />
  );
}
