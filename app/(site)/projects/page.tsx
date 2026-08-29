import Projects from "@/components/sections/Projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const { sections } = await getPortfolioContent();
  return createPageMetadata(
    "Projects",
    sections.projects.description || "Selected work and case studies.",
    { path: "/projects" },
  );
}

export default async function ProjectsPage() {
  const content = await getPortfolioContent();

  return (
    <>
      <PageHeader
        label={content.sections.projects.label}
        title={content.sections.projects.title}
        description={
          content.sections.projects.description ||
          "Production systems chosen for technical depth and business impact."
        }
      />
      <Projects
        section={content.sections.projects}
        projects={content.projects}
        showHeader={false}
      />
    </>
  );
}
