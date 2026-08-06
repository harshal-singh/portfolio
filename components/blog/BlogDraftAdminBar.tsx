"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Rocket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function BlogDraftAdminBar({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);

  async function handlePublish() {
    setPublishing(true);
    try {
      const res = await fetch("/api/admin/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Publish failed");
      toast.success("Published — live on your site");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="sticky top-0 z-50 border-b border-amber-500/25 bg-amber-500/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div>
          <p className="text-sm text-amber-100/80 mt-0.5">
            This draft is not public yet. This is exactly how it will look when
            published.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button size="sm" onClick={handlePublish} disabled={publishing}>
            {publishing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Rocket className="w-4 h-4 mr-2" />
            )}
            Publish
          </Button>
          <Link
            href={`/admin/blog/${encodeURIComponent(slug)}`}
            className="inline-flex items-center justify-center rounded-md font-medium h-9 px-3 text-xs border border-white/15 text-zinc-200 hover:border-white/30 hover:bg-white/[0.03]"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
