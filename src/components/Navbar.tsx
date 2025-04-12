
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-tech-blue/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white">
          Dev<span className="text-tech-accent">Portfolio</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-tech-accent transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-tech-accent text-white px-4 py-2 rounded-md hover:bg-tech-purple transition-colors"
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-tech-blue/95 backdrop-blur-md">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-tech-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-tech-accent text-white px-4 py-2 rounded-md hover:bg-tech-purple transition-colors inline-block w-fit"
              onClick={() => setIsOpen(false)}
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
