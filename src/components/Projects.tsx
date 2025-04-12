
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, cart functionality, and payment processing.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management System",
      description: "A Kanban-style task management application with real-time updates, built using React, TypeScript, and GraphQL. Includes drag-and-drop functionality and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d7f2a7?q=80&w=2069&auto=format&fit=crop",
      technologies: ["React", "TypeScript", "GraphQL", "Apollo", "PostgreSQL"],
      github: "#",
      demo: "#",
    },
    {
      title: "Cloud Deployment Dashboard",
      description: "An AWS infrastructure monitoring dashboard that provides real-time insights into resource utilization, costs, and performance metrics. Built with React and AWS services.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      technologies: ["React", "AWS", "Docker", "TypeScript", "Node.js"],
      github: "#",
      demo: "#",
    },
    {
      title: "Blogging Platform",
      description: "A modern blogging platform with a rich text editor, image uploads, and social sharing capabilities. Features user authentication, commenting, and analytics.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "AWS S3"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/10 to-transparent opacity-50"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-4">
            My Work
          </div>
          <h2 className="section-title section-title-gradient text-center">Featured Projects</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card group">
              <div className="h-56 rounded-lg mb-6 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-md text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a 
                  href={project.github} 
                  className="flex items-center text-violet-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={18} className="mr-2" />
                  Code
                </a>
                <a 
                  href={project.demo} 
                  className="flex items-center text-violet-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com" 
            className="btn-primary inline-flex items-center"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={20} className="mr-2" />
            See More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
