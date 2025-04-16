
import { Code, Laptop, Rocket, Star, Sparkles, Zap, ArrowRight } from "lucide-react";

const LinkedInBanner = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      {/* Background with space theme and gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-violet-950/70"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute h-3 w-3 rounded-full bg-violet-400/70 blur-sm top-20 left-[40%] animate-pulse"></div>
        <div className="absolute h-2 w-2 rounded-full bg-indigo-400/70 blur-sm top-40 left-[50%] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-violet-300/70 blur-sm top-60 left-[60%] animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute h-3 w-3 rounded-full bg-indigo-300/70 blur-sm top-30 left-[80%] animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-violet-400/70 blur-sm top-50 left-[90%] animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Gradient circles */}
        <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-3xl top-20 right-[30%]"></div>
        <div className="absolute h-[250px] w-[250px] rounded-full bg-violet-600/10 blur-3xl -bottom-20 right-[10%]"></div>
      </div>
      
      {/* LinkedIn profile placeholder - this shows the area that will be covered by profile */}
      <div className="absolute left-0 top-0 w-[320px] h-full bg-transparent border-r border-dashed border-white/20 flex items-center justify-center">
        <div className="text-gray-500/30 text-sm font-medium rotate-90">Profile area (hidden)</div>
      </div>
      
      {/* Content container - positioned to avoid LinkedIn profile overlay */}
      <div className="absolute inset-0 flex items-center pl-[350px] pr-16 z-10">
        <div className="w-full">
          {/* Main content */}
          <div className="max-w-4xl">
            {/* Name */}
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-white">Harshal Singh</span>
            </h1>
            
            <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/40 text-violet-200 rounded-full mb-4 backdrop-blur-sm">
              Full Stack Developer
            </div>
            
            <div className="text-xl font-medium mb-5 text-gray-300">
              Building innovative digital solutions with{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent font-semibold">
                Modern Web Technologies
              </span>
            </div>
            
            {/* Skills pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gray-700/30 hover:border-violet-500/30 transition-colors">
                React.js
              </span>
              <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gray-700/30 hover:border-violet-500/30 transition-colors">
                Next.js
              </span>
              <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gray-700/30 hover:border-violet-500/30 transition-colors">
                TypeScript
              </span>
              <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gray-700/30 hover:border-violet-500/30 transition-colors">
                Node.js
              </span>
              <span className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gray-700/30 hover:border-violet-500/30 transition-colors">
                AWS
              </span>
            </div>
          </div>
          
          {/* Key features cards in horizontal layout */}
          <div className="flex gap-4 mt-4">
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Zap className="text-violet-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Modern Stack</span>
              </div>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Laptop className="text-indigo-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Responsive Design</span>
              </div>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Rocket className="text-purple-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Performance</span>
              </div>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Sparkles className="text-pink-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Clean Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Website URL with glowing effect */}
      <div className="absolute bottom-8 right-10 text-gray-400 text-sm bg-gray-800/30 px-4 py-1 rounded-full backdrop-blur-sm border border-gray-700/30">
        <span className="text-violet-400 mr-1"><ArrowRight size={14} className="inline" /></span> harshal-singh.vercel.app
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-8 right-[280px] h-px w-32 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0"></div>
    </div>
  );
};

export default LinkedInBanner;
