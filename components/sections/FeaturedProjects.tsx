"use client";

import { AuroraProjectCard } from "@/components/aurora/AuroraProjectCard";
import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import type { Project, SectionMeta } from "@/lib/types";

interface FeaturedProjectsProps {
  section: SectionMeta;
  projects: Project[];
  limit?: number;
}

export default function FeaturedProjects({
  section,
  projects,
  limit = 2,
}: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.featured);
  const display =
    featured.length > 0 ? featured.slice(0, limit) : projects.slice(0, limit);

  return (
    <section id="work" className="site-container py-12 md:py-20">
      <AuroraSectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {display.map((project) => (
          <AuroraProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
