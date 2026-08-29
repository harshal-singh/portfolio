"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/lib/types";
import { ProjectShowcaseRow } from "@/components/projects/ProjectShowcaseRow";
import { cn } from "@/lib/utils";

interface ProjectShowcaseListProps {
  projects: Project[];
  variant?: "full" | "compact";
  animated?: boolean;
  className?: string;
}

export function ProjectShowcaseList({
  projects,
  variant = "full",
  animated = false,
  className,
}: ProjectShowcaseListProps) {
  return (
    <div className={cn("flex flex-col gap-16 md:gap-24 lg:gap-28", className)}>
      {projects.map((project, index) => {
        const row = (
          <ProjectShowcaseRow
            project={project}
            index={index}
            variant={variant}
          />
        );

        if (!animated) {
          return (
            <div key={project.id}>
              {row}
            </div>
          );
        }

        return (
          <Reveal key={project.id} delay={index * 80}>
            {row}
          </Reveal>
        );
      })}
    </div>
  );
}
