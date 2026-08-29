import { ProjectShowcaseList } from "@/components/projects/ProjectShowcaseList";
import { SectionHeader } from "@/components/ui/section-header";
import type { Project, SectionMeta } from "@/lib/types";

interface ProjectsProps {
  section: SectionMeta;
  projects: Project[];
  showHeader?: boolean;
  id?: string;
}

export default function Projects({
  section,
  projects,
  showHeader = true,
  id,
}: ProjectsProps) {
  return (
    <section id={id} className="site-container pb-16 md:pb-24">
      {showHeader ? (
        <SectionHeader
          label={section.label}
          title={section.title}
          description={section.description || undefined}
        />
      ) : null}
      <ProjectShowcaseList projects={projects} variant="full" />
    </section>
  );
}
