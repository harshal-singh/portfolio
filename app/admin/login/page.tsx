import { GoogleSignInForm } from "@/components/admin/GoogleSignInForm";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span className="heading text-[14rem] md:text-[22rem] font-bold text-foreground/3 select-none">
          HARSHAL SINGH<span className="text-accent/10">.</span>
        </span>
      </div>

      <div className="relative z-10 w-full max-w-xs">
        <h1 className="text-center heading text-3xl text-foreground mb-2">
          Admin sign-in
        </h1>
        <p className="text-center text-sm text-muted mb-8 leading-relaxed">
          Sign in to manage portfolio content.
        </p>
        <GoogleSignInForm initialError={error} />
      </div>
    </div>
  );
}
