import { ExternalLink, Github, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Pragnyapan.ai",
    description:
      "AI-powered Kanban task management with real-time collaboration, drag-and-drop boards, and Gemini AI integration for smart task prioritization.",
    image: "/projects/pragnyapan-ai.jpg",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Gemini AI", "Tailwind CSS"],
    github: "https://github.com/harshal-singh/pragnyapan-ai",
    demo: "https://pragnyapan-ai.vercel.app",
    accentColor: "from-violet-600/20 to-indigo-600/10",
  },
  {
    title: "Systematic Chaos",
    description:
      "Full-stack platform with advanced user auth, product catalog, cart, and payment processing at scale.",
    image: "/projects/systematic-chaos.jpg",
    technologies: ["Next.js", "Hasura", "PostgreSQL", "TypeScript"],
    github: "https://github.com/harshal-singh/systematic-chaos",
    demo: "https://systematic-chaos.vercel.app",
    accentColor: "from-cyan-600/20 to-teal-600/10",
  },
  {
    title: "Meet Space",
    description:
      "Real-time video & chat platform with Socket.io-powered rooms, screen sharing, and persistent chat history.",
    image: "/projects/meet-space.jpg",
    technologies: ["Next.js", "Socket.io", "Express.js", "MongoDB"],
    github: "https://github.com/harshal-singh/meet",
    demo: "https://meet-spacee.vercel.app",
    accentColor: "from-pink-600/20 to-rose-600/10",
  },
];

const cardBase =
  "bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 group";

const Projects = () => {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-28 relative bg-[#080808] overflow-hidden">
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[500px] h-[500px] bg-violet-600/[0.08] right-0 top-1/4" />
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 before:content-[''] before:w-6 before:h-px before:bg-violet-400">
              Portfolio
            </span>
            <h2 className="font-bold leading-tight tracking-tight text-4xl md:text-5xl text-white">
              Featured{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                projects
              </span>
            </h2>
          </div>
          <a
            href="https://github.com/harshal-singh"
            target="_blank"
            rel="noreferrer"
            className="self-start md:self-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-white/10 text-white/80 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-[0.98]"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured — 2 cols */}
          <div className={`md:col-span-2 ${cardBase}`}>
            <div className="relative aspect-video overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${featured.accentColor} opacity-60`} />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                <a href={featured.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <Github size={18} />
                </a>
                <a href={featured.demo} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {featured.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/[0.06] border border-white/[0.08] text-white/50">
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">{featured.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4">{featured.description}</p>
              <div className="flex items-center gap-4">
                <a href={featured.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
                  <Github size={14} /> Source
                </a>
                <a href={featured.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">
                  Live Demo <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-5">
            {rest.map((project) => (
              <div key={project.title} className={cardBase}>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-60`} />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Github size={18} />
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/[0.06] border border-white/[0.08] text-white/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
                      <Github size={14} /> Source
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">
                      Live Demo <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
