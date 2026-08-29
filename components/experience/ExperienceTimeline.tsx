"use client";

import { ExperienceJobCard } from "@/components/experience/ExperienceJobCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  experience: Experience[];
  variant?: "compact" | "full";
  className?: string;
  /** ms between each job card reveal */
  staggerMs?: number;
}

export function ExperienceTimeline({
  experience,
  variant = "full",
  className,
  staggerMs = 120,
}: ExperienceTimelineProps) {
  return (
    <div
      className={cn(
        "relative border-l border-border ml-3 md:ml-6 max-w-4xl",
        className,
      )}
    >
      {experience.map((job, index) => (
        <Reveal key={job.id} delay={index * staggerMs}>
          <ExperienceJobCard
            job={job}
            variant={variant}
            isLast={index === experience.length - 1}
          />
        </Reveal>
      ))}
    </div>
  );
}
