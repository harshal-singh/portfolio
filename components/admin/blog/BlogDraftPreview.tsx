"use client";

import { BlogContentBlocks } from "@/components/blog/BlogContentBlocks";
import { blocksToEditorLines } from "@/lib/ai/parseGeminiJson";
import type { GeneratedBlogPost } from "@/lib/ai/gemini";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function BlogDraftPreview({
  draft,
  defaultOpen = false,
}: {
  draft: GeneratedBlogPost;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const blockCount = draft.content?.length ?? 0;

  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.03] transition-colors"
      >
        <div>
          <p className="mono text-[10px] uppercase tracking-wider text-accent">
            Full draft preview · admin only
          </p>
          <p className="text-sm text-zinc-400 mt-0.5">
            {blockCount} blocks · {draft.readTime} · {draft.category}
          </p>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
        )}
      </button>

      {open ? (
        <div className="px-4 pb-4 border-t border-white/5 pt-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-zinc-400 text-sm italic border-l-2 border-accent/40 pl-4">
            {draft.excerpt}
          </p>
          <BlogContentBlocks blocks={draft.content} compact />
          <details className="rounded-md border border-white/5 bg-black/20">
            <summary className="cursor-pointer px-3 py-2 mono text-[10px] text-zinc-500 uppercase tracking-wider">
              Raw content blocks (editor format)
            </summary>
            <pre className="px-3 pb-3 mono text-[11px] text-zinc-500 whitespace-pre-wrap break-all">
              {blocksToEditorLines(draft.content)}
            </pre>
          </details>
        </div>
      ) : null}
    </div>
  );
}
