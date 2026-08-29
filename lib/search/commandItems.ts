import { footerNav } from "@/lib/navigation";
import { projectHasCaseStudy } from "@/lib/projects/meta";
import type { PortfolioContent } from "@/lib/types";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href?: string;
  action?: "copy-email";
  group: "Pages" | "Blog" | "Projects" | "Actions";
  keywords?: string[];
}

export function buildCommandIndex(content: PortfolioContent): CommandItem[] {
  const pages: CommandItem[] = footerNav.map((item) => ({
    id: `page-${item.href}`,
    label: item.label,
    href: item.href,
    group: "Pages",
  }));

  const blog: CommandItem[] = content.blogPosts.map((post) => ({
    id: `blog-${post.slug}`,
    label: post.title,
    description: post.category,
    href: `/blog/${post.slug}`,
    group: "Blog",
    keywords: post.tags,
  }));

  const projects: CommandItem[] = content.projects
    .filter(projectHasCaseStudy)
    .map((project) => ({
      id: `project-${project.slug}`,
      label: project.name,
      description: project.tagline,
      href: `/projects/${project.slug}`,
      group: "Projects",
      keywords: project.stack,
    }));

  const actions: CommandItem[] = [
    {
      id: "copy-email",
      label: "Copy email address",
      description: content.profile.email,
      action: "copy-email",
      group: "Actions",
    },
  ];

  return [...pages, ...blog, ...projects, ...actions];
}

export function filterCommandItems(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) => {
    const haystack = [
      item.label,
      item.description ?? "",
      item.group,
      ...(item.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const COMMAND_GROUPS = ["Pages", "Blog", "Projects", "Actions"] as const;
