import BlogTeaser from "@/components/sections/BlogTeaser";
import Education from "@/components/sections/Education";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Skills from "@/components/sections/Skills";
import { getPortfolioContent } from "@/lib/content/getContent";

export const revalidate = 3600;

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <>
      <Hero profile={content.profile} />
      <Marquee items={content.marquee} />
      {/* <About
        section={content.sections.about}
        paragraphs={content.aboutParagraphs}
        stats={content.stats}
      /> */}
      <Skills section={content.sections.skills} skills={content.skills} />
      {/* <Experience section={content.sections.experience} experience={content.experience} /> */}
      {/* <Projects section={content.sections.projects} projects={content.projects} /> */}
      <BlogTeaser
        section={content.sections.blogTeaser}
        posts={content.blogPosts}
      />
      <Education
        section={content.sections.education}
        education={content.education}
      />
    </>
  );
}
