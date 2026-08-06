import type { BlogBlock } from "@/lib/types";

function parseCodeBlock(text: string): { lang?: string; code: string } {
  const match = text.match(/^(?:\/\/|#)\s*lang:\s*([\w-]+)\s*\n/);
  if (match) return { lang: match[1], code: text.slice(match[0].length) };
  return { code: text };
}

export function BlogContentBlocks({
  blocks,
  compact = false,
  withHeadingIds = false,
}: {
  blocks: BlogBlock[];
  compact?: boolean;
  withHeadingIds?: boolean;
}) {
  function idFor(text: string) {
    return `h-${text.replace(/\s/g, "-").toLowerCase()}`;
  }

  return (
    <div className={compact ? "space-y-4" : "prose prose-invert max-w-none space-y-6"}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              id={withHeadingIds ? idFor(block.text) : undefined}
              className={`heading text-zinc-100 ${compact ? "text-lg mt-6 mb-1" : "text-2xl md:text-3xl mt-12 mb-2 scroll-mt-24"}`}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              id={withHeadingIds ? idFor(block.text) : undefined}
              className={`heading text-zinc-100 ${compact ? "text-base mt-4 mb-1" : "text-xl md:text-2xl mt-8 mb-2 scroll-mt-24"}`}
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          const items = block.text
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <ul
              key={i}
              className={`list-disc pl-6 space-y-2 text-zinc-300 ${compact ? "text-sm" : "text-[17px] leading-[1.8]"}`}
            >
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "blockquote") {
          return (
            <blockquote
              key={i}
              className={`border-l-2 border-accent/50 pl-5 text-zinc-400 italic ${compact ? "text-sm" : "text-[17px] leading-[1.8]"}`}
            >
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "code") {
          const { lang, code } = parseCodeBlock(block.text);
          return (
            <div key={i}>
              {lang ? (
                <p className="mono text-[10px] uppercase tracking-wider text-zinc-600 mb-2">
                  {lang}
                </p>
              ) : null}
              <pre
                className={`bg-surface-code border border-white/10 rounded-lg overflow-x-auto ${compact ? "p-3" : "p-5 max-w-[calc(100vw-48px)]"}`}
              >
                <code
                  className={`mono text-zinc-300 leading-relaxed whitespace-pre ${compact ? "text-xs" : "text-sm"}`}
                >
                  {code}
                </code>
              </pre>
            </div>
          );
        }
        return (
          <p
            key={i}
            className={`text-zinc-300 leading-[1.8] ${compact ? "text-sm" : "text-[17px]"}`}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
