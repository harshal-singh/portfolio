import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blogs", href: "#blogs" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:rotate-6 duration-300">
              H
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">
              Harshal Singh
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {location.pathname === "/" ? (
              <>
                <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                        activeSection === link.href.replace("#", "")
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="ml-3 inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-medium text-sm bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/25 active:scale-[0.98]"
                >
                  Let's Talk
                </a>
              </>
            ) : (
              <BackButton />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            {location.pathname === "/" ? (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-white/70 hover:text-white p-1.5 rounded-lg transition-colors">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0a0a0a] border-white/[0.08] w-72">
                  <div className="flex flex-col gap-1 pt-10">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <a
                          href={link.href}
                          className="flex items-center gap-3 text-white/60 hover:text-white px-4 py-3 rounded-xl transition-all hover:bg-white/5 text-sm font-medium"
                        >
                          {link.name}
                        </a>
                      </SheetClose>
                    ))}
                    <div className="mt-4 px-4">
                      <SheetClose asChild>
                        <a
                          href="#contact"
                          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-medium text-sm bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500"
                        >
                          Let's Talk
                        </a>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <BackButton />
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
