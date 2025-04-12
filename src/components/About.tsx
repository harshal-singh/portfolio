
import React from 'react';
import { Code2, Clock, Laptop, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 to-transparent opacity-50"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-4">
            About Me
          </div>
          <h2 className="section-title section-title-gradient text-center">Who I Am</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-card p-8 h-full">
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              I'm a passionate software engineer with expertise in modern JavaScript technologies and cloud computing. 
              With a strong foundation in full-stack development, I enjoy building scalable web applications that 
              deliver exceptional user experiences.
            </p>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              My journey in tech started over 5 years ago, and I've since worked on various projects across
              different domains, from e-commerce to fintech. I'm constantly learning and adapting to new 
              technologies to stay at the forefront of software development.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new tech, contributing to open-source projects, 
              or sharing my knowledge through tech blogs and community events.
            </p>
          </div>
          
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 hover:-translate-y-2 transition-all duration-300">
                <Code2 className="text-violet-400 mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2 text-white">Clean Code</h3>
                <p className="text-gray-400">Writing maintainable, scalable, and efficient code is my priority.</p>
              </div>
              <div className="glass-card p-6 hover:-translate-y-2 transition-all duration-300">
                <Clock className="text-violet-400 mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2 text-white">Timely Delivery</h3>
                <p className="text-gray-400">Meeting deadlines consistently while maintaining high quality.</p>
              </div>
              <div className="glass-card p-6 hover:-translate-y-2 transition-all duration-300">
                <Laptop className="text-violet-400 mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2 text-white">Responsive Design</h3>
                <p className="text-gray-400">Creating applications that work seamlessly across all devices.</p>
              </div>
              <div className="glass-card p-6 hover:-translate-y-2 transition-all duration-300">
                <Rocket className="text-violet-400 mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-2 text-white">Optimization</h3>
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
