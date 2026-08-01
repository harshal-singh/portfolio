import type { SectionMeta, Stat } from "@/lib/types";

interface AboutProps {
  section: SectionMeta;
  paragraphs: string[];
  stats: Stat[];
}

export default function About({ section, paragraphs, stats }: AboutProps) {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="mono text-xs uppercase tracking-widest text-accent mb-4">
            {section.label}
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold text-zinc-100 leading-tight">
            {section.title}
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-2 space-y-5 text-zinc-300 text-base md:text-lg leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/5 mt-8">
            {stats.map((s) => (
              <div key={s.id}>
                <div className="heading text-3xl md:text-4xl font-semibold text-zinc-100">
                  {s.value}
                </div>
                <div className="mono text-xs uppercase tracking-wider text-zinc-500 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
