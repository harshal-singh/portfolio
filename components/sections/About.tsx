import { GlassCard } from "@/components/aurora/GlassCard";
import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import { CmsImage } from "@/components/ui/cms-image";
import type { Profile, SectionMeta } from "@/lib/types";

interface AboutProps {
  section: SectionMeta;
  paragraphs: string[];
  profile: Profile;
  showHeader?: boolean;
  educationTags?: string[];
}

export default function About({
  section,
  paragraphs,
  profile,
  showHeader = true,
  educationTags = [],
}: AboutProps) {
  return (
    <section id="about" className="site-container py-12 md:py-20">
      {showHeader ? (
        <AuroraSectionHeader label={section.label} title={section.title} />
      ) : null}
      <GlassCard className="grid grid-cols-1 items-center gap-8 p-6 md:grid-cols-[230px_1fr] md:gap-11 md:p-10">
        {profile.photoUrl ? (
          <CmsImage
            src={profile.photoUrl}
            alt={profile.name}
            className="mx-auto aspect-square w-full max-w-[230px] rounded-[22px] border-2 border-white object-cover shadow-[var(--aurora-shadow)] md:mx-0"
          />
        ) : null}
        <div>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[0.98rem] leading-[1.76] text-muted [&+&]:mt-4"
            >
              {paragraph}
            </p>
          ))}
          {educationTags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {educationTags.map((tag) => (
                <span key={tag} className="aurora-tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </GlassCard>
    </section>
  );
}
