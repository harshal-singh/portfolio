import { Code2, Clock, Laptop, Rocket, Download } from "lucide-react";

const STATS = [
  { value: "4+", label: "Years of Experience" },
  { value: "20+", label: "Projects Completed" },
  { value: "15+", label: "Tech Articles" },
  { value: "100%", label: "Client Satisfaction" },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Clean Code",
    desc: "Writing maintainable, scalable, and efficient code is my priority.",
    hoverBorder: "hover:border-l-violet-500",
    hoverBg: "hover:bg-violet-500/[0.04]",
    iconBg: "bg-violet-500/15",
  },
  {
    icon: "🚀",
    title: "Timely Delivery",
    desc: "Always meeting deadlines consistently while maintaining high quality.",
    hoverBorder: "hover:border-l-cyan-400",
    hoverBg: "hover:bg-cyan-500/[0.04]",
    iconBg: "bg-cyan-500/15",
  },
  {
    icon: "🎨",
    title: "Responsive Design",
    desc: "Building apps that work seamlessly across all devices.",
    hoverBorder: "hover:border-l-pink-400",
    hoverBg: "hover:bg-pink-500/[0.04]",
    iconBg: "bg-pink-500/15",
  },
  {
    icon: "⚙️",
    title: "Optimization",
    desc: "High-performance applications with optimized code and architecture.",
    hoverBorder: "hover:border-l-amber-400",
    hoverBg: "hover:bg-amber-500/[0.04]",
    iconBg: "bg-amber-500/15",
  },
];

const About = () => (
  <section id="about" className="py-28 bg-[#050810] relative overflow-hidden">
    {/* Ambient glows */}
    <div className="absolute -left-48 top-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
    <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[120px] pointer-events-none" />

    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-6 h-px bg-violet-500" />
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-violet-500">
          About Me
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight text-white mb-14 max-w-2xl">
        Who{" "}
        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          I Am
        </span>
      </h2>

      {/* Two-column: bio + value cards */}
      <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
        {/* Bio */}
        <div>
          <p className="text-[#8b98b8] text-base leading-[1.85] mb-5">
            I'm a{" "}
            <span className="text-[#5eead4] font-semibold">
              passionate software engineer
            </span>{" "}
            with expertise in modern JavaScript technologies and cloud
            computing. With a strong foundation in full-stack development, I
            enjoy building scalable web applications that deliver exceptional
            user experiences.
          </p>
          <p className="text-[#8b98b8] text-base leading-[1.85] mb-5">
            My journey in tech started over 4 years ago, and I've since worked
            on various projects across different domains, from e-commerce to
            fintech.
          </p>
          <p className="text-[#8b98b8] text-base leading-[1.85] mb-8">
            When I'm not coding, you can find me exploring new tech, or sharing
            my knowledge through tech blogs.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-violet-600 text-white hover:bg-[#6b4ef0] hover:shadow-[0_0_24px_rgba(124,92,252,0.4)] transition-all duration-200 active:scale-[0.98]"
          >
            <Download size={15} />
            Download Resume
          </a>
        </div>

        {/* Value cards */}
        <div className="flex flex-col gap-3">
          {VALUES.map(({ icon, title, desc, hoverBorder, hoverBg, iconBg }) => (
            <div
              key={title}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl
                bg-[#111827] border border-white/[0.07] border-l-[3px] border-l-transparent
                transition-all duration-250 cursor-default
                ${hoverBorder} ${hoverBg}
                hover:translate-x-1
              `}
            >
              <div
                className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-lg flex-shrink-0`}
              >
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-bold mb-0.5">{title}</p>
                <p className="text-[#4a5578] text-xs leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-[#111827] px-6 py-7 text-center">
            <p className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">
              {value}
            </p>
            <p className="text-[#4a5578] text-xs font-medium">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
