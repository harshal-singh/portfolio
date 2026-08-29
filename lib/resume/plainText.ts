import type { Education, Experience, Profile } from "@/lib/types";
import {
  RESUME_SKILL_LABELS,
  RESUME_SKILL_ORDER,
  buildResumeSummary,
  formatResumeLocation,
  formatResumePeriod,
  formatResumePhone,
} from "@/lib/resume/display";

export function buildResumePlainText(
  profile: Profile,
  experience: Experience[],
  skills: Record<string, string[]>,
  education: Education[],
): string {
  const lines: string[] = [
    profile.name.toUpperCase(),
    `${formatResumePhone(profile.phone)} | ${profile.email} | LinkedIn | GitHub | ${formatResumeLocation(profile.location)}`,
    "",
    "SUMMARY",
    buildResumeSummary(profile),
    "",
    "TECHNICAL SKILLS",
    "----------------",
  ];

  for (const key of RESUME_SKILL_ORDER) {
    const items = skills[key];
    if (!items?.length) continue;
    lines.push(
      `${RESUME_SKILL_LABELS[key] ?? key}: ${items.join(", ")}`,
    );
  }

  lines.push("", "EXPERIENCE", "----------");

  for (const job of experience) {
    lines.push("");
    lines.push(`${job.company} | ${job.location}`);
    lines.push(`${job.role} | ${formatResumePeriod(job.period)}`);
    for (const point of job.points ?? []) {
      lines.push(`• ${point}`);
    }
  }

  lines.push("", "EDUCATION", "-----------");
  for (const item of education) {
    lines.push(`${item.degree} | ${item.grade}`);
    lines.push(`${item.school} | ${formatResumePeriod(item.period)}`);
  }

  return lines.join("\n");
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
