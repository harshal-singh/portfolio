import type { BlogBlock } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/blog/CodeBlock";

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
    <div className={compact ? "space-y-4" : "max-w-none space-y-6"}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              id={withHeadingIds ? idFor(block.text) : undefined}
              className={cn(
                "heading text-foreground",
                compact
                  ? "text-lg mt-6 mb-1"
                  : "text-2xl md:text-3xl mt-12 mb-2 scroll-mt-24",
              )}
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
              className={cn(
                "heading text-foreground",
                compact
                  ? "text-base mt-4 mb-1"
                  : "text-xl md:text-2xl mt-8 mb-2 scroll-mt-24",
              )}
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
              className={cn(
                "list-disc pl-6 space-y-2 text-muted",
                compact ? "text-sm" : "text-[17px] leading-[1.8]",
              )}
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
              className={cn(
                "border-l-2 border-accent/50 pl-5 text-muted italic",
                compact ? "text-sm" : "text-[17px] leading-[1.8]",
              )}
            >
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "code") {
          return <CodeBlock key={i} source={block.text} compact={compact} />;
        }
        return (
          <p
            key={i}
            className={cn(
              "text-muted leading-[1.8]",
              compact ? "text-sm" : "text-[17px]",
            )}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
