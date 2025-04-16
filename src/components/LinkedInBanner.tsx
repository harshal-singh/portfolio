
import { Code, Laptop, Rocket } from "lucide-react";

const LinkedInBanner = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      {/* Background with space theme and gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-violet-950/50"></div>
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-between px-12 z-10">
        {/* Left side - Profile info */}
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/30 text-violet-300 rounded-full mb-4">
            Full Stack Developer
          </div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-white">Harshal Singh</span>
          </h1>
          <div className="text-xl font-medium mb-3 text-gray-300">
            Building innovative digital solutions with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent font-semibold">
              JavaScript
            </span>
          </div>
          <p className="text-gray-400 mb-4 text-sm max-w-md">
            Full-stack development • Cloud platforms • Modern web solutions
          </p>
          
          {/* Skills pills */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-md text-sm">
              React.js
            </span>
            <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-md text-sm">
              Next.js
            </span>
            <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-md text-sm">
              TypeScript
            </span>
            <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-md text-sm">
              Node.js
            </span>
          </div>
        </div>
        
        {/* Right side - Visual elements */}
        <div className="flex items-center gap-4">
          {/* Features cards */}
          <div className="space-y-3">
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-48 backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-lg">
              <Code className="text-violet-400" size={24} />
              <span className="text-sm font-medium text-white">Clean Code</span>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-48 backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-lg">
              <Laptop className="text-violet-400" size={24} />
              <span className="text-sm font-medium text-white">Responsive Design</span>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-48 backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-lg">
              <Rocket className="text-violet-400" size={24} />
              <span className="text-sm font-medium text-white">Performance Optimized</span>
            </div>
          </div>
          
          {/* Circle with glow effect */}
          <div className="relative">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-gray-800 relative z-10 shadow-2xl">
              <img
                src="/harshal-singh.jpg"
                alt="Harshal Singh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 absolute -top-5 -left-5 blur-xl -z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Website URL */}
      <div className="absolute bottom-6 right-8 text-gray-400 text-sm">
        harshal-singh.vercel.app
      </div>
    </div>
  );
};

export default LinkedInBanner;
