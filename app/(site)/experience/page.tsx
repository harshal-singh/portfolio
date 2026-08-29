import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { PageHeader } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const { sections } = await getPortfolioContent();
  return createPageMetadata(
    "Experience",
    sections.experience.description || "Professional timeline, impact, and technologies.",
    { path: "/experience" },
  );
}

export default async function ExperiencePage() {
  const content = await getPortfolioContent();

  return (
    <>
      <PageHeader
        label={content.sections.experience.label}
        title={content.sections.experience.title}
        description={
          content.sections.experience.description ||
          "Roles, responsibilities, measurable outcomes, and the technologies behind them."
        }
      />
      <div className="site-container pb-20 md:pb-28">
        <ExperienceTimeline experience={content.experience} variant="full" />
      </div>
    </>
  );
}