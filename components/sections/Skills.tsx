import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import type { SectionMeta } from "@/lib/types";
import {
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const skillIcons: Record<string, LucideIcon> = {
  Languages: Braces,
  Frontend: Code2,
  Backend: Cpu,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  Tools: Wrench,
};

interface SkillsProps {
  section: SectionMeta;
  skills: Record<string, string[]>;
}

export default function Skills({ section, skills }: SkillsProps) {
  return (
    <section className="site-container site-section">
      <SectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
        align="left"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(skills).map(([cat, list]) => {
          const Icon = skillIcons[cat] || Code2;
          return (
            <div
              key={cat}
              className="group relative p-6 rounded-xl border border-border-subtle bg-surface hover:border-accent/20 hover:bg-accent-muted transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-accent-muted text-accent flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="heading text-h4 text-foreground">{cat}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {list.map((s) => (
                  <Tag key={s} size="md">
                    {s}
                  </Tag>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
