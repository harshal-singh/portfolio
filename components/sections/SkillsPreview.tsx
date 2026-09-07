import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import { GlassCard } from "@/components/aurora/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { iconsForSkills } from "@/lib/skills/icons";
import type { SectionMeta } from "@/lib/types";

interface SkillsPreviewProps {
  section: SectionMeta;
  skills: Record<string, string[]>;
}

export default function SkillsPreview({ section, skills }: SkillsPreviewProps) {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="site-container py-12 md:py-20">
      <AuroraSectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
      />
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3">
        {categories.map(([category, list], index) => (
          <Reveal key={category} delay={index * 60}>
            <GlassCard className="p-5 h-full">
              <h4 className="jk text-[0.95rem] font-bold tracking-[-0.02em]">
                {category}
              </h4>
              <div className="my-3 flex flex-wrap gap-4">
                {iconsForSkills(list).map((icon) => (
                  <img
                    key={icon}
                    src={icon}
                    alt=""
                    width={18}
                    height={18}
                    className="opacity-80"
                  />
                ))}
              </div>
              <p className="text-[0.85rem] leading-[1.7] text-muted">
                {list.join(", ")}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
