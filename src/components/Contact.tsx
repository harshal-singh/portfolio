
import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-t from-tech-blue to-tech-blue/95">
      <div className="container-custom">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-gray-300 mb-8 text-lg">
              I'm currently open to new opportunities and collaborations. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 bg-tech-accent/20 p-3 rounded-full">
                  <Mail className="text-tech-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-gray-400">alex.miller@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-tech-accent/20 p-3 rounded-full">
                  <MapPin className="text-tech-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="text-gray-400">San Francisco, CA</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-tech-accent/20 p-3 rounded-full">
                  <Phone className="text-tech-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-white">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-tech-blue text-white rounded-md border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tech-accent"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-tech-blue text-white rounded-md border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tech-accent"
                  placeholder="Your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-gray-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-tech-blue text-white rounded-md border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tech-accent"
                  placeholder="Subject"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-300">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-tech-blue text-white rounded-md border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tech-accent"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary inline-flex items-center"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
