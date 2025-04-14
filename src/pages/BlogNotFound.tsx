import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const BlogNotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent"></div>

      <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in">
        <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-6">
          Blog Not Found
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-white">Oops! </span>
          <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
            Blog not found
          </span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg mx-auto">
          The blog post you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center mb-12">
          <a href="/blogs">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 flex items-center gap-2">
              <Home size={18} />
              Return to Blogs
            </Button>
          </a>
        </div>
        <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 mx-auto blur-xl absolute left-1/2 transform -translate-x-1/2 -z-10"></div>
      </div>
    </div>
  );
};

export default BlogNotFound;
