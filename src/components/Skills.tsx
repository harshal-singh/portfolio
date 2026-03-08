import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["All", "Frontend", "Backend", "Database & DevOps"];

const skillData = [
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "TypeScript", category: "Frontend", level: 65 },
  { name: "React.js", category: "Frontend", level: 90 },
  { name: "Next.js", category: "Frontend", level: 75 },
  { name: "Tailwind CSS", category: "Frontend", level: 80 },
  { name: "Node.js", category: "Backend", level: 70 },
  { name: "Express.js", category: "Backend", level: 80 },
  { name: "GraphQL", category: "Backend", level: 75 },
  { name: "REST APIs", category: "Backend", level: 90 },
  { name: "MongoDB", category: "Database & DevOps", level: 75 },
  { name: "PostgreSQL", category: "Database & DevOps", level: 65 },
  { name: "AWS", category: "Database & DevOps", level: 70 },
  { name: "Docker", category: "Database & DevOps", level: 85 },
  { name: "CI/CD", category: "Database & DevOps", level: 80 },
];

const allTechPills = [
  "JavaScript", "TypeScript", "React.js", "Node.js", "Next.js",
  "Express.js", "MongoDB", "PostgreSQL", "GraphQL", "Tanstack Query",
  "Hasura", "AWS", "NGINX", "Docker", "Git", "RESTful APIs",
  "Tailwind CSS", "Jotai", "CI/CD", "Microservices", "shadcn/ui",
  "Prisma", "Redis", "Linux",
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = skillData.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  return (
    <section id="skills" className="py-28 relative bg-[#060606] overflow-hidden">
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[600px] h-[600px] bg-indigo-600/[0.08] -right-60 top-0" />
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 before:content-[''] before:w-6 before:h-px before:bg-violet-400">
            Technical Skills
          </span>
          <h2 className="font-bold leading-tight tracking-tight text-4xl md:text-5xl text-white">
            Tools & technologies
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              I work with
            </span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-3 mb-20">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 px-5 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm font-medium">{skill.name}</span>
                  <span className="text-violet-400 text-xs font-semibold tabular-nums">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="text-center mb-8">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 before:content-[''] before:w-6 before:h-px before:bg-violet-400 after:content-[''] after:w-6 after:h-px after:bg-violet-400">
              All Technologies
            </span>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee whitespace-nowrap">
              {[...allTechPills, ...allTechPills].map((tech, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-3 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-white/60 cursor-default select-none transition-all duration-200 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
