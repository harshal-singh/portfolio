import { normalizeBlogCover } from "@/lib/blog/covers";
import type { Project } from "@/lib/types";

/** Ensure array fields exist — legacy sheet rows may omit Phase 5 fields. */
export function normalizeProject(project: Project): Project {
  const content = project.content ?? [];
  return {
    ...project,
    slug: project.slug || project.id,
    overview: project.overview ?? "",
    outcomes: project.outcomes ?? [],
    metrics: project.metrics ?? [],
    content,
    hasCaseStudy: content.length > 0,
    cover: normalizeBlogCover(project.cover),
    featured: project.featured ?? false,
    stack: project.stack ?? [],
    imageScrollEnabled: project.imageScrollEnabled ?? false,
  };
}

export function normalizeProjectList(projects: Project[]): Project[] {
  return projects.map(normalizeProject);
}
