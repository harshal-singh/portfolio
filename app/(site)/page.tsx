import Achievements from "@/components/sections/Achievements";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ContactCta from "@/components/sections/ContactCta";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import Trust from "@/components/sections/Trust";
import { getPortfolioContent } from "@/lib/content/getContent";
import { seedContent } from "@/lib/seed";

export const revalidate = 3600;

export default async function Home() {
  const content = await getPortfolioContent();
  const achievementsSection =
    content.sections.achievements ?? seedContent.sections.achievements;
  const testimonialsSection =
    content.sections.testimonials ?? seedContent.sections.testimonials;
  const contactCtaSection =
    content.sections.contactCta ?? seedContent.sections.contactCta;
  const publishedTestimonials = content.testimonials.filter(
    (t) => t.published && t.quote.trim(),
  );

  return (
    <>
      <Hero profile={content.profile} />
      <Trust metrics={content.stats} />
      <Achievements
        section={achievementsSection}
        achievements={content.achievements ?? seedContent.achievements}
      />
      <ExperiencePreview
        section={content.sections.experience}
        experience={content.experience}
      />
      <FeaturedProjects
        section={content.sections.projects}
        projects={content.projects}
      />
      <BlogTeaser
        section={content.sections.blogTeaser}
        posts={content.blogPosts}
      />
      {publishedTestimonials.length > 0 ? (
        <Testimonials
          section={testimonialsSection}
          testimonials={content.testimonials}
          profile={content.profile}
        />
      ) : null}
      <ContactCta profile={content.profile} section={contactCtaSection} />
    </>
  );
}
