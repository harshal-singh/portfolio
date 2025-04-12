
import React from 'react';
import { Code2, Clock, Laptop, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-tech-blue/90">
      <div className="container-custom">
        <h2 className="section-title">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <p className="text-gray-300 mb-6 text-lg">
              I'm a passionate software engineer with expertise in modern JavaScript technologies and cloud computing. 
              With a strong foundation in full-stack development, I enjoy building scalable web applications that 
              deliver exceptional user experiences.
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              My journey in tech started over 5 years ago, and I've since worked on various projects across
              different domains, from e-commerce to fintech. I'm constantly learning and adapting to new 
              technologies to stay at the forefront of software development.
            </p>
            <p className="text-gray-300 text-lg">
              When I'm not coding, you can find me exploring new tech, contributing to open-source projects, 
              or sharing my knowledge through tech blogs and community events.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-secondary p-6 rounded-lg card-hover">
                <Code2 className="text-tech-accent mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
                <p className="text-gray-400">Writing maintainable, scalable, and efficient code is my priority.</p>
              </div>
              <div className="bg-secondary p-6 rounded-lg card-hover">
                <Clock className="text-tech-accent mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
                <p className="text-gray-400">Meeting deadlines consistently while maintaining high quality.</p>
              </div>
              <div className="bg-secondary p-6 rounded-lg card-hover">
                <Laptop className="text-tech-accent mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                <p className="text-gray-400">Creating applications that work seamlessly across all devices.</p>
              </div>
              <div className="bg-secondary p-6 rounded-lg card-hover">
                <Rocket className="text-tech-accent mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2">Optimization</h3>
                <p className="text-gray-400">Building high-performance applications with optimized code.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
