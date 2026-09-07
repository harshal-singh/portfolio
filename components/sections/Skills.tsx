import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import { GlassCard } from "@/components/aurora/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { iconsForSkills } from "@/lib/skills/icons";
import type { SectionMeta } from "@/lib/types";

interface SkillsProps {
  section: SectionMeta;
  skills: Record<string, string[]>;
}

export default function Skills({ section, skills }: SkillsProps) {
  return (
    <section className="site-container py-12 md:py-20">
      <AuroraSectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
        align="left"
      />
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3">
        {Object.entries(skills).map(([category, list], index) => (
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
              <div className="mt-4 flex flex-wrap gap-1.5">
                {list.map((item) => (
                  <span key={item} className="aurora-tag">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
