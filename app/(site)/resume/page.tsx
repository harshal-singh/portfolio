import { ResumeView } from "@/components/resume/ResumeView";
import { PageHeader } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";
import { seedContent } from "@/lib/seed";

export const revalidate = 3600;

export async function generateMetadata() {
  const { sections, profile } = await getPortfolioContent();
  const resume = sections.resume ?? seedContent.sections.resume;
  return createPageMetadata(
    "Resume",
    resume.description || `${profile.role} — experience, skills, and education.`,
    { path: "/resume" },
  );
}

export default async function ResumePage() {
  const content = await getPortfolioContent();
  const resumeSection = content.sections.resume ?? seedContent.sections.resume;

  return (
    <>
      <PageHeader
        label={resumeSection.label}
        title={resumeSection.title}
        description={resumeSection.description || undefined}
      />
      <ResumeView profile={content.profile} />
    </>
  );
}
