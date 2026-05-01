import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 py-20 text-center rise-in">
        <p className="mono text-sm uppercase tracking-widest text-accent mb-4">
          404
        </p>
        <h1 className="heading text-5xl md:text-7xl text-zinc-100 mb-6 font-semibold leading-tight">
          Page not found.
        </h1>
        <p className="text-zinc-400 mb-12 max-w-md mx-auto text-lg leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to another universe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
