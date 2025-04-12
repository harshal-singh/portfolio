
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const Hero = () => {
  return (
    <div id="home" className="min-h-screen flex items-center relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10 pt-20">
        <div className="animate-fade-in">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-6">
            👋 Full Stack Developer
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">Alex Miller</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-300">
            Building digital products, brands, and experiences
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-xl">
            Specializing in building exceptional digital experiences with modern JavaScript technologies like React, Node.js, and cloud platforms.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
              View My Work
            </Button>
            <Button variant="outline" className="border-gray-700 hover:border-violet-500 text-white">
              Download CV
            </Button>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center relative animate-float">
          <div className="w-[460px] h-[460px] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 absolute blur-2xl"></div>
          <div className="w-[420px] h-[420px] rounded-full overflow-hidden border-4 border-gray-800 relative z-10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
              alt="Alex Miller" 
              className="w-full h-full object-cover"
            />
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
