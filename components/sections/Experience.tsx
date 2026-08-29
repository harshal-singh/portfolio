import type { Experience, SectionMeta } from "@/lib/types";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { SectionHeader } from "@/components/ui/section-header";

interface ExperienceProps {
  section: SectionMeta;
  experience: Experience[];
  showHeader?: boolean;
  variant?: "compact" | "full";
}

export default function ExperienceSection({
  section,
  experience,
  showHeader = true,
  variant = "full",
}: ExperienceProps) {
  return (
    <section className={showHeader ? "site-container site-section" : undefined}>
      {showHeader ? (
        <SectionHeader
          label={section.label}
          title={section.title}
          description={section.description || undefined}
        />
      ) : null}
      <ExperienceTimeline experience={experience} variant={variant} />
    </section>
  );
}
