"use client";

import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { Experience, SectionMeta } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ExperiencePreviewProps {
  section: SectionMeta;
  experience: Experience[];
  limit?: number;
}

export default function ExperiencePreview({
  section,
  experience,
  limit = 2,
}: ExperiencePreviewProps) {
  const preview = experience.slice(0, limit);

  return (
    <section id="experience" className="site-container site-section">
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
            href="/experience"
            className="mono text-sm text-foreground inline-flex items-center gap-1.5 link-underline"
          >
            Full timeline <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Reveal>
      <ExperienceTimeline experience={preview} variant="compact" />
    </section>
  );
}
