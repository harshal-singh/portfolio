export default function Marquee() {
  const items = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Docker",
    "PostgreSQL",
    "GraphQL",
    "AWS",
    "Tailwind",
    "WebRTC",
    "Vue.js",
    "MongoDB",
  ];

  return (
    <section className="border-y border-white/5 py-6 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="mono text-sm text-zinc-500 mx-8 flex items-center gap-8"
          >
            {it} <span className="text-accent">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
