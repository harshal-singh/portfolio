import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Contact />
    </div>
  );
};

export default Index;
