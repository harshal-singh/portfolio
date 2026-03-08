import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blogs", href: "#blogs" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { href: "https://github.com/harshal-singh", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/harshal-singh-56a55a236/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/harshal_8ingh", icon: Twitter, label: "Twitter" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.05] pt-14 pb-8 z-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:rotate-6 duration-300">
                H
              </div>
              <span className="text-white font-semibold text-[15px]">Harshal Singh</span>
            </a>
            <p className="text-white/30 text-sm leading-relaxed">
              Full Stack Developer building scalable web applications with modern JavaScript & cloud platforms.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-1">Navigation</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/35 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-1">Social</p>
            <div className="flex gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white hover:bg-violet-500/15 hover:border-violet-500/30 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Harshal Singh. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-violet-500/15 hover:border-violet-500/30 transition-all duration-200"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
