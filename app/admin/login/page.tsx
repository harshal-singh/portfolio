import { GoogleSignInForm } from "@/components/admin/GoogleSignInForm";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs">
        <div className="max-h-screen overflow-hidden absolute inset-0 flex items-center justify-center">
          <span className="heading text-[14rem] md:text-[22rem] font-bold text-white/2 select-none">
            HARSHAL SINGH<span className="text-accent/4">.</span>
          </span>
        </div>
        <h1 className="text-center heading text-3xl text-zinc-100 mb-2">
          Admin sign-in
        </h1>
        <p className="text-center text-sm text-zinc-500 mb-8 leading-relaxed">
          Sign in to manage portfolio content.
        </p>
        <GoogleSignInForm initialError={error} />
      </div>
    </div>
  );
}
