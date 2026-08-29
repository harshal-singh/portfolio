"use client";

import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import {
  COMMAND_GROUPS,
  filterCommandItems,
  type CommandItem,
} from "@/lib/search/commandItems";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  FileText,
  FolderOpen,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const GROUP_ICONS = {
  Pages: FolderOpen,
  Blog: FileText,
  Projects: Sparkles,
  Actions: Zap,
} as const;

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  email: string;
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  email,
}: CommandPaletteProps) {
  const router = useRouter();
  const { copy } = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(
    () => filterCommandItems(items, query),
    [items, query],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const group of COMMAND_GROUPS) map.set(group, []);
    for (const item of filtered) {
      map.get(item.group)?.push(item);
    }
    return COMMAND_GROUPS.map((group) => ({
      group,
      items: map.get(group) ?? [],
    })).filter((entry) => entry.items.length > 0);
  }, [filtered]);

  const flatItems = useMemo(
    () => grouped.flatMap((entry) => entry.items),
    [grouped],
  );

  const runItem = useCallback(
    async (item: CommandItem) => {
      onOpenChange(false);
      if (item.action === "copy-email") {
        await copy(email, "Email copied to clipboard");
        return;
      }
      if (item.href) router.push(item.href);
    },
    [copy, email, onOpenChange, router],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(flatItems.length, 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) =>
          i === 0 ? Math.max(flatItems.length - 1, 0) : i - 1,
        );
      }
      if (e.key === "Enter" && flatItems[activeIndex]) {
        e.preventDefault();
        void runItem(flatItems[activeIndex]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, flatItems, activeIndex, onOpenChange, runItem]);

  if (!open) return null;

  let itemCounter = -1;

  return (
    <div className="fixed inset-0 z-[100] print:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close command palette"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative mx-auto mt-[12vh] w-full max-w-lg px-4"
      >
        <div className="rounded-xl border border-border bg-surface shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 pt-1 px-4 border-b border-border-subtle">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, posts, projects…"
              className="flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
            />
            <kbd className="mono hidden sm:inline text-[10px] text-muted border border-border rounded px-1.5 py-0.5">
              esc
            </kbd>
          </div>

          <div className="max-h-[min(50vh,360px)] overflow-y-auto p-2">
            {flatItems.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              grouped.map(({ group, items: groupItems }) => {
                const Icon = GROUP_ICONS[group];
                return (
                  <div key={group} className="mb-2 last:mb-0">
                    <p className="mono text-[10px] uppercase tracking-wider text-muted px-3 py-2">
                      {group}
                    </p>
                    <ul>
                      {groupItems.map((item) => {
                        itemCounter += 1;
                        const index = itemCounter;
                        const active = index === activeIndex;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => runItem(item)}
                              onMouseEnter={() => setActiveIndex(index)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                                active
                                  ? "bg-accent-muted text-foreground"
                                  : "text-muted hover:bg-surface-elevated",
                              )}
                            >
                              <Icon className="w-4 h-4 shrink-0 text-accent" />
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm truncate">
                                  {item.label}
                                </span>
                                {item.description ? (
                                  <span className="block text-xs text-muted truncate mt-0.5">
                                    {item.description}
                                  </span>
                                ) : null}
                              </span>
                              {item.href ? (
                                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
