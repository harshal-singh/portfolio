import { skills } from "@/lib/data";
import { Cloud, Code2, Cpu, Database, Wrench, type LucideIcon } from "lucide-react";

const skillIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Cpu,
  Database: Database,
  DevOps: Cloud,
  Tooling: Wrench,
};

export default function Skills() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
      <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
        <div className="md:col-span-5">
          <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
            02 — Stack
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold">
            The toolbelt.
          </h2>
        </div>
        <p className="md:col-span-7 text-zinc-400 md:pt-2 leading-relaxed">
          A mix of what I reach for daily and what I trust in production. New
          tools earn their place by removing real pain, not by being shiny.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(skills).map(([cat, list]) => {
          const Icon = skillIcons[cat] || Code2;
          return (
            <div
              key={cat}
              className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-accent/20 hover:bg-accent/[0.02] transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-accent/10 text-accent flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="heading text-lg text-zinc-100">{cat}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {list.map((s) => (
                  <span
                    key={s}
                    className="mono text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
