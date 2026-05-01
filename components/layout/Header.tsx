"use client";

import { profile } from "@/lib/data";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      // If on a different page, let the default navigation happen
    }
    setOpen(false);
  };

  return (
    <header
      className={`border-b fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        open
          ? "bg-background border-transparent"
          : scrolled
          ? "backdrop-blur-md bg-background/95 border-white/5"
          : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} className="heading uppercase text-2xl text-zinc-300 font-bold group hover:text-white transition-colors relative z-50">
            HRS
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="text-sm text-zinc-400 hover:text-white link-underline"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm link-underline ${
                  pathname === item.href
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3 relative z-50">
          <a
            href={`mailto:${profile.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-sm bg-accent text-background px-4 py-2 rounded-md font-medium hover:bg-accent-hover transition-colors"
          >
            Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-zinc-200 p-2"
            aria-label="Menu"
          >
            {open ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-background flex flex-col h-[calc(100vh-4rem)]">
          <div className="px-6 py-10 flex flex-col gap-8 flex-1 overflow-y-auto">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleAnchor(e, item.href)}
                  className="text-zinc-300 text-3xl font-medium heading hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 text-3xl font-medium heading hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-4 border-t border-white/10 pt-8">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 bg-accent text-background px-6 py-4 rounded-xl font-medium text-lg w-full"
              >
                Get in touch <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
