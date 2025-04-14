import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const Blogs = () => {
  return (
    <section id="blogs" className="pt-28 sm:pt-36 pb-24 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-no-repeat bg-cover opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900"></div>

      <div className="container-custom relative z-10">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-4">
            My Blogs
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Insights, tutorials, and thoughts on web development, programming,
            and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="project-card group h-full flex flex-col"
            >
              <div className="h-52 overflow-hidden rounded-lg mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="px-1 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-violet-400 text-sm font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="flex items-center text-violet-400 hover:text-white transition-colors"
                  >
                    <span className="mr-1">Read More</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
