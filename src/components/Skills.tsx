
import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "React.js", level: 90 },
        { name: "HTML/CSS", level: 88 },
        { name: "Tailwind CSS", level: 85 },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Express.js", level: 85 },
        { name: "GraphQL", level: 82 },
        { name: "REST APIs", level: 90 },
      ],
    },
    {
      title: "Database & DevOps",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 83 },
        { name: "AWS", level: 80 },
        { name: "Docker", level: 88 },
        { name: "CI/CD", level: 82 },
      ],
    },
  ];

  const technicalSkills = [
    "JavaScript", "TypeScript", "React.js", "Node.js", "Next.js", 
    "Express.js", "MongoDB", "PostgreSQL", "GraphQL", "AWS", 
    "Docker", "Kubernetes", "Git", "RESTful APIs", "Tailwind CSS", 
    "Redux", "Jest", "Cypress", "CI/CD", "Microservices"
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-tech-blue to-tech-blue/95">
      <div className="container-custom">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-tech-accent">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-tech-accent to-tech-purple h-2 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technicalSkills.map((skill, index) => (
              <span key={index} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
