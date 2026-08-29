import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import { PageHeader } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";
import { seedContent } from "@/lib/seed";

export const revalidate = 3600;

export async function generateMetadata() {
  const { sections, profile } = await getPortfolioContent();
  const about = sections.about ?? seedContent.sections.about;
  return createPageMetadata(
    "About",
    about.description || `${profile.role}. ${about.title}`,
    { path: "/about" },
  );
}

export default async function AboutPage() {
  const content = await getPortfolioContent();
  const aboutSection = content.sections.about ?? seedContent.sections.about;

  return (
    <>
      <PageHeader
        label={aboutSection.label}
        title={aboutSection.title}
        description={aboutSection.description || undefined}
      />
      <About
        section={aboutSection}
        paragraphs={content.aboutParagraphs}
        profile={content.profile}
        showHeader={false}
      />
      <Skills section={content.sections.skills} skills={content.skills} />
      <Education section={content.sections.education} education={content.education} />
    </>
  );
}
