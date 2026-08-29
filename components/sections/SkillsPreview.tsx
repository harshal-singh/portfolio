import type { SectionMeta } from "@/lib/types";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { ArrowRight, Cloud, Code2, Cpu, Database, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";

const skillIcons: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: Code2,
  Backend: Cpu,
  Database: Database,
  Databases: Database,
  DevOps: Cloud,
  Tooling: Wrench,
};

interface SkillsPreviewProps {
  section: SectionMeta;
  skills: Record<string, string[]>;
  perCategory?: number;
}

export default function SkillsPreview({
  section,
  skills,
  perCategory = 5,
}: SkillsPreviewProps) {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="site-container site-section">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
        <SectionHeader
          label={section.label}
          title={section.title}
          description={section.description || undefined}
          align="left"
          className="mb-0"
        />
        <Link
          href="/about"
          className="mono text-sm text-foreground inline-flex items-center gap-1.5 link-underline"
        >
          Full stack <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(([cat, list]) => {
          const Icon = skillIcons[cat] || Code2;
          return (
            <div
              key={cat}
              className="p-5 rounded-xl border border-border-subtle bg-surface hover:border-accent/20 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-md bg-accent-muted text-accent flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="heading text-h4 text-foreground">{cat}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {list.slice(0, perCategory).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
                {list.length > perCategory ? (
                  <Tag className="text-muted-foreground">+{list.length - perCategory}</Tag>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
