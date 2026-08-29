import { HeroHighlightTypewriter } from "@/components/hero/HeroHighlightTypewriter";
import { HeroSplitWords } from "@/components/hero/HeroSplitWords";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { TechLogoScrollColumns } from "@/components/ui/tech-logo-columns";
import { heroAnimationTiming } from "@/lib/hero/animation";
import type { Profile } from "@/lib/types";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  profile: Profile;
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
  if (!href || !label) return null;

  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors active:scale-[0.98]"
      : "inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-md hover:border-accent/30 hover:bg-accent-muted transition-colors active:scale-[0.98]";

  const icon =
    variant === "primary" ? (
      <ArrowRight className="w-4 h-4" />
    ) : (
      <ArrowUpRight className="w-4 h-4" />
    );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label} {icon}
      </a>
    );
  }

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

export default function Hero({ profile }: HeroProps) {
  const primaryHref = profile.heroPrimaryCtaHref || "/projects";
  const primaryLabel = profile.heroPrimaryCtaLabel || "View selected work";
  const secondaryHref = profile.heroSecondaryCtaHref || "/contact";
  const secondaryLabel = profile.heroSecondaryCtaLabel || "Get in touch";
  const headline = profile.heroHeadline || "I build product interfaces that";
  const valueProp =
    profile.heroValueProp ||
    profile.shortBio ||
    "Senior frontend engineer building production React and Next.js systems.";

  const timing = heroAnimationTiming(headline, profile.heroHighlight || "");

  return (
    <section className="relative min-h-202.5 flex flex-col justify-center site-container py-16 lg:py-20 overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-background pointer-events-none"
        aria-hidden
      />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-95 bg-accent-muted rounded-full blur-3xl pointer-events-none opacity-90" />

      <div className="relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center w-full mt-16">
          <div className="max-w-3xl">
            <p
              className="hero-fade-block text-label text-muted mb-4"
              style={{ animationDelay: "0ms" }}
            >
              {profile.name} · {profile.role}
            </p>

            <h1 className="text-display text-foreground font-semibold leading-[1.05] max-w-3xl mt-4">
              <span className="block space-x-3 xl:space-x-6">
                <HeroSplitWords
                  words={timing.headlineWords}
                  startDelay={timing.headlineStart}
                />
              </span>
              <span className="block min-h-[1.05em] mt-1">
                <HeroHighlightTypewriter startDelay={timing.highlightStart} />
              </span>
            </h1>

            <p
              className="hero-fade-block mt-8 text-body-lg text-muted max-w-2xl leading-relaxed"
              style={{ animationDelay: `${timing.bodyDelay}ms` }}
            >
              {valueProp}
            </p>

            <div
              className="hero-fade-block mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: `${timing.ctaDelay}ms` }}
            >
              <CtaLink
                href={primaryHref}
                label={primaryLabel}
                variant="primary"
              />
              <CtaLink
                href={secondaryHref}
                label={secondaryLabel}
                variant="secondary"
              />
            </div>

            <div
              className="hero-fade-block mt-12 pt-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-6"
              style={{ animationDelay: `${timing.metaDelay}ms` }}
            >
              <div>
                <p className="text-label mb-1.5">Currently</p>
                <p className="text-foreground font-medium">
                  {profile.heroCurrentRole}
                </p>
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
          </div>

          <div className="hero-stagger-aside hidden lg:flex justify-center lg:justify-end w-69 shrink-0 self-stretch min-h-90 lg:min-h-105 pl-6 xl:pl-10">
            <TechLogoScrollColumns className="w-full" />
          </div>
        </div>

        <div className="lg:hidden mt-16 -mx-4 sm:-mx-6">
          <TechLogoScrollColumns />
        </div>
      </div>
    </section>
  );
}
