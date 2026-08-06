"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SetupErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="mono text-xs uppercase tracking-widest text-accent mb-3">Setup required</p>
      <h1 className="heading text-3xl text-zinc-100 mb-4">Google Sheet could not be created</h1>
      <p className="text-zinc-400 leading-relaxed mb-6">
        Enable the <strong className="text-zinc-200">Google Drive API</strong> and{" "}
        <strong className="text-zinc-200">Google Sheets API</strong> in your Google Cloud project,
        wait 1–2 minutes, then retry.
      </p>
      <div className="flex gap-3">
        <Button onClick={onRetry}>Retry setup</Button>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
