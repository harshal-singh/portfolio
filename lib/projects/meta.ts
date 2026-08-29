import type { Project } from "@/lib/types";

export type ProjectMeta = Omit<Project, "content">;

export function stripProjectContent(project: Project): ProjectMeta {
  const { content: _, ...meta } = project;
  const hasCaseStudy = projectHasCaseStudy(project);
  return { ...meta, hasCaseStudy };
}

export function projectHasCaseStudy(
  project: Pick<Project, "content" | "hasCaseStudy">,
): boolean {
  if (project.hasCaseStudy !== undefined) return project.hasCaseStudy;
  return (project.content?.length ?? 0) > 0;
}

export function projectCaseStudyHref(project: Pick<Project, "slug">): string {
  return `/projects/${project.slug}`;
}

export function isExternalProjectLink(link: string): boolean {
  return Boolean(link && link !== "#" && !link.startsWith("/"));
}

export const DEFAULT_PROJECT_SCROLL_DURATION_MS = 45_000;
export const DEFAULT_PROJECT_SCROLL_RETURN_MS = 5_000;

export function projectScrollDurationMs(
  project: Pick<Project, "imageScrollDurationMs">,
): number {
  const ms = project.imageScrollDurationMs;
  return ms && ms > 0 ? ms : DEFAULT_PROJECT_SCROLL_DURATION_MS;
}

export function projectScrollReturnMs(
  project: Pick<Project, "imageScrollReturnMs">,
): number {
  const ms = project.imageScrollReturnMs;
  return ms && ms > 0 ? ms : DEFAULT_PROJECT_SCROLL_RETURN_MS;
}
