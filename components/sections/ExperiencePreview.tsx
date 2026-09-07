"use client";

import { AuroraExperienceCard } from "@/components/aurora/AuroraExperienceCard";
import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import type { Experience, SectionMeta } from "@/lib/types";

interface ExperiencePreviewProps {
  section: SectionMeta;
  experience: Experience[];
  limit?: number;
}

export default function ExperiencePreview({
  section,
  experience,
  limit = 3,
}: ExperiencePreviewProps) {
  const preview = experience.slice(0, limit);

  return (
    <section id="experience" className="site-container py-12 md:py-20">
      <AuroraSectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
      />
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {preview.map((job, index) => (
          <AuroraExperienceCard key={job.id} job={job} index={index} />
        ))}
      </div>
    </section>
  );
}
