import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SiteNotFound() {
  return (
    <section className="flex min-h-[70vh] flex-1 items-center justify-center">
      <div className="mx-auto mt-24 max-w-4xl px-6 py-20 text-center">
        <p className="text-label mb-4">404</p>
        <h1 className="jk mb-6 text-[clamp(2.3rem,6vw,4rem)] font-extrabold leading-tight">
          Page not found.
        </h1>
        <p className="mx-auto mb-12 max-w-md text-lg text-muted">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="aurora-pill">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
