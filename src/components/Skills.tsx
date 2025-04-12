
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
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-900"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-4">
            My Skills
          </div>
          <h2 className="section-title section-title-gradient text-center">Technical Expertise</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-violet-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-violet-500 to-indigo-600 h-1.5 rounded-full" 
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
          <h3 className="text-2xl font-semibold mb-8 text-center bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">Technologies I Work With</h3>
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
