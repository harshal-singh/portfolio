"use client";

import { toast } from "sonner";
import { useCallback } from "react";

export function useCopyToClipboard() {
  const copy = useCallback(async (text: string, successMessage = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
      return true;
    } catch {
      toast.error("Failed to copy");
      return false;
    }
  }, []);

  return { copy };
}
