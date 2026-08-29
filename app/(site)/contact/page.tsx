import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata/page";
import { getPortfolioContent } from "@/lib/content/getContent";
import { seedContent } from "@/lib/seed";

export const revalidate = 3600;

export async function generateMetadata() {
  const { sections } = await getPortfolioContent();
  const contact = sections.contact ?? seedContent.sections.contact;
  return createPageMetadata("Contact", contact.description, { path: "/contact" });
}

export default async function ContactPage() {
  const content = await getPortfolioContent();
  const contactSection = content.sections.contact ?? seedContent.sections.contact;

  return (
    <>
      <PageHeader
        label={contactSection.label}
        title={contactSection.title}
        description={contactSection.description || undefined}
      />
      <ContactForm profile={content.profile} />
    </>
  );
}
