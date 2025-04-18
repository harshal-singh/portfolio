import React from "react";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-950 pt-16 pb-8 border-t border-gray-800/30 relative z-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
          <div className="mb-8 md:mb-0 text-left">
            <a href="#" className="text-2xl font-bold inline-block mb-4">
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Harshal
              </span>
              <span className="text-white"> Singh</span>
            </a>
            <p className="text-gray-400 max-w-md">
              Building innovative digital solutions and experiences using
              JavaScript technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 mb-8 md:mb-0">
            {location.pathname === "/" && (
              <>
                <div className="flex flex-col items-start">
                  <h3 className="text-white font-medium mb-4">Navigation</h3>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="#home"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      Home
                    </a>
                    <a
                      href="#about"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="#skills"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      Skills
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-white font-medium mb-4">Content</h3>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="#projects"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      Projects
                    </a>
                    <a
                      href="#blogs"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      Blogs
                    </a>
                    <a
                      href="#contact"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col items-start col-span-2 md:col-span-1 mt-8 md:mt-0">
              <h3 className="text-white font-medium mb-4">Social Media</h3>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/harshal-singh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-violet-400 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/harshal-singh-56a55a236/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-violet-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://x.com/harshal_8ingh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-violet-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Harshal Singh. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="bg-gray-800/50 hover:bg-violet-600/20 border border-gray-700 hover:border-violet-500 rounded-full p-2 text-gray-400 hover:text-violet-400 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
