import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import type { Profile } from "@/lib/types";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export interface HeroCopy {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  headline: string;
  highlight: string;
  valueProp: string;
}

export function getHeroCopy(profile: Profile): HeroCopy {
  return {
    primaryHref: profile.heroPrimaryCtaHref || "/projects",
    primaryLabel: profile.heroPrimaryCtaLabel || "View selected work",
    secondaryHref: profile.heroSecondaryCtaHref || "/contact",
    secondaryLabel: profile.heroSecondaryCtaLabel || "Get in touch",
    headline: profile.heroHeadline || "I build product interfaces that",
    highlight: profile.heroHighlight || "ship faster and scale.",
    valueProp:
      profile.heroValueProp ||
      profile.shortBio ||
      "Senior frontend engineer building production React and Next.js systems.",
  };
}

export function HeroGlow() {
  return (
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-muted rounded-full blur-3xl pointer-events-none" />
  );
}

export function HeroStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="accent" className="mb-8 gap-2 px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="mono text-xs">{status}</span>
    </Badge>
  );
}

function CtaLink({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors"
      : "inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-md hover:border-accent/30 hover:bg-accent-muted transition-colors";

  const icon =
    variant === "primary" ? (
      <ArrowRight className="w-4 h-4" />
    ) : (
      <ArrowUpRight className="w-4 h-4" />
    );

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {label} {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label} {icon}
    </Link>
  );
}

export function HeroCtas({ copy }: { copy: HeroCopy }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <CtaLink href={copy.primaryHref} label={copy.primaryLabel} variant="primary" />
      <CtaLink href={copy.secondaryHref} label={copy.secondaryLabel} variant="secondary" />
    </div>
  );
}

export function HeroFooter({ profile }: { profile: Profile }) {
  return (
    <div className="mt-12 pt-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-6">
      <div>
        <p className="text-label mb-1.5">Currently</p>
        <p className="text-foreground font-medium">{profile.heroCurrentRole}</p>
        <p className="mono text-xs text-muted mt-1 flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          {profile.location}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
          aria-label="GitHub"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function HeroTextBlock({
  profile,
  copy,
  highlightSlot,
}: {
  profile: Profile;
  copy: HeroCopy;
  highlightSlot?: ReactNode;
}) {
  return (
    <>
      <HeroStatusBadge status={profile.status} />
      <p className="text-label text-muted mb-4">
        {profile.name} · {profile.role}
      </p>
      <h1 className="text-display text-foreground font-semibold leading-[1.05] max-w-3xl">
        {copy.headline}{" "}
        {highlightSlot ?? <span className="text-accent">{copy.highlight}</span>}
      </h1>
      <p className="mt-8 text-body-lg text-muted max-w-2xl leading-relaxed">{copy.valueProp}</p>
      <HeroCtas copy={copy} />
      <HeroFooter profile={profile} />
    </>
  );
}
