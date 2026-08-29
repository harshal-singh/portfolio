import { parseBlogDate } from "@/lib/blog/date";
import { absoluteUrl, getSiteUrl } from "@/lib/metadata/site";
import type { BlogPost, Profile, Project } from "@/lib/types";

function personBase(profile: Profile) {
  const sameAs = [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.twitter,
  ].filter(Boolean);

  return {
    "@type": "Person" as const,
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: getSiteUrl(),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function personJsonLd(profile: Profile) {
  return {
    "@context": "https://schema.org",
    ...personBase(profile),
  };
}

export function websiteJsonLd(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: getSiteUrl(),
    description: profile.shortBio,
    author: personBase(profile),
  };
}

export function blogPostingJsonLd(post: BlogPost, profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: parseBlogDate(post.date)?.toISOString() ?? post.date,
    author: personBase(profile),
    url: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
}

export function projectCaseStudyJsonLd(project: Project, profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.name,
    description: project.overview || project.tagline,
    author: personBase(profile),
    url: absoluteUrl(`/projects/${project.slug}`),
    keywords: project.stack.join(", "),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
