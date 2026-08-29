/** Canonical site origin — set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (raw) {
    const url = raw.startsWith("http") ? raw : `https://${raw}`;
    return url.replace(/\/$/, "");
  }

  return "https://harshal-singh.vercel.app";
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export const SITE_NAME = "Harshal Singh";
