import { HeroLabClient } from "@/components/hero-lab/HeroLabClient";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export async function generateMetadata() {
  return createPageMetadata(
    "Hero lab",
    "Preview hero section variations — internal design comparison.",
    { path: "/hero-lab", noIndex: true },
  );
}

export default async function HeroLabPage() {
  const { profile } = await getPortfolioContent();

  return <HeroLabClient profile={profile} />;
}
