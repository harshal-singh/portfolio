"use client";

import { GlassCard } from "@/components/aurora/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { formatExperienceWhenLine } from "@/lib/experience/duration";
import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AuroraExperienceCardProps {
  job: Experience;
  index: number;
  className?: string;
  variant?: "compact" | "full";
}

const dotGradients = [
  "linear-gradient(120deg, var(--aurora-v), var(--aurora-p))",
  "linear-gradient(120deg, var(--aurora-p), var(--aurora-s))",
  "linear-gradient(120deg, var(--aurora-s), var(--aurora-m))",
];

export function AuroraExperienceCard({
  job,
  index,
  className,
  variant = "compact",
}: AuroraExperienceCardProps) {
  const points = variant === "full" ? job.points : job.points.slice(0, 4);

  return (
    <Reveal delay={index * 80}>
      <GlassCard className={cn("aurora-exp-card", className)}>
        <div
          className="aurora-exp-dot grid place-items-center rounded-full text-[0.75rem] font-bold text-white"
          style={{ background: dotGradients[index % dotGradients.length] }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <p className="aurora-exp-when">
          {formatExperienceWhenLine(job.period, job.location)}
        </p>
        <h3 className="jk aurora-exp-company">{job.company}</h3>
        <p className="aurora-exp-role">{job.role}</p>
        {points.length > 0 ? (
          <ul className="aurora-exp-list grid">
            {points.map((point) => (
              <li key={point} className="relative">
                <span
                  className="absolute left-0 top-[0.6rem] h-[5px] w-[5px] rounded-full bg-[var(--aurora-v)] opacity-55"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
        {variant === "full" && job.technologies.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {job.technologies.map((tech) => (
              <span key={tech} className="aurora-tag">
                {tech}
              </span>
            ))}
          </div>
        ) : null}
      </GlassCard>
    </Reveal>
  );
}
