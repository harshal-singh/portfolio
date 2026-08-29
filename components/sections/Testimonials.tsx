import type { Profile, SectionMeta, Testimonial } from "@/lib/types";
import { SectionHeader } from "@/components/ui/section-header";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { Quote } from "lucide-react";
import Link from "next/link";

interface TestimonialsProps {
  section: SectionMeta;
  testimonials: Testimonial[];
  profile: Profile;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="relative p-7 md:p-8 rounded-2xl border border-border-subtle bg-surface h-full flex flex-col">
      <Quote className="w-8 h-8 text-accent/40 mb-5 shrink-0" aria-hidden />
      <blockquote className="text-body text-muted leading-relaxed flex-1 mb-6">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption>
        <p className="heading text-foreground">{item.author}</p>
        <p className="mono text-xs text-muted mt-1">
          {item.role}
          {item.company ? ` · ${item.company}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}

function TestimonialsPlaceholder({ profile }: { profile: Profile }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface-elevated/50 p-8 md:p-12 text-center max-w-2xl mx-auto">
      <Quote className="w-10 h-10 text-muted mx-auto mb-5" aria-hidden />
      <h3 className="heading text-h3 text-foreground mb-3">
        Recommendations coming soon
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
        Peer and manager endorsements will appear here. For now, my work history
        and project outcomes are the best reference — or connect on LinkedIn.
      </p>
      {profile.socials.linkedin ? (
        <Link
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-foreground border border-border px-4 py-2.5 rounded-md hover:border-accent/30 hover:bg-accent-muted transition-colors"
        >
          <LinkedinIcon className="w-4 h-4" />
          View LinkedIn profile
        </Link>
      ) : null}
    </div>
  );
}

export default function Testimonials({
  section,
  testimonials,
  profile,
}: TestimonialsProps) {
  const published = testimonials.filter((t) => t.published && t.quote.trim());

  return (
    <section id="testimonials" className="site-container site-section">
      <SectionHeader
        label={section.label}
        title={section.title}
        description={section.description || undefined}
      />
      {published.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {published.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <TestimonialsPlaceholder profile={profile} />
      )}
    </section>
  );
}
