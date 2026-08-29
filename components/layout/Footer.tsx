import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { footerNav } from "@/lib/navigation";
import type { Profile } from "@/lib/types";
import Link from "next/link";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="relative border-t border-border-subtle mt-24 print:hidden">
      <div className="site-container py-14 grid md:grid-cols-3 gap-10">
        <div>
          <Link
            href="/"
            className="heading text-2xl text-muted font-bold hover:text-foreground transition-colors"
          >
            harshal singh
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
            {profile.footerTagline}
          </p>
        </div>

        <div>
          <p className="text-label mb-4">Navigate</p>
          <ul className="space-y-2 text-sm text-foreground">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm text-foreground">
            <li>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
            </li>
            <li>
              <CopyEmailButton email={profile.email} variant="ghost" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="site-container py-6 flex items-start md:items-center justify-between gap-3 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}.
          </p>
          <p className="mono">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
