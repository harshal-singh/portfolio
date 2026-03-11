import { useState, useEffect } from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";

const roles = [
  "Full Stack Developer",
  "JavaScript Engineer",
  "React Specialist",
  "Cloud Architect",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentRole.slice(0, displayText.length - 1)
              : currentRole.slice(0, displayText.length + 1),
          );
        },
        isDeleting ? 40 : 80,
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Ambient orbs */}
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[700px] h-[700px] bg-violet-600/10 -top-40 -right-60 opacity-60" />
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[500px] h-[500px] bg-indigo-600/[0.08] top-1/2 -left-60 opacity-50" />
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[300px] h-[300px] bg-purple-600/10 bottom-20 right-1/4" />

      {/* Grid + fade */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left */}
          <div className="max-w-3xl">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for new opportunities
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6">
              <span className="text-white/90">Hey, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Harshal Singh
              </span>
            </h1>

            {/* Typewriter role */}
            <div className="flex items-center gap-3 mb-6 h-10">
              <div className="w-px h-8 bg-violet-500" />
              <p className="text-xl sm:text-2xl text-white/50 font-light">
                <span className="text-white/80 font-medium">{displayText}</span>
                <span className="animate-blink text-violet-400">|</span>
              </p>
            </div>

            <p className="text-[#8b98b8] text-lg leading-relaxed max-w-xl mb-10">
              Building scalable web applications and cloud-native solutions with
              modern JavaScript. Turning complex problems into clean, elegant
              code.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/25 active:scale-[0.98] group"
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-white/10 text-white/80 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-[0.98]"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#8b98b8]/40 text-xs font-medium tracking-widest uppercase">
                Find me on
              </span>
              <div className="flex items-center gap-3">
                {[
                  {
                    href: "https://github.com/harshal-singh",
                    icon: Github,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/harshal-singh-56a55a236/",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://x.com/harshal_8ingh",
                    icon: Twitter,
                    label: "Twitter",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-[#8b98b8]/10 flex items-center justify-center text-[#8b98b8]/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="hidden lg:block relative animate-float">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-2xl scale-110" />
            <div className="relative w-[340px] xl:w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-900/20">
              <img
                src="/harshal-singh.jpg"
                alt="Harshal Singh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
            </div>
            {/* Floating stat cards */}
            <div className="absolute -left-14 top-16 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-4 py-3 shadow-xl shadow-black/40">
              <p className="text-white/40 text-xs mb-0.5">Experience</p>
              <p className="text-white font-bold text-lg leading-none">
                4+ Years
              </p>
            </div>
            <div className="absolute -right-12 bottom-20 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-4 py-3 shadow-xl shadow-black/40">
              <p className="text-white/40 text-xs mb-0.5">Projects</p>
              <p className="text-white font-bold text-lg leading-none">
                15+ Done
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8b98b8]/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
};

export default Hero;
