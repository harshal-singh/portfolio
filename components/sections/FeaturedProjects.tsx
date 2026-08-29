"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { Project, SectionMeta } from "@/lib/types";
import { ProjectShowcaseList } from "@/components/projects/ProjectShowcaseList";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeaturedProjectsProps {
  section: SectionMeta;
  projects: Project[];
  limit?: number;
}

export default function FeaturedProjects({
  section,
  projects,
  limit = 3,
}: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.featured);
  const display =
    featured.length > 0 ? featured.slice(0, limit) : projects.slice(0, limit);

  return (
    <section id="work" className="site-container site-section">
      <Reveal>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <SectionHeader
            label={section.label}
            title={section.title}
            description={section.description || undefined}
            align="left"
            className="mb-0"
          />
          <Link
            href="/projects"
            className="mono text-sm text-foreground inline-flex items-center gap-1.5 link-underline"
          >
            All projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Reveal>
      <ProjectShowcaseList projects={display} variant="full" animated />
    </section>
  );
}
