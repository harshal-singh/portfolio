
import React from 'react';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const Hero = () => {
  return (
    <div id="home" className="min-h-screen flex items-center relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-tech-purple/10 to-transparent"></div>
      <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Hi, I'm </span>
            <span className="text-tech-accent">Alex Miller</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
            Full Stack Software Engineer
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-lg">
            Specializing in modern JavaScript technologies to create innovative solutions 
            using React, Node.js, AWS, Docker, and more.
          </p>
          <div className="flex space-x-4 mb-8">
            <a 
              href="#projects" 
              className="btn-primary"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="border border-tech-accent text-tech-accent px-6 py-3 rounded-md font-medium hover:bg-tech-accent hover:text-white transition-all"
            >
              Let's Talk
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-accent transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-accent transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-accent transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>
        <div className="hidden md:flex justify-center relative">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-tech-accent/20 to-tech-purple/20 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-tech-blue border-4 border-tech-accent/30 overflow-hidden">
              {/* Replace with actual profile image */}
              <div className="w-full h-full bg-gradient-to-br from-tech-accent to-tech-purple opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
        <a href="#about" className="flex flex-col items-center">
          <span className="mb-2 text-sm">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
