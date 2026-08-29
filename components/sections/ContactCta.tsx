"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import type { Profile, SectionMeta } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ContactCtaProps {
  profile: Profile;
  section: SectionMeta;
}

export default function ContactCta({ profile, section }: ContactCtaProps) {
  const ctaLabel = profile.contactCtaButtonLabel || profile.headerContactLabel;

  return (
    <section className="site-container site-section">
      <Reveal>
        <div className="relative rounded-2xl border border-border-subtle bg-surface p-8 md:p-12 overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent-muted blur-3xl rounded-full pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              {section.label ? (
                <p className="text-label text-accent mb-3">{section.label}</p>
              ) : null}
              <h2 className="text-h1 text-foreground leading-tight mb-4 text-balance">
                {section.title}
              </h2>
              {section.description ? (
                <p className="text-body text-muted leading-relaxed">
                  {section.description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors active:scale-[0.98]"
              >
                {ctaLabel} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <CopyEmailButton
                email={profile.email}
                className="justify-center"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
