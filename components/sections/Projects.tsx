import type { Project, SectionMeta } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  section: SectionMeta;
  projects: Project[];
}

export default function Projects({ section, projects }: ProjectsProps) {
  return (
    <section id="work" className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
      <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
        <div className="md:col-span-5">
          <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
            {section.label}
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold">{section.title}</h2>
        </div>
        {section.description ? (
          <p className="md:col-span-7 text-zinc-400 max-w-md">{section.description}</p>
        ) : null}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <article
            key={p.id}
            className="group relative p-7 md:p-8 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.02] to-transparent hover:border-accent/25 transition-all overflow-hidden"
          >
            <div
              className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${
                p.accent === "lime" ? "bg-accent/10" : "bg-white/5"
              }`}
            />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <span className="mono text-xs text-zinc-500">
                  {String(i + 1).padStart(2, "0")} — {p.year}
                </span>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-background group-hover:bg-accent group-hover:border-accent transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="heading text-2xl md:text-3xl text-zinc-100 mb-2">{p.name}</h3>
              <p className="text-zinc-400 mb-5">{p.tagline}</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="mono text-[11px] text-zinc-400 px-2 py-1 rounded bg-white/[0.03] border border-white/5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
