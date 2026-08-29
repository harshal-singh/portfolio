const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function parseMonthYear(value: string, isEnd = false): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/present|current|now/i.test(trimmed)) {
    return new Date();
  }

  const monthYear = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = MONTH_INDEX[monthYear[1].toLowerCase()];
    const year = Number(monthYear[2]);
    if (month !== undefined && !Number.isNaN(year)) {
      return new Date(year, month, isEnd ? 1 : 1);
    }
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);
  if (yearOnly) {
    const year = Number(yearOnly[1]);
    return new Date(year, isEnd ? 11 : 0, 1);
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed);
  }

  return null;
}

function splitPeriod(period: string): [string, string] | null {
  const parts = period.split(/\s*[—–-]\s*/);
  if (parts.length !== 2) return null;
  return [parts[0], parts[1]];
}

function monthsBetween(start: Date, end: Date): number {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return Math.max(months, 1);
}

function formatDurationLabel(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} ${months === 1 ? "month" : "months"}`;
  }

  if (months === 0) {
    return `${years} ${years === 1 ? "year" : "years"}`;
  }

  const yearLabel = `${years} ${years === 1 ? "year" : "years"}`;
  const monthLabel = `${months} ${months === 1 ? "month" : "months"}`;
  return `${yearLabel} ${monthLabel}`;
}

/** Human-readable tenure from a CMS period string, e.g. "Aug 2024 — May 2025". */
export function formatExperienceDuration(
  period: string,
  options?: { current?: boolean },
): string | null {
  const range = splitPeriod(period);
  if (!range) return null;

  const [startRaw, endRaw] = range;
  const start = parseMonthYear(startRaw);
  const end =
    options?.current || /present|current|now/i.test(endRaw)
      ? new Date()
      : parseMonthYear(endRaw, true);

  if (!start || !end || end < start) return null;

  return formatDurationLabel(monthsBetween(start, end));
}

export function formatExperiencePeriodLine(
  period: string,
  location: string,
  options?: { current?: boolean },
): string {
  const duration = formatExperienceDuration(period, options);
  const parts = [period];
  if (duration) parts.push(duration);
  if (location.trim()) parts.push(location.trim());
  return parts.join(" · ");
}
