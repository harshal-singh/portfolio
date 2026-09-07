import About from "@/components/sections/About";
import ContactCta from "@/components/sections/ContactCta";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import SkillsPreview from "@/components/sections/SkillsPreview";
import { getPortfolioContent } from "@/lib/content/getContent";
import { seedContent } from "@/lib/seed";

export const revalidate = 3600;

export default async function Home() {
  const content = await getPortfolioContent();
  const contactCtaSection =
    content.sections.contactCta ?? seedContent.sections.contactCta;
  const aboutSection = content.sections.about ?? seedContent.sections.about;
  const dailyStack = ["TypeScript", "React", "Next.js", "Tailwind", "Node.js"];
  const educationTags = content.education.map(
    (item) => `${item.degree} · ${item.period}`,
  );

  return (
    <>
      <Hero
        profile={content.profile}
        stats={content.stats}
        dailyStack={dailyStack}
      />
      <FeaturedProjects
        section={content.sections.projects}
        projects={content.projects}
      />
      <ExperiencePreview
        section={content.sections.experience}
        experience={content.experience}
      />
      <SkillsPreview
        section={content.sections.skills}
        skills={content.skills}
      />
      <About
        section={aboutSection}
        paragraphs={content.aboutParagraphs}
        profile={content.profile}
        educationTags={educationTags}
      />
      <ContactCta profile={content.profile} section={contactCtaSection} />
    </>
  );
}
