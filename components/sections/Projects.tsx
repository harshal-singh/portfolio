import { AuroraProjectCard } from "@/components/aurora/AuroraProjectCard";
import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
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
        <AuroraSectionHeader
          label={section.label}
          title={section.title}
          description={section.description || undefined}
          align="left"
        />
      ) : null}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <AuroraProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
