import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getPortfolioContent } from "@/lib/content/getContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolioContent();
  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.shortBio,
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getPortfolioContent();

  return (
    <>
      <Header profile={profile} />
      <main className="flex-1 pt-16 overflow-x-clip">{children}</main>
      <Footer profile={profile} />
    </>
  );
}
