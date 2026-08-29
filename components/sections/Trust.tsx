"use client";

import { Reveal } from "@/components/motion/Reveal";
import { MetricCard } from "@/components/ui/metric-card";
import type { Stat } from "@/lib/types";

interface TrustProps {
  metrics: Stat[];
}

export default function Trust({ metrics }: TrustProps) {
  return (
    <section aria-label="Professional metrics" className="site-container pb-4 md:pb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.id} delay={index * 80}>
            <MetricCard
              value={metric.value}
              label={metric.label}
              variant="compact"
              animated
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
