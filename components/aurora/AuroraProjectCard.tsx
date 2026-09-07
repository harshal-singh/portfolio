"use client";

import { GlassCard } from "@/components/aurora/GlassCard";
import { ProjectPagePreview } from "@/components/projects/ProjectPagePreview";
import { CmsImage } from "@/components/ui/cms-image";
import {
  isExternalProjectLink,
  projectScrollDurationMs,
  projectScrollReturnMs,
} from "@/lib/projects/meta";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AuroraProjectCardProps {
  project: Project;
  className?: string;
}

export function AuroraProjectCard({
  project,
  className,
}: AuroraProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const external =
    isExternalProjectLink(project.link) &&
    project.link !== "#" &&
    project.link.trim() !== "";

  return (
    <GlassCard
      className={cn(
        "flex flex-col transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative m-3 mb-0 aspect-video overflow-hidden rounded-2xl border border-[var(--aurora-edge)] bg-white/50">
        {(project.role || project.year) && (
          <span className="aurora-pill absolute left-2.5 top-2.5 z-[2] !px-2.5 !py-1 !text-[0.68rem]">
            {project.role || project.year}
          </span>
        )}
        {project.imageUrl ? (
          project.imageScrollEnabled ? (
            <ProjectPagePreview
              src={project.imageUrl}
              alt={`${project.name} screenshot`}
              active={hovered}
              scrollDurationMs={projectScrollDurationMs(project)}
              returnDurationMs={projectScrollReturnMs(project)}
            />
          ) : (
            <CmsImage
              src={project.imageUrl}
              alt={`${project.name} screenshot`}
              className="h-full w-full object-cover object-top aspect-video"
            />
          )
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-[var(--aurora-v)]/20 to-[var(--aurora-p)]/10 p-6">
            <p className="jk text-2xl font-bold">{project.name}</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="jk text-[1.24rem] font-bold tracking-[-0.03em]">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-[0.9rem] leading-[1.7] text-muted">
          {project.description || project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tag) => (
            <span key={tag} className="aurora-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {external ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="aurora-ghost !px-3.5 !py-1.5 !text-[0.8rem]"
            >
              Visit ↗
            </a>
          ) : (
            <span className="aurora-tag border-dashed opacity-70">
              Code private
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
