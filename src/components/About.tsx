import { Code2, Clock, Laptop, Rocket, Download } from "lucide-react";

const stats = [
  { value: "4+", label: "Years of Experience" },
  { value: "15+", label: "Projects Shipped" },
  { value: "5+", label: "Tech Stacks" },
  { value: "100%", label: "Commitment" },
];

const traits = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code that teams love.",
    iconBg: "bg-gradient-to-br from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Consistently shipping on time without compromising quality.",
    iconBg: "bg-gradient-to-br from-indigo-500/20 to-blue-500/10",
    iconColor: "text-indigo-400",
  },
  {
    icon: Laptop,
    title: "Responsive Design",
    description: "Pixel-perfect UIs that feel native on every screen size and device.",
    iconBg: "bg-gradient-to-br from-cyan-500/20 to-teal-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Optimizing for Core Web Vitals and real-world user experience.",
    iconBg: "bg-gradient-to-br from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-400",
  },
];

const About = () => {
  return (
    <section id="about" className="py-28 relative bg-[#080808] overflow-hidden">
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[600px] h-[600px] bg-violet-600/[0.08] -left-60 top-0" />
      <div className="absolute inset-0 bg-dots opacity-50" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 before:content-[''] before:w-6 before:h-px before:bg-violet-400">
            About Me
          </span>
          <h2 className="font-bold leading-tight tracking-tight text-4xl md:text-5xl text-white">
            Crafting digital{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              experiences
            </span>
            <br />
            with purpose
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Bio card */}
          <div className="md:col-span-7 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent" />
            <div className="relative z-10">
              <p className="text-white/70 text-lg leading-relaxed mb-5">
                I'm a{" "}
                <span className="text-white font-semibold">passionate software engineer</span>{" "}
                specializing in modern JavaScript technologies and cloud computing. With a strong
                foundation in full-stack development, I build scalable web applications that deliver
                exceptional user experiences.
              </p>
              <p className="text-white/50 leading-relaxed mb-5">
                My journey started 4+ years ago and has spanned domains from e-commerce to fintech.
                I love the intersection of great engineering and thoughtful design.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                When I'm not shipping features, you'll find me exploring new technologies or sharing
                insights through my tech blog.
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/25 active:scale-[0.98]"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 p-6 flex flex-col justify-between"
              >
                <span className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent leading-none mb-2">
                  {value}
                </span>
                <span className="text-white/40 text-sm leading-snug">{label}</span>
              </div>
            ))}
          </div>

          {/* Traits */}
          {traits.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
            <div
              key={title}
              className="md:col-span-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 p-6 group"
            >
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={20} className={iconColor} />
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
