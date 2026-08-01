"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const OAUTH_ERRORS: Record<string, string> = {
  AccessDenied: "Access denied. Only harshal8828984985@gmail.com can sign in.",
  Configuration: "Sign-in is misconfigured on the server.",
  Default: "Sign-in failed. Please try again.",
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.84Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.12A11.998 11.998 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.61H1.27a12 12 0 0 0 0 10.78l4-3.12Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.12C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export function GoogleSignInForm({ initialError }: { initialError?: string }) {
  const [pending, setPending] = useState(false);
  const errorMessage = initialError
    ? (OAUTH_ERRORS[initialError] ?? OAUTH_ERRORS.Default)
    : null;

  async function handleSignIn() {
    setPending(true);
    try {
      await signIn("google", { callbackUrl: "/admin" });
    } catch {
      setPending(false);
    }
  }

  return (
    <>
      {errorMessage ? (
        <p
          className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="button"
        disabled={pending}
        onClick={handleSignIn}
        className="relative cursor-pointer inline-flex w-full items-center justify-center gap-3 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-60"
      >
        <GoogleIcon />
        {pending ? "Signing in…" : "Sign in with Google"}
      </button>
    </>
  );
}
