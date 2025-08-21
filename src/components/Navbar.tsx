import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href") || "");
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blogs", href: "#blogs" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Harshal
            </span>
            <span className="text-white"> Singh</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div>
              <div className="flex items-center space-x-1">
                {location.pathname === "/" ? (
                  <>
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}

                    <a
                      href="#contact"
                      className="btn-primary inline-flex items-center px-5 py-2 !ml-4"
                    >
                      Let's Connect
                    </a>
                  </>
                ) : (
                  <BackButton />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu - Drawer */}
          <div className="md:hidden">
            {location.pathname === "/" ? (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-white">
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-gray-900 border-gray-800"
                >
                  <div className="py-6">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <a
                          href={link.href}
                          className="block text-gray-300 hover:text-white px-4 py-3 rounded-md transition-colors"
                        >
                          {link.name}
                        </a>
                      </SheetClose>
                    ))}
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
