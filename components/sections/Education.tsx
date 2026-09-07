import { GlassCard } from "@/components/aurora/GlassCard";
import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import type { Education, SectionMeta } from "@/lib/types";

interface EducationProps {
  section: SectionMeta;
  education: Education[];
}

export default function EducationSection({
  section,
  education,
}: EducationProps) {
  return (
    <section className="site-container py-12 md:py-20">
      <AuroraSectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
        align="left"
      />
      <div className="grid gap-3.5">
        {education.map((item) => (
          <GlassCard
            key={item.id}
            className="flex flex-wrap items-baseline justify-between gap-4 p-5 md:p-6"
          >
            <div>
              <h3 className="jk text-[1.05rem] font-bold tracking-[-0.02em]">
                {item.degree}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.school}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-muted-foreground">{item.period}</p>
              <p className="mt-1 text-xs font-semibold text-accent">{item.grade}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
