import type { Project } from "@/lib/types";
import {
  isExternalProjectLink,
  projectCaseStudyHref,
  projectHasCaseStudy,
} from "@/lib/projects/meta";
import { Tag } from "@/components/ui/tag";
import { CmsImage } from "@/components/ui/cms-image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "compact" | "full";
}

export function ProjectCard({
  project,
  index = 0,
  variant = "full",
}: ProjectCardProps) {
  const compact = variant === "compact";
  const hasCaseStudy = projectHasCaseStudy(project);
  const href = hasCaseStudy ? projectCaseStudyHref(project) : project.link;
  const external =
    !hasCaseStudy &&
    isExternalProjectLink(project.link) &&
    project.link !== "#" &&
    project.link.trim() !== "";
  const inactive = !hasCaseStudy && !external;
  const stack = compact ? project.stack.slice(0, 4) : project.stack;

  const cardBody = (
    <>
      <div
        className={cn(
          "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity",
          project.accent === "lime" ? "bg-accent-muted" : "bg-surface-elevated",
        )}
      />
      <div className="relative">
        {project.imageUrl ? (
          <CmsImage
            src={project.imageUrl}
            alt={`${project.name} screenshot`}
            className="w-full aspect-video object-cover rounded-xl mb-6 border border-border-subtle"
          />
        ) : null}
        <div className="flex items-start justify-between mb-6">
          <span className="mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")} — {project.year}
            {project.role ? ` · ${project.role}` : null}
          </span>
          <span
            className={cn(
              "w-10 h-10 rounded-full border border-border flex items-center justify-center",
              "text-muted group-hover:text-accent-foreground group-hover:bg-accent group-hover:border-accent transition-all",
            )}
            aria-hidden
          >
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
        <h3 className="heading text-h2 text-foreground mb-2 group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-muted mb-4">{project.tagline}</p>
        {!compact && project.description ? (
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        ) : null}
        {hasCaseStudy && compact ? (
          <p className="mono text-xs text-accent mb-4">Case study →</p>
        ) : null}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
          {stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </>
  );

  const className = cn(
    "group relative block p-7 md:p-8 rounded-2xl border border-border-subtle bg-surface",
    "hover:border-accent/25 transition-all overflow-hidden",
  );

  if (hasCaseStudy) {
    return (
      <Link href={href} className={className}>
        {cardBody}
      </Link>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {cardBody}
      </a>
    );
  }

  if (inactive) {
    return <article className={cn(className, "cursor-default")}>{cardBody}</article>;
  }

  return <article className={className}>{cardBody}</article>;
}
