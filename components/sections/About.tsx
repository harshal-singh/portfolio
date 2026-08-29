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
  return (
    <section id="about" className="site-container">
      <div className="section-grid">
        {showHeader ? (
          <div className="md:col-span-5">
            <SectionHeader
              label={section.label}
              title={section.title}
              align="left"
              className="mb-0"
            />
            {profile.photoUrl ? (
              <div className="mt-8 relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-border-subtle">
                <CmsImage
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : null}
          </div>
        ) : null}
        <div
          className={`md:col-span-7 ${showHeader ? "md:pt-2" : ""} space-y-5 text-body-lg text-muted ${showHeader ? "" : "md:col-span-12"}`}
        >
          {!showHeader && profile.photoUrl ? (
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-border-subtle mb-6">
              <CmsImage
                src={profile.photoUrl}
                alt={profile.name}
                className="object-cover w-full h-full"
              />
            </div>
          ) : null}
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
