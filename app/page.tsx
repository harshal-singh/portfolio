import About from "@/components/sections/About";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <BlogTeaser />
      {/* <Education /> */}
      <Contact />
    </>
  );
}
