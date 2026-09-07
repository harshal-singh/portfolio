import type { Profile } from "@/lib/types";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const location = profile.location.split("·")[0]?.trim() || profile.location;

  return (
    <footer className="relative z-[2] mt-8 pb-24 pt-8 print:hidden">
      <div className="site-container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} — {location}
        </p>
        <nav
          className="flex items-center gap-4 text-[0.8rem] text-muted-foreground"
          aria-label="Social links"
        >
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
