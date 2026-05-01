import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="mono text-xs uppercase tracking-widest text-accent mb-4">
            01 — About
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold text-zinc-100 leading-tight">
            Engineer who cares about the boring fundamentals.
          </h2>
        </div>
        <div className="md:col-span-8 md:pt-2 space-y-5 text-zinc-300 text-base md:text-lg leading-relaxed">
          <p>
            I&apos;ve spent the last four years shipping web products end‑to‑end
            — from messy legacy CMS revamps to peer‑to‑peer video apps. The
            thread that runs through all of it is a stubborn focus on the unsexy
            parts: rendering strategy, build pipelines, image budgets, error
            boundaries.
          </p>
          <p>
            Most of my recent work sits at the intersection of{" "}
            <span className="text-accent">Next.js</span>,{" "}
            <span className="text-accent">TypeScript</span> and{" "}
            <span className="text-accent">DevOps</span> — where small
            modeling decisions and tight feedback loops compound into shippable
            speed.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/5 mt-8">
            {profile.stats.map((s) => (
              <div key={s.label}>
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
