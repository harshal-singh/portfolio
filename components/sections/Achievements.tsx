"use client";

import { Reveal } from "@/components/motion/Reveal";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { Achievement, SectionMeta } from "@/lib/types";

interface AchievementsProps {
  section: SectionMeta;
  achievements: Achievement[];
}

export default function Achievements({
  section,
  achievements,
}: AchievementsProps) {
  return (
    <section className="site-container site-section">
      <Reveal>
        <SectionHeader
          label={section.label}
          title={section.title}
          description={section.description || undefined}
        />
      </Reveal>
      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        {achievements.map((item, index) => (
          <Reveal key={item.id} delay={index * 100}>
            <MetricCard
              value={item.metric}
              label={item.label}
              description={item.description}
              context={item.context}
              variant="detailed"
              animated
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
