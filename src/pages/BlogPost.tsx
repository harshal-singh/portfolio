import React from "react";
import { Calendar, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react";
import BackButton from "@/components/BackButton";

const BlogPost = () => {
  return (
    <section id="blog-post" className="pt-28 sm:pt-36 pb-24 relative">
      <BackButton />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900"></div>

      <div className="container-custom relative z-10">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full">
              DevOps
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-6">
              Building Scalable Microservices with Node.js and Docker
            </h1>

            <div className="flex flex-wrap items-center text-gray-400 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>April 8, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>8 min read</span>
              </div>
            </div>
          </div>

          <div className="mb-10 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
              alt="Building Microservices"
              className="w-full h-auto"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Microservices architecture has revolutionized how we build and
              deploy applications. By breaking down monolithic applications into
              smaller, independently deployable services, teams can develop,
              scale, and maintain their systems more effectively.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Why Microservices?
            </h2>
            <p className="text-gray-300 mb-6">
              The microservices architectural style is an approach to developing
              a single application as a suite of small services, each running in
              its own process and communicating with lightweight mechanisms,
              often an HTTP resource API.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-3">Key Benefits:</h3>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li>Independent deployment and scaling of services</li>
              <li>
                Increased resilience - failure in one service doesn't bring down
                the entire system
              </li>
              <li>
                Technology diversity - freedom to use different technologies for
                different services
              </li>
              <li>
                Focused teams - smaller, more focused codebases for each team to
                maintain
              </li>
              <li>
                Faster time to market - parallel development and deployment
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Setting Up Your Development Environment
            </h2>
            <p className="text-gray-300 mb-6">
              To get started with microservices, you'll need to set up a proper
              development environment. Here's what you'll need:
            </p>

            <div className="bg-gray-900/50 rounded-lg p-6 my-8 border border-gray-800">
              <h4 className="text-lg font-bold mb-4 text-violet-400">
                Prerequisites:
              </h4>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Node.js (v16 or later)</li>
                <li>Docker Desktop</li>
                <li>Docker Compose</li>
                <li>A code editor (VS Code recommended)</li>
                <li>Postman or similar API testing tool</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Containerizing Your Services with Docker
            </h2>
            <p className="text-gray-300 mb-6">
              Docker allows you to package your application with all of its
              dependencies into a standardized unit for software development.
              This ensures consistency across different environments and
              simplifies deployment.
            </p>

            <p className="text-gray-300 mb-6">
              In the next sections, we'll explore how to create efficient
              Dockerfiles, set up multi-container applications with Docker
              Compose, and implement communication patterns between
              microservices.
            </p>

            <div className="border-l-4 border-violet-500 pl-6 py-4 my-8">
              <p className="text-gray-300 italic">
                "The secret to building large apps is never build large apps.
                Break your applications into small pieces. Then, assemble those
                testable, bite-sized pieces into your big application."
              </p>
              <p className="text-gray-400 mt-2">
                — Justin Meyer, Author of JavaScript MVC
              </p>
            </div>

            <p className="text-gray-300 mb-6">
              Stay tuned for the next part of this series where we'll dive
              deeper into implementing service discovery, load balancing, and
              handling failures gracefully in a microservices architecture.
            </p>
          </div>

          {/* <div className="mt-12 flex items-center justify-between border-t border-gray-800 pt-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-400 hover:text-violet-400 transition-colors">
                <ThumbsUp size={20} className="mr-2" />
                <span>427</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-violet-400 transition-colors">
                <Share2 size={20} className="mr-2" />
                <span>Share</span>
              </button>
            </div>
            <button className="flex items-center text-gray-400 hover:text-violet-400 transition-colors">
              <Bookmark size={20} className="mr-2" />
              <span>Save</span>
            </button>
          </div> */}
        </article>
      </div>
    </section>
  );
};

export default BlogPost;
