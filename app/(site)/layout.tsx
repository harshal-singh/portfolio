import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AuroraBackground } from "@/components/aurora/AuroraBackground";
/* Command palette disabled for single-page landing
import { CommandPaletteProvider } from "@/components/command/CommandPaletteProvider";
import { buildCommandIndex } from "@/lib/search/commandItems";
*/
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolioContent } from "@/lib/content/getContent";
import { personJsonLd, websiteJsonLd } from "@/lib/metadata/jsonLd";
import { createSiteMetadata } from "@/lib/metadata/page";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata() {
  return createSiteMetadata();
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getPortfolioContent();
  /* const commandItems = buildCommandIndex(content); */

  return (
    <>
      <JsonLd data={[personJsonLd(content.profile), websiteJsonLd(content.profile)]} />
      <AuroraBackground />
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-accent-foreground"
      >
        Skip to content
      </Link>
      <Header profile={content.profile} />
      <main id="main-content" className="relative z-[2] flex-1 overflow-x-clip">
        {children}
      </main>
      <Footer profile={content.profile} />
    </>
  );
}
