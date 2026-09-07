"use client";

import { AuroraExperienceCard } from "@/components/aurora/AuroraExperienceCard";
import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  experience: Experience[];
  variant?: "compact" | "full";
  className?: string;
}

export function ExperienceTimeline({
  experience,
  variant = "full",
  className,
}: ExperienceTimelineProps) {
  const jobs = variant === "compact" ? experience.slice(0, 2) : experience;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {jobs.map((job, index) => (
        <AuroraExperienceCard
          key={job.id}
          job={job}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
}
