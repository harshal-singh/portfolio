import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const cardBase =
  "bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 group";

const Blogs = () => {
  const [featured, ...rest] = blogPosts.slice(0, 3);

  return (
    <section id="blogs" className="py-28 relative bg-[#060606] overflow-hidden">
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[500px] h-[500px] bg-indigo-600/[0.08] -left-40 bottom-0" />
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 before:content-[''] before:w-6 before:h-px before:bg-violet-400">
              Blog
            </span>
            <h2 className="font-bold leading-tight tracking-tight text-4xl md:text-5xl text-white">
              Latest{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                articles
              </span>
            </h2>
          </div>
          <a
            href="/blogs"
            className="self-start md:self-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-white/10 text-white/80 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-[0.98]"
          >
            <BookOpen size={16} />
            All Articles
          </a>
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured */}
          <article className={`${cardBase} md:col-span-2 lg:col-span-1 flex flex-col`}>
            <div className="h-56 overflow-hidden relative flex-shrink-0">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-violet-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                {featured.category}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-white/30 text-xs mb-3">
                <span className="flex items-center gap-1"><Calendar size={11} />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 leading-snug line-clamp-2">
                {featured.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                {featured.excerpt}
              </p>
              <a
                href={`/blogs/${featured.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors mt-auto"
              >
                Read Article <ArrowRight size={14} />
              </a>
            </div>
          </article>

          {/* Side list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((post) => (
              <article key={post.slug} className={`${cardBase} flex gap-5 p-5 items-start`}>
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-violet-400 text-xs font-semibold">{post.category}</span>
                    <span className="text-white/20 text-xs">{post.date}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-xs line-clamp-2 mb-3">{post.excerpt}</p>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    Read More <ArrowRight size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
