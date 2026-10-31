import { CmsImage } from "@/components/ui/cms-image";
import { SectionHeader } from "@/components/ui/section-header";
import type { Profile, SectionMeta } from "@/lib/types";

interface AboutProps {
  section: SectionMeta;
  paragraphs: string[];
  profile: Profile;
  showHeader?: boolean;
}

export default function About({
  section,
  paragraphs,
  profile,
  showHeader = true,
}: AboutProps) {
  const hasPhoto = Boolean(profile.photoUrl?.trim());

  return (
    <section id="about" className="site-container pb-16 md:pb-24">
      {showHeader ? (
        <SectionHeader
          label={section.label}
          title={section.title}
          align="left"
          className="mb-10 md:mb-14"
        />
      ) : null}

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
        {hasPhoto ? (
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-border-subtle md:h-72 md:w-72">
            <CmsImage
              src={profile.photoUrl}
              alt={profile.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1 space-y-5 text-body-lg text-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
