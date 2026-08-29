import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { Tag } from "@/components/ui/tag";
import { formatExperiencePeriodLine } from "@/lib/experience/duration";
import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExperienceJobCardProps {
  job: Experience;
  variant?: "compact" | "full";
  isLast?: boolean;
}

function BulletList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul
      className={cn(
        "space-y-2 text-muted text-[15px] leading-relaxed",
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-accent shrink-0">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceJobCard({
  job,
  variant = "full",
  isLast = false,
}: ExperienceJobCardProps) {
  const compact = variant === "compact";
  const points = job.points ?? [];
  const impactItems = job.impact ?? [];
  const metrics = job.metrics ?? [];
  const technologies = job.technologies ?? [];
  const responsibilities = compact ? [] : points;
  const impact = compact ? impactItems.slice(0, 2) : impactItems;

  return (
    <article
      className={cn(
        "relative pl-8 md:pl-12",
        !isLast && (compact ? "pb-10" : "pb-16"),
      )}
    >
      <div
        className={cn(
          "absolute -left-1.75 top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-colors",
          job.current
            ? "bg-accent border-accent"
            : "bg-background border-muted",
        )}
      />

      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="heading text-h3 text-foreground">{job.role}</h3>
            <span className="text-muted">at</span>
            <span className="text-accent heading text-h3">{job.company}</span>
          </div>
          <p className="mono text-xs text-muted mt-2">
            {formatExperiencePeriodLine(job.period, job.location, {
              current: job.current,
            })}
          </p>
        </div>
        {job.current ? (
          <Badge variant="accent" className="shrink-0 mt-1.5">
            Current
          </Badge>
        ) : null}
      </div>

      {job.overview && !compact ? (
        <p className="text-body text-muted leading-relaxed max-w-3xl mt-4 mb-6">
          {job.overview}
        </p>
      ) : null}

      {metrics.length > 0 ? (
        <div
          className={cn(
            "grid gap-3 my-6",
            compact
              ? "grid-cols-2 max-w-md"
              : "grid-cols-2 md:grid-cols-3 max-w-2xl",
          )}
        >
          {metrics.slice(0, compact ? 2 : undefined).map((m) => (
            <MetricCard
              key={m.id}
              value={m.value}
              label={m.label}
              variant="compact"
              className="text-left px-4 py-4"
            />
          ))}
        </div>
      ) : null}

      {responsibilities.length > 0 ? (
        <div className={cn(compact ? "mb-3" : "mb-6")}>
          {!compact ? (
            <p className="text-label mb-3">Responsibilities</p>
          ) : null}
          <BulletList items={responsibilities} />
        </div>
      ) : null}

      {impact.length > 0 ? (
        <div className={cn(!compact && "mb-6")}>
          {!compact ? <p className="text-label mb-3">Business impact</p> : null}
          <BulletList items={impact} />
        </div>
      ) : null}

      {technologies.length > 0 && !compact ? (
        <div>
          <p className="text-label mb-3">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Tag key={tech} size="md">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      ) : null}

      {job.gapAfterNote && !compact ? (
        <p className="mono text-xs text-muted mt-6 pt-4 border-t border-dashed border-border">
          {job.gapAfterNote}
        </p>
      ) : null}
    </article>
  );
}
