
import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-tech-blue/95 py-10 border-t border-gray-800">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold text-white">
              Dev<span className="text-tech-accent">Portfolio</span>
            </a>
            <p className="text-gray-400 mt-2">Creating innovative web solutions</p>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#home" className="text-gray-400 hover:text-tech-accent transition-colors">Home</a>
            <a href="#about" className="text-gray-400 hover:text-tech-accent transition-colors">About</a>
            <a href="#skills" className="text-gray-400 hover:text-tech-accent transition-colors">Skills</a>
            <a href="#projects" className="text-gray-400 hover:text-tech-accent transition-colors">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-tech-accent transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-accent transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Alex Miller. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-tech-blue border border-gray-700 rounded-full p-2 text-gray-400 hover:text-tech-accent hover:border-tech-accent transition-all"
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
