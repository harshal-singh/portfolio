"use client";

import { GlassCard } from "@/components/aurora/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { assetFilename, resolvePublicAsset } from "@/lib/assets";
import type { Profile, SectionMeta } from "@/lib/types";
import { formatSectionKick } from "@/lib/utils";

interface ContactCtaProps {
  profile: Profile;
  section: SectionMeta;
}

export default function ContactCta({ profile, section }: ContactCtaProps) {
  const resumeHref = resolvePublicAsset(profile.resumePdfUrl);
  const resumeName = assetFilename(profile.resumePdfUrl, "resume.pdf");

  return (
    <section id="contact" className="site-container pb-16 pt-4 md:pb-24">
      <Reveal>
        <GlassCard className="px-6 py-10 text-center md:px-12 md:py-14">
          {section.label ? (
            <p className="aurora-kick">{formatSectionKick(section.label)}</p>
          ) : null}
          <h2 className="jk mx-auto mt-[0.7rem] max-w-[17ch] text-[clamp(1.8rem,4.4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">
            {section.title}
          </h2>
          {section.description ? (
            <p className="mx-auto mt-4 max-w-[44ch] text-base leading-[1.7] text-muted">
              {section.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <a href={`mailto:${profile.email}`} className="aurora-pill">
              {profile.email}
            </a>
            <a href={resumeHref} download={resumeName} className="aurora-ghost">
              Download resume ⤓
            </a>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
