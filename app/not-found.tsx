import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-4xl mx-auto mt-24 px-6 py-20 text-center hero-stagger">
        <p className="hero-stagger-item text-label text-accent mb-4">404</p>
        <h1 className="hero-stagger-item text-display text-foreground mb-6 font-semibold leading-tight">
          Page not found.
        </h1>
        <p className="hero-stagger-item text-muted mb-12 max-w-md mx-auto text-body-lg">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="hero-stagger-item inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
