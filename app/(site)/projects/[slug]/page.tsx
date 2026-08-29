import { ProjectCaseStudyClient } from "@/components/projects/ProjectCaseStudyClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata/page";
import { breadcrumbJsonLd, projectCaseStudyJsonLd } from "@/lib/metadata/jsonLd";
import { getProjectView } from "@/lib/content/getProjectView";
import { getAllProjects } from "@/lib/content/getContent";
import { projectHasCaseStudy } from "@/lib/projects/meta";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.filter(projectHasCaseStudy).map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { project } = await getProjectView(slug);
  if (!project) {
    return createPageMetadata("Project not found", "Case study", {
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }
  return createPageMetadata(project.name, project.overview || project.tagline, {
    path: `/projects/${project.slug}`,
    type: "article",
    tags: project.stack,
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const { project, profile, related } = await getProjectView(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          projectCaseStudyJsonLd(project, profile),
          breadcrumbJsonLd([
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectCaseStudyClient project={project} profile={profile} related={related} />
    </>
  );
}
