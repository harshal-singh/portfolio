/** Paths under `public/` are served from the site root (e.g. `/images/profile.jpg`). */
export function resolvePublicAsset(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return encodeURI(withSlash);
}

export function assetFilename(path: string, fallback = "resume.pdf"): string {
  const segment = path.split("/").filter(Boolean).pop();
  if (!segment) return fallback;
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** Fetch a public or same-origin asset and trigger a file download (no new tab). */
export async function downloadPublicAsset(
  path: string,
  fallbackFilename = "resume.pdf",
): Promise<void> {
  const url = resolvePublicAsset(path);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status})`);
  }

  let filename = assetFilename(path, fallbackFilename);
  const disposition = response.headers.get("Content-Disposition");
  const match = disposition?.match(/filename="([^"]+)"/);
  if (match?.[1]) filename = match[1];

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}
