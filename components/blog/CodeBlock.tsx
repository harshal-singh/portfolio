import { prepareCodeBlock } from "@/lib/blog/codeBlock";
import { highlightCode } from "@/lib/blog/highlight";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  source: string;
  compact?: boolean;
}

export function CodeBlock({ source, compact = false }: CodeBlockProps) {
  const { lang, label, code } = prepareCodeBlock(source);
  const html = highlightCode(code, lang);

  return (
    <div
      className={cn(
        "blog-code-block overflow-hidden rounded-xl border border-border bg-surface-code",
        compact ? "text-xs" : "text-sm",
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface-elevated/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="ml-auto mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
      </div>
      <pre
        className={cn(
          "blog-code-pre overflow-x-auto",
          compact ? "p-3" : "p-4 md:p-5 max-w-[calc(100vw-48px)]",
        )}
      >
        <code
          className="hljs block leading-relaxed whitespace-pre"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}
