import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
            06 — Education
          </p>
          <h2 className="heading text-4xl md:text-5xl font-semibold">
            Foundations.
          </h2>
        </div>
        <div className="md:col-span-8 space-y-4">
          {education.map((e) => (
            <div
              key={e.school}
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] flex flex-wrap gap-4 items-baseline justify-between"
            >
              <div>
                <h3 className="heading text-lg text-zinc-100">{e.degree}</h3>
                <p className="text-zinc-400 text-sm mt-1">{e.school}</p>
              </div>
              <div className="text-right">
                <p className="mono text-xs text-zinc-500">{e.period}</p>
                <p className="mono text-xs text-accent mt-1">{e.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
