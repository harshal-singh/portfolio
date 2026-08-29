import type { MetadataRoute } from "next";
import { parseBlogDate } from "@/lib/blog/date";
import { getAllProjects, getPortfolioContent } from "@/lib/content/getContent";
import { absoluteUrl } from "@/lib/metadata/site";
import { projectHasCaseStudy } from "@/lib/projects/meta";

export const revalidate = 3600;

const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/experience", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/resume", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPortfolioContent();
  const projects = await getAllProjects();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path === "/" ? "/" : path),
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = content.blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: parseBlogDate(post.date) ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter(projectHasCaseStudy)
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
