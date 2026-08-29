import "server-only";
import { getFullProject, getPortfolioContent, getAllProjects } from "@/lib/content/getContent";
import { sanitizeForRsc } from "@/lib/content/sanitize";
import {
  projectHasCaseStudy,
  stripProjectContent,
  type ProjectMeta,
} from "@/lib/projects/meta";
import type { Profile, Project } from "@/lib/types";

export interface ProjectViewData {
  project: Project | null;
  profile: Profile;
  related: ProjectMeta[];
}

export async function getProjectView(slug: string): Promise<ProjectViewData> {
  const content = await getPortfolioContent();
  const fullProject = await getFullProject(slug);
  const allProjects = await getAllProjects();

  const project =
    fullProject && projectHasCaseStudy(fullProject) ? fullProject : null;

  const related = allProjects
    .filter((p) => p.slug !== slug && projectHasCaseStudy(p))
    .slice(0, 2)
    .map(stripProjectContent);

  return sanitizeForRsc({
    project,
    profile: content.profile,
    related,
  });
}
