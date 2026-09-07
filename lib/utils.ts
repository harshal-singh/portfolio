import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strip CMS numbering like "03 — Experience" → "Experience". */
export function formatSectionKick(label: string): string {
  return label.replace(/^\d+\s*[—–-]\s*/, "").trim();
}
