
import React from 'react';
import { Github, ExternalLink, MonitorPlay } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, cart functionality, and payment processing.",
      image: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management System",
      description: "A Kanban-style task management application with real-time updates, built using React, TypeScript, and GraphQL. Includes drag-and-drop functionality and team collaboration features.",
      image: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
      technologies: ["React", "TypeScript", "GraphQL", "Apollo", "PostgreSQL"],
      github: "#",
      demo: "#",
    },
    {
      title: "Cloud Deployment Dashboard",
      description: "An AWS infrastructure monitoring dashboard that provides real-time insights into resource utilization, costs, and performance metrics. Built with React and AWS services.",
      image: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      technologies: ["React", "AWS", "Docker", "TypeScript", "Node.js"],
      github: "#",
      demo: "#",
    },
    {
      title: "Blogging Platform",
      description: "A modern blogging platform with a rich text editor, image uploads, and social sharing capabilities. Features user authentication, commenting, and analytics.",
      image: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "AWS S3"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-tech-blue">
      <div className="container-custom">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card card-hover">
              <div className={`h-48 rounded-md mb-6 flex items-center justify-center ${project.image}`}>
                <MonitorPlay size={64} className="text-white/50" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-tech-blue text-gray-300 px-3 py-1 rounded-md text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a 
                  href={project.github} 
                  className="flex items-center text-tech-accent hover:text-tech-purple transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={18} className="mr-2" />
                  Code
                </a>
                <a 
                  href={project.demo} 
                  className="flex items-center text-tech-accent hover:text-tech-purple transition-colors"
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
