/** Parse stored blog date string → Date (for sitemap / structured data). */
export function parseBlogDate(date: string): Date | undefined {
  if (!date.trim()) return undefined;
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? undefined : new Date(parsed);
}

/** Display format used on the site and in the sheet, e.g. "Jun 24, 2025". */
export function formatBlogDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Parse stored blog date string → YYYY-MM-DD for <input type="date">. */
export function blogDateToInputValue(date: string): string {
  if (!date.trim()) return "";
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return "";
  const d = new Date(parsed);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** YYYY-MM-DD from date picker → stored display format. */
export function inputValueToBlogDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return formatBlogDate(new Date(y, m - 1, d));
}
