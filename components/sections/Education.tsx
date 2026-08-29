import { SectionHeader } from "@/components/ui/section-header";
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
    <section className="site-container site-section">
      <div className="section-grid">
        <div className="md:col-span-5">
          <SectionHeader
            label={section.label}
            title={section.title}
            align="left"
            className="mb-0"
          />
        </div>
        <div className="md:col-span-7 space-y-4">
          {education.map((e) => (
            <div
              key={e.id}
              className="p-6 rounded-xl border border-border-subtle bg-surface flex flex-wrap gap-4 items-baseline justify-between"
            >
              <div>
                <h3 className="heading text-h4 text-foreground">{e.degree}</h3>
                <p className="text-muted text-sm mt-1">{e.school}</p>
              </div>
              <div className="text-right ml-auto">
                <p className="mono text-xs text-muted">{e.period}</p>
                <p className="mono text-xs text-accent mt-1">{e.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
