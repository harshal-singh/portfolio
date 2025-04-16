
import { Code, Laptop, Rocket, Star, Sparkles, Zap, ArrowRight, Database, Server, Globe, Layout, FileCode, Shield } from "lucide-react";

type LinkedInBannerProps = {
  variant?: 1 | 2 | 3;
};

const LinkedInBanner = ({ variant = 1 }: LinkedInBannerProps) => {
  switch (variant) {
    case 1:
      return <GradientSpaceVariant />;
    case 2:
      return <GeometricPatternVariant />;
    case 3:
      return <MinimalCodeVariant />;
    default:
      return <GradientSpaceVariant />;
  }
};

// Variant 1: Space Theme with Gradient Overlay
const GradientSpaceVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      {/* Background with space theme and gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-violet-950/70"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Gradient circles */}
        <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-3xl top-20 right-[30%]"></div>
        <div className="absolute h-[250px] w-[250px] rounded-full bg-violet-600/10 blur-3xl -bottom-20 right-[10%]"></div>
      </div>
      
      {/* Content container - positioned to avoid LinkedIn profile overlay */}
      <div className="absolute inset-0 flex items-center justify-end pr-16 z-10">
        <div className="max-w-[900px] ml-[400px]">
          {/* Main content */}
          <div>
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
            <div className="glass-card p-3 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Zap className="text-violet-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Modern Stack</span>
              </div>
            </div>
            <div className="glass-card p-3 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Laptop className="text-indigo-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Responsive Design</span>
              </div>
            </div>
            <div className="glass-card p-3 flex items-center gap-3 backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Rocket className="text-purple-400" size={16} />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Performance</span>
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

// Variant 2: Geometric Pattern Design
const GeometricPatternVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      {/* Background with geometric pattern */}
      <div className="absolute inset-0 bg-indigo-950"></div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[400px] w-48 h-48 bg-violet-500/10 rotate-45 transform -translate-y-20"></div>
        <div className="absolute bottom-0 right-[400px] w-64 h-64 bg-indigo-500/10 rotate-12 transform translate-y-20"></div>
        <div className="absolute top-[50%] right-[30%] w-32 h-32 bg-purple-500/10 rotate-45"></div>
        <div className="absolute top-[30%] right-[60%] w-16 h-16 bg-pink-500/20 rotate-12"></div>
        <div className="absolute bottom-[40%] right-[20%] w-24 h-24 bg-blue-500/10 rotate-45"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-end z-10">
        <div className="max-w-[900px] ml-[450px] pr-16">
          <div className="mb-6">
            <div className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Full Stack Developer</div>
            <h1 className="text-6xl font-bold text-white mb-3">Harshal Singh</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-violet-500 to-indigo-500 mb-4"></div>
            <p className="text-indigo-200 text-xl max-w-2xl">
              Crafting modern web experiences with cutting-edge technologies
            </p>
          </div>
          
          {/* Expertise areas */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Code className="text-indigo-300" size={20} />
              </div>
              <div className="text-white font-medium">Frontend Dev</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Server className="text-violet-300" size={20} />
              </div>
              <div className="text-white font-medium">Backend Dev</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Globe className="text-purple-300" size={20} />
              </div>
              <div className="text-white font-medium">Cloud Solutions</div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">React</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">Next.js</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">TypeScript</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">Node.js</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">AWS</div>
          </div>
        </div>
      </div>
      
      {/* Bottom tag */}
      <div className="absolute right-8 bottom-6 text-indigo-300 font-medium">
        harshal-singh.vercel.app
      </div>
    </div>
  );
};

// Variant 3: Minimal Code Theme
const MinimalCodeVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden bg-gray-900">
      {/* Code background */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 40 L40 20 L60 40 L80 20' stroke='%238b5cf6' stroke-width='0.5' fill='none'/%3E%3Cpath d='M20 60 L40 80 L60 60 L80 80' stroke='%238b5cf6' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
      
      {/* Code-like elements */}
      <div className="absolute top-[40%] right-0 h-px w-full bg-gray-800"></div>
      <div className="absolute top-[60%] right-0 h-px w-full bg-gray-800"></div>
      <div className="absolute top-0 right-[400px] w-px h-full bg-gray-800"></div>
      <div className="absolute top-0 right-[800px] w-px h-full bg-gray-800"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="ml-[400px] mr-16 max-w-[900px]">
          <div className="mb-4 text-sm text-gray-500 font-mono">
            <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}
          </div>
          
          <div className="pl-8 mb-4">
            <div className="mb-2">
              <span className="text-pink-400 font-mono">name:</span> <span className="text-white text-4xl font-bold ml-2">Harshal Singh</span>
            </div>
            <div className="mb-2">
              <span className="text-pink-400 font-mono">role:</span> <span className="text-white text-xl font-medium ml-2">Full Stack Developer</span>
            </div>
            <div className="mb-4">
              <span className="text-pink-400 font-mono">expertise:</span> <span className="text-gray-300 font-medium ml-2">Building scalable web applications</span>
            </div>
            
            <div className="mb-2">
              <span className="text-pink-400 font-mono">skills:</span> <span className="text-gray-400 font-mono ml-2">[</span>
            </div>
            
            <div className="pl-8 flex flex-wrap gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <FileCode size={14} className="text-blue-400" />
                <span>React</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <Layout size={14} className="text-blue-400" />
                <span>Next.js</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <Code size={14} className="text-blue-400" />
                <span>TypeScript</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <Server size={14} className="text-blue-400" />
                <span>Node.js</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <Database size={14} className="text-blue-400" />
                <span>MongoDB</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <Globe size={14} className="text-blue-400" />
                <span>AWS</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-200 border border-gray-700 text-sm">
                <Shield size={14} className="text-blue-400" />
                <span>Security</span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-gray-400 font-mono pl-8">]</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 font-mono">{"}"}</div>
        </div>
      </div>
      
      {/* Portfolio URL */}
      <div className="absolute bottom-4 right-8 font-mono text-sm">
        <span className="text-gray-500">// portfolio: </span>
        <span className="text-green-400">harshal-singh.vercel.app</span>
      </div>
    </div>
  );
};

export default LinkedInBanner;
