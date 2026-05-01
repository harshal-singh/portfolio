import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/brand-icons";
import { profile } from "@/lib/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="heading uppercase text-2xl text-zinc-300 font-bold group hover:text-white transition-colors">
            HRS
          <span className="text-accent">.</span>
        </Link>
          <p className="mt-4 text-sm text-zinc-500 max-w-xs leading-relaxed">
            Software engineer based in Mumbai. Available for select freelance
            and contract work.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Navigate
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <Link
                href="/"
                className="hover:text-accent transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-accent transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href="/#work"
                className="hover:text-accent transition-colors"
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="hover:text-accent transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <p className="mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Elsewhere
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <a
                href={profile.socials.github}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.socials.twitter}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <TwitterIcon className="w-4 h-4" /> Twitter / X
              </a>
            </li>
            <li>
              <a
                href={profile.socials.linkedin}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} Harshal Singh. Crafted with care in
            Mumbai.
          </p>
          <p className="mono">v1.0 · last updated Jul 2025</p>
        </div>
      </div>
    </footer>
  );
}
