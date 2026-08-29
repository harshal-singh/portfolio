import { parseBlogDate } from "@/lib/blog/date";
import { getPortfolioContent } from "@/lib/content/getContent";
import { absoluteUrl } from "@/lib/metadata/site";
import type { Metadata } from "next";

export type PageMetadataOptions = {
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

export async function createPageMetadata(
  title: string,
  description?: string,
  options: PageMetadataOptions = {},
): Promise<Metadata> {
  const { profile } = await getPortfolioContent();
  const pageTitle = title;
  const desc = description ?? profile.shortBio;
  const canonical = options.path ? absoluteUrl(options.path) : undefined;

  return {
    title: pageTitle,
    description: desc,
    ...(options.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: pageTitle,
      description: desc,
      type: options.type ?? "website",
      url: canonical,
      siteName: profile.name,
      locale: "en_US",
      ...(options.publishedTime
        ? {
            publishedTime:
              parseBlogDate(options.publishedTime)?.toISOString() ??
              options.publishedTime,
          }
        : {}),
      ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
      ...(options.tags?.length ? { tags: options.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      creator: profile.socials.twitter
        ? `@${profile.socials.twitter.replace(/.*\//, "").replace("@", "")}`
        : undefined,
    },
  };
}

/** Default metadata for the public site shell. */
export async function createSiteMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolioContent();
  const title = `${profile.name} — ${profile.role}`;
  const description = profile.shortBio;

  return {
    title: {
      default: title,
      template: `%s — ${profile.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl("/"),
      siteName: profile.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
