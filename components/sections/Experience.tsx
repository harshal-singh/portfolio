import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24"
    >
      <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
        <div className="md:col-span-5">
          <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
            03 — Experience
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold">
            Where I&apos;ve shipped.
          </h2>
        </div>
        <p className="md:col-span-7 text-zinc-400 md:pt-2 leading-relaxed">
          A short tour of the teams and clients I&apos;ve built with.
        </p>
      </div>
      <div className="relative border-l border-white/10 ml-3 md:ml-6">
        {experience.map((job) => (
          <div key={job.id} className="relative pl-8 md:pl-12 pb-12 group">
            <div
              className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                job.current
                  ? "bg-accent border-accent"
                  : "bg-background border-white/30 group-hover:border-accent"
              } transition-colors`}
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
              <h3 className="heading text-xl md:text-2xl text-zinc-100">
                {job.role}
              </h3>
              <span className="text-zinc-400">at</span>
              <span className="text-accent heading text-xl md:text-2xl">
                {job.company}
              </span>
            </div>
            <p className="mono text-xs text-zinc-500 mb-4">
              {job.period} · {job.location}
            </p>
            <ul className="space-y-2 text-zinc-300 text-[15px] leading-relaxed max-w-3xl">
              {job.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-accent mt-2">—</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
