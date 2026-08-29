import type { Profile, Project } from "@/lib/types";

export const RESUME_SUMMARY =
  "Frontend Engineer with 3+ years of experience building production web applications using React.js, Next.js, TypeScript, and JavaScript. Experienced in reusable UI architecture, SSR-based applications, API integration, performance optimization, and CI/CD. Strong cross-functional experience working with product, design, and backend teams, with additional hands-on experience in Node.js, AWS, Docker, and AI-assisted development.";

export const RESUME_SKILL_LABELS: Record<string, string> = {
  Languages: "Languages",
  Frontend: "Frontend",
  Backend: "Backend",
  Databases: "Databases",
  DevOps: "Cloud & DevOps",
  Tooling: "Tools",
};

export const RESUME_SKILL_ORDER = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "DevOps",
  "Tooling",
] as const;

export function buildResumeSummary(profile: Profile): string {
  const site = profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `${RESUME_SUMMARY} Feel free to explore my work: ${site}`;
}

export function formatResumePhone(phone: string): string {
  return phone.replace(/\s+/g, "");
}

export function formatResumeLocation(location: string): string {
  return location.split("·")[0]?.trim() || location;
}

export function formatResumePeriod(period: string): string {
  return period.replace(/—/g, "–");
}

export function resumeProjects(projects: Project[]): Project[] {
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, 2);
}

export function projectRepoUrl(project: Project): string | null {
  if (project.slug === "meetspace") {
    return "https://github.com/harshal-singh/meet";
  }
  const match = project.overview?.match(/github\.com\/[^\s)]+/i);
  return match ? `https://${match[0]}` : null;
}

export function projectIsPrivate(project: Project): boolean {
  return project.slug === "pragnyapan";
}
