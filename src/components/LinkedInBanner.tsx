import { Code, Laptop, Rocket, Star, Sparkles, Zap, ArrowRight, Database, Server, Globe, Layout, FileCode, Shield, Award, Lightbulb, Gem, MessageSquare, BrainCircuit, CircleUser, BadgeCheck, Layers, Heart, Wifi } from "lucide-react";

type LinkedInBannerProps = {
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
};

const LinkedInBanner = ({ variant = 1 }: LinkedInBannerProps) => {
  switch (variant) {
    case 1:
      return <GradientSpaceVariant />;
    case 2:
      return <GeometricPatternVariant />;
    case 3:
      return <MinimalCodeVariant />;
    case 4:
      return <ModernGradientVariant />;
    case 5:
      return <TechCircuitVariant />;
    case 6:
      return <GlassmorphismVariant />;
    default:
      return <GradientSpaceVariant />;
  }
};

// Variant 1: Space Theme with Gradient Overlay
const GradientSpaceVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-violet-950/70"></div>
      
      <div className="absolute inset-0">
        <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-3xl top-20 right-[30%]"></div>
        <div className="absolute h-[250px] w-[250px] rounded-full bg-violet-600/10 blur-3xl -bottom-20 right-[10%]"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-end pr-16 z-10">
        <div className="max-w-[900px] ml-[400px]">
          <div>
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
      
      <div className="absolute bottom-8 right-10 text-gray-400 text-sm bg-gray-800/30 px-4 py-1 rounded-full backdrop-blur-sm border border-gray-700/30">
        <span className="text-violet-400 mr-1"><ArrowRight size={14} className="inline" /></span> harshal-singh.vercel.app
      </div>
      
      <div className="absolute bottom-8 right-[280px] h-px w-32 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0"></div>
    </div>
  );
};

// Variant 2: Geometric Pattern Design
const GeometricPatternVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      <div className="absolute inset-0 bg-indigo-950"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[400px] w-48 h-48 bg-violet-500/10 rotate-45 transform -translate-y-20"></div>
        <div className="absolute bottom-0 right-[400px] w-64 h-64 bg-indigo-500/10 rotate-12 transform translate-y-20"></div>
        <div className="absolute top-[50%] right-[30%] w-32 h-32 bg-purple-500/10 rotate-45"></div>
        <div className="absolute top-[30%] right-[60%] w-16 h-16 bg-pink-500/20 rotate-12"></div>
        <div className="absolute bottom-[40%] right-[20%] w-24 h-24 bg-blue-500/10 rotate-45"></div>
        
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
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
          
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">React</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">Next.js</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">TypeScript</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">Node.js</div>
            <div className="px-3 py-1 rounded-md bg-indigo-900/50 text-indigo-200 text-sm border border-indigo-700/40">AWS</div>
          </div>
        </div>
      </div>
      
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
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 40 L40 20 L60 40 L80 20' stroke='%238b5cf6' stroke-width='0.5' fill='none'/%3E%3Cpath d='M20 60 L40 80 L60 60 L80 80' stroke='%238b5cf6' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
      
      <div className="absolute top-[40%] right-0 h-px w-full bg-gray-800"></div>
      <div className="absolute top-[60%] right-0 h-px w-full bg-gray-800"></div>
      <div className="absolute top-0 right-[400px] w-px h-full bg-gray-800"></div>
      <div className="absolute top-0 right-[800px] w-px h-full bg-gray-800"></div>
      
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
      
      <div className="absolute bottom-4 right-8 font-mono text-sm">
        <span className="text-gray-500">// portfolio: </span>
        <span className="text-green-400">harshal-singh.vercel.app</span>
      </div>
    </div>
  );
};

// Variant 4: Modern Gradient
const ModernGradientVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-800 to-indigo-700"></div>
      
      <div className="absolute inset-0">
        <div className="absolute rounded-full h-64 w-64 bg-indigo-500/10 blur-3xl right-[40%] top-10"></div>
        <div className="absolute rounded-full h-80 w-80 bg-purple-500/20 blur-3xl right-64 -bottom-20"></div>
        <div className="absolute rounded-full h-40 w-40 bg-blue-500/10 blur-3xl right-1/4 top-1/4"></div>
        
        <div className="absolute h-2 w-2 rounded-full bg-indigo-400 right-[30%] top-[40%]"></div>
        <div className="absolute h-3 w-3 rounded-full bg-purple-400 right-[40%] top-[30%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-indigo-400 right-[35%] top-[60%]"></div>
        <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-400 right-[25%] top-[20%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-indigo-400 right-[20%] top-[70%]"></div>
      </div>
      
      <div className="absolute inset-0 flex justify-end items-center z-10">
        <div className="w-[900px] pr-16 ml-[350px]">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 text-sm font-medium bg-indigo-500/30 text-white rounded-full mb-4 backdrop-blur-sm">
              Full Stack Developer
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-4">
              Harshal Singh
            </h1>
            
            <p className="text-xl text-indigo-100 mb-6 max-w-[550px]">
              Building digital experiences with 
              <span className="bg-gradient-to-r from-pink-400 to-indigo-300 bg-clip-text text-transparent font-semibold"> 
                innovation and precision
              </span>
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white font-medium flex items-center gap-2">
                <Layout size={18} className="text-indigo-300" />
                <span>Frontend Dev</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white font-medium flex items-center gap-2">
                <Server size={18} className="text-indigo-300" />
                <span>Backend Dev</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white font-medium flex items-center gap-2">
                <Database size={18} className="text-indigo-300" />
                <span>Cloud Architect</span>
              </div>
            </div>
          </div>
          
          <div className="h-px w-32 bg-gradient-to-r from-purple-500 to-indigo-500 mb-4"></div>
          
          <div className="text-indigo-200 font-medium">
            harshal-singh.vercel.app
          </div>
        </div>
      </div>
    </div>
  );
};

// Variant 5: Tech Circuit Theme
const TechCircuitVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden bg-gray-950">
      <div className="absolute inset-0" style={{ 
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        backgroundSize: "cover",
        opacity: 0.9
      }}></div>
      
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 1584 396" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M600 50 L800 50 L800 150 L1000 150 L1000 250 L1200 250" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M650 100 L900 100 L900 200 L1100 200 L1100 300" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M700 150 L950 150 L950 250 L1150 250" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M750 200 L1000 200" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M800 120 L1000 120 L1000 220 L1200 220" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.3" />
          
          <circle cx="800" cy="50" r="4" fill="#3b82f6" fillOpacity="0.6" />
          <circle cx="1000" cy="150" r="4" fill="#3b82f6" fillOpacity="0.6" />
          <circle cx="1200" cy="250" r="4" fill="#3b82f6" fillOpacity="0.6" />
          <circle cx="900" cy="100" r="4" fill="#8b5cf6" fillOpacity="0.6" />
          <circle cx="1100" cy="200" r="4" fill="#8b5cf6" fillOpacity="0.6" />
          <circle cx="950" cy="150" r="4" fill="#6366f1" fillOpacity="0.6" />
          <circle cx="1150" cy="250" r="4" fill="#6366f1" fillOpacity="0.6" />
          <circle cx="1000" cy="200" r="4" fill="#a855f7" fillOpacity="0.6" />
          <circle cx="1000" cy="120" r="4" fill="#3b82f6" fillOpacity="0.6" />
          <circle cx="1200" cy="220" r="4" fill="#3b82f6" fillOpacity="0.6" />
        </svg>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-end z-10">
        <div className="max-w-[850px] pr-16 ml-[400px]">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit size={32} className="text-blue-400" />
              <div className="text-lg text-blue-300 font-semibold tracking-wider">DEVELOPER | ARCHITECT | INNOVATOR</div>
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-6">
              Harshal Singh
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-[600px]">
              <div className="bg-white/5 border border-blue-900/40 rounded-lg p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Gem className="text-blue-400" size={20} />
                </div>
                <div className="text-white font-medium">Creative Solutions</div>
              </div>
              <div className="bg-white/5 border border-purple-900/40 rounded-lg p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Layers className="text-purple-400" size={20} />
                </div>
                <div className="text-white font-medium">Full Stack Expert</div>
              </div>
              <div className="bg-white/5 border border-indigo-900/40 rounded-lg p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Rocket className="text-indigo-400" size={20} />
                </div>
                <div className="text-white font-medium">Performance Driven</div>
              </div>
              <div className="bg-white/5 border border-blue-900/40 rounded-lg p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Badge className="text-blue-400" size={20} />
                </div>
                <div className="text-white font-medium">Quality Focused</div>
              </div>
            </div>
            
            <div className="text-blue-300 font-medium">
              harshal-singh.vercel.app
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Variant 6: Glassmorphism Design
const GlassmorphismVariant = () => {
  return (
    <div className="relative w-[1584px] h-[396px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-700"></div>
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-pink-600/20 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl translate-y-1/2"></div>
      
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(255, 255, 255, 0.1) 2px, transparent 0)',
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="absolute inset-0 flex items-center justify-end z-10">
        <div className="ml-[350px] max-w-[900px] pr-16">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-6 w-[600px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                <CircleUser className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white">
                  Harshal Singh
                </h1>
                <div className="text-white/80 text-lg mt-1">Full Stack Developer</div>
              </div>
            </div>
            
            <div className="h-px w-full bg-white/20 my-4"></div>
            
            <p className="text-white/90 text-lg mb-4">
              Transforming ideas into elegant, functional digital solutions
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">React</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">Next.js</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">TypeScript</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">Node.js</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">AWS</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-pink-500/30 flex items-center justify-center">
                <Heart className="text-pink-200" size={16} />
              </div>
              <div className="text-white font-medium">Passionate</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                <Lightbulb className="text-blue-200" size={16} />
              </div>
              <div className="text-white font-medium">Innovative</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-500/30 flex items-center justify-center">
                <BadgeCheck className="text-purple-200" size={16} />
              </div>
              <div className="text-white font-medium">Reliable</div>
            </div>
          </div>
          
          <div className="mt-6 text-white/70 text-sm">
            harshal-singh.vercel.app
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInBanner;
