
import { Code, Laptop, Rocket, Github, Twitter, Briefcase, Star } from "lucide-react";

const LinkedInBanner = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      {/* Background with space theme and gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-violet-950/70"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute h-3 w-3 rounded-full bg-violet-400/70 blur-sm top-20 left-[10%] animate-pulse"></div>
        <div className="absolute h-2 w-2 rounded-full bg-indigo-400/70 blur-sm top-40 left-[20%] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-violet-300/70 blur-sm top-60 left-[30%] animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute h-3 w-3 rounded-full bg-indigo-300/70 blur-sm top-30 left-[80%] animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-violet-400/70 blur-sm top-50 left-[90%] animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Gradient circles */}
        <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-3xl -bottom-20 -left-20"></div>
        <div className="absolute h-[250px] w-[250px] rounded-full bg-violet-600/10 blur-3xl top-10 right-[30%]"></div>
      </div>
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-between px-16 z-10">
        {/* Left side - Profile info */}
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/40 text-violet-200 rounded-full mb-4 backdrop-blur-sm">
            Full Stack Developer
          </div>
          <h1 className="text-5xl font-bold mb-3">
            <span className="text-white">Harshal Singh</span>
          </h1>
          <div className="text-xl font-medium mb-4 text-gray-300">
            Building innovative digital solutions with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent font-semibold">
              Modern Web Technologies
            </span>
          </div>
          <p className="text-gray-400 mb-5 text-sm max-w-md">
            Full-stack development • Cloud architecture • Performance optimization
          </p>
          
          {/* Skills pills */}
          <div className="flex flex-wrap gap-2">
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
          
          {/* Social media icons */}
          <div className="mt-5 flex gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-800/70 backdrop-blur-sm flex items-center justify-center border border-gray-700/30 hover:border-violet-500/30 transition-colors">
              <Github size={16} className="text-gray-300" />
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-800/70 backdrop-blur-sm flex items-center justify-center border border-gray-700/30 hover:border-violet-500/30 transition-colors">
              <Twitter size={16} className="text-gray-300" />
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-800/70 backdrop-blur-sm flex items-center justify-center border border-gray-700/30 hover:border-violet-500/30 transition-colors">
              <Briefcase size={16} className="text-gray-300" />
            </div>
          </div>
        </div>
        
        {/* Right side - Visual elements */}
        <div className="flex items-center gap-6">
          {/* Stats/Features cards */}
          <div className="space-y-3">
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-56 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-9 w-9 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Code className="text-violet-400" size={18} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Clean Code</span>
                <div className="text-xs text-gray-400">Maintainable & readable</div>
              </div>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-56 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-9 w-9 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Laptop className="text-indigo-400" size={18} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Responsive Design</span>
                <div className="text-xs text-gray-400">Mobile-first approach</div>
              </div>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-56 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-9 w-9 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Rocket className="text-purple-400" size={18} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Performance</span>
                <div className="text-xs text-gray-400">Optimized for speed</div>
              </div>
            </div>
            <div className="glass-card p-3 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-56 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-9 w-9 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Star className="text-pink-400" size={18} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">User Experience</span>
                <div className="text-xs text-gray-400">Intuitive interfaces</div>
              </div>
            </div>
          </div>
          
          {/* Circle with glow effect */}
          <div className="relative">
            <div className="w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-gray-800/80 relative z-10 shadow-2xl">
              <img
                src="/harshal-singh.jpg"
                alt="Harshal Singh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[260px] h-[260px] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 absolute -top-5 -left-5 blur-xl -z-10"></div>
            <div className="w-[280px] h-[280px] rounded-full border border-gray-700/20 absolute -top-[30px] -left-[30px] -z-10"></div>
            <div className="w-[300px] h-[300px] rounded-full border border-gray-700/10 absolute -top-[40px] -left-[40px] -z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Website URL with glowing effect */}
      <div className="absolute bottom-8 right-10 text-gray-400 text-sm bg-gray-800/30 px-4 py-1 rounded-full backdrop-blur-sm border border-gray-700/30">
        <span className="text-violet-400 mr-1">→</span> harshal-singh.vercel.app
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-8 left-10 h-px w-32 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0"></div>
    </div>
  );
};

export default LinkedInBanner;
