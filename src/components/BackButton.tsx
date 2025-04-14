import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show back button on home page
  if (location.pathname === "/") return null;

  const getBackPath = () => {
    // If we're on a blog post, go back to blogs
    if (location.pathname.startsWith("/blogs/")) {
      return "/blogs";
    }
    // For other pages, go back to home
    return "/";
  };

  return (
    <button
      onClick={() => navigate(getBackPath())}
      className="inline-flex items-center text-white hover:text-violet-400 transition-colors bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800/50"
    >
      <ArrowLeft size={16} className="mr-2" />
      <span className="text-sm">Back</span>
    </button>
  );
};

export default BackButton;
