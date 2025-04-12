
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Microservices with Node.js and Docker",
      excerpt: "Learn how to architect and deploy scalable microservices using Node.js and Docker containers with practical examples and best practices.",
      date: "April 8, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
      category: "DevOps",
      link: "#blog-post"
    },
    {
      id: 2,
      title: "GraphQL vs REST: Making the Right Choice for Your API",
      excerpt: "A comprehensive comparison of GraphQL and REST APIs, exploring their strengths, weaknesses, and ideal use cases for modern web applications.",
      date: "March 22, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
      category: "Backend",
      link: "#blog-post"
    },
    {
      id: 3,
      title: "Optimizing React Performance: Advanced Techniques",
      excerpt: "Discover practical strategies to significantly improve your React application's performance, from code splitting to memoization and beyond.",
      date: "March 5, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
      category: "Frontend",
      link: "#blog-post"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-tech-blue/80">
      <div className="container-custom">
        <h2 className="section-title mb-12">Latest Articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="project-card card-hover overflow-hidden group">
              <div className="h-52 overflow-hidden rounded-lg mb-4">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="px-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-tech-accent text-sm font-medium">{post.category}</span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <a 
                    href={post.link} 
                    className="flex items-center text-tech-accent hover:text-tech-purple transition-colors"
                  >
                    <span className="mr-1">Read More</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#blog" 
            className="btn-primary inline-flex items-center"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
