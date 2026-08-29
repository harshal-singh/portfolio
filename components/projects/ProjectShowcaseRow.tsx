"use client";

import { ProjectPagePreview } from "@/components/projects/ProjectPagePreview";
import { CmsImage } from "@/components/ui/cms-image";
import { Tag } from "@/components/ui/tag";
import {
  isExternalProjectLink,
  projectCaseStudyHref,
  projectHasCaseStudy,
  projectScrollDurationMs,
  projectScrollReturnMs,
} from "@/lib/projects/meta";
import { gradientMap } from "@/lib/seed";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProjectShowcaseRowProps {
  project: Project;
  index: number;
  variant?: "full" | "compact";
}

function ProjectShowcaseMedia({
  project,
  previewActive,
}: {
  project: Project;
  previewActive: boolean;
}) {
  const gradient =
    gradientMap[project.cover as keyof typeof gradientMap] ??
    gradientMap["gradient-1"];

  if (project.imageUrl) {
    if (project.imageScrollEnabled) {
      return (
        <ProjectPagePreview
          src={project.imageUrl}
          alt={`${project.name} screenshot`}
          active={previewActive}
          scrollDurationMs={projectScrollDurationMs(project)}
          returnDurationMs={projectScrollReturnMs(project)}
        />
      );
    }

    return (
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm">
        <CmsImage
          src={project.imageUrl}
          alt={`${project.name} screenshot`}
          className="w-full aspect-16/10 object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle aspect-[16/10] bg-gradient-to-br",
        gradient,
      )}
    >
      <div className="absolute inset-0 bg-surface/40" />
      <div className="relative flex h-full items-end p-6 md:p-8">
        <p className="heading text-2xl md:text-3xl font-semibold text-foreground/90">
          {project.name}
        </p>
      </div>
    </div>
  );
}

export function ProjectShowcaseRow({
  project,
  index,
  variant = "full",
}: ProjectShowcaseRowProps) {
  const [rowHovered, setRowHovered] = useState(false);
  const compact = variant === "compact";
  const imageLeft = index % 2 === 0;
  const hasCaseStudy = projectHasCaseStudy(project);
  const href = hasCaseStudy ? projectCaseStudyHref(project) : project.link;
  const external =
    !hasCaseStudy &&
    isExternalProjectLink(project.link) &&
    project.link !== "#" &&
    project.link.trim() !== "";
  const inactive = !hasCaseStudy && !external;
  const stack = compact ? project.stack.slice(0, 4) : project.stack;

  const content = (
    <div className="relative py-2 md:py-4">
      <div className="flex items-start justify-between gap-4 mb-5">
        <span className="mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")} — {project.year}
          {project.role ? ` · ${project.role}` : null}
        </span>
        {!inactive ? (
          <span
            className={cn(
              "shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center",
              "text-muted group-hover:text-accent-foreground group-hover:bg-accent group-hover:border-accent transition-all",
            )}
            aria-hidden
          >
            <ArrowUpRight className="w-4 h-4" />
          </span>
        ) : null}
      </div>

      <h3 className="heading text-h2 md:text-3xl text-foreground mb-3 group-hover:text-accent transition-colors">
        {project.name}
      </h3>
      <p className="text-muted text-lg mb-4">{project.tagline}</p>

      {!compact && project.description ? (
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-xl">
          {project.description}
        </p>
      ) : null}

      {hasCaseStudy && compact ? (
        <p className="mono text-xs text-accent mb-4">Case study →</p>
      ) : null}

      <div className="flex flex-wrap gap-2 pt-5 border-t border-border-subtle">
        {stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </div>
  );

  const grid = (
    <div
      className={cn(
        "group grid md:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-center",
        inactive && "cursor-default",
      )}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
    >
      <div className={cn(!imageLeft && "md:order-2")}>
        <ProjectShowcaseMedia project={project} previewActive={rowHovered} />
      </div>
      <div className={cn(!imageLeft && "md:order-1")}>{content}</div>
    </div>
  );

  if (hasCaseStudy) {
    return (
      <Link href={href} className="block">
        {grid}
      </Link>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {grid}
      </a>
    );
  }

  return <article>{grid}</article>;
}
