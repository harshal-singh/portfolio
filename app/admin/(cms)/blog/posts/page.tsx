"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { saveContent } from "@/lib/admin/client";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function BlogPostsListPage() {
  const { content, refresh } = useAdmin();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const posts = content.allBlogPosts.filter((p) => p.slug !== slug);
      await saveContent("blog", { posts, categories: content.blogCategories });
      toast.success("Post deleted");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  const sorted = [...content.allBlogPosts].sort((a, b) => {
    if (a.published !== b.published) return a.published ? -1 : 1;
    return b.date.localeCompare(a.date);
  });

  return (
    <AdminShell
      title="All blog posts"
      description="Click a post to preview it exactly as on the live site. Drafts show a publish banner."
    >
      <div className="space-y-4">
        <div className="flex justify-end">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center rounded-md font-medium h-9 px-3 text-xs bg-accent text-background hover:bg-accent-hover"
          >
            <Plus className="w-4 h-4 mr-2" /> New post
          </Link>
        </div>

        {sorted.length === 0 ? (
          <p className="text-sm text-zinc-500 py-8 text-center">
            No posts yet.{" "}
            <Link
              href="/admin/blog/new"
              className="text-accent hover:underline"
            >
              Create one
            </Link>{" "}
            or use{" "}
            <Link href="/admin/blog/ai" className="text-accent hover:underline">
              AI ideas
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {sorted.map((post) => (
              <li key={post.slug} className="py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <h3 className="text-zinc-100 font-medium group-hover:text-accent transition-colors truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 mono truncate">
                      /blog/{post.slug}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`mono text-[10px] px-2 py-0.5 rounded border ${
                          post.published
                            ? "border-emerald-500/30 text-emerald-400"
                            : "border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <span className="mono text-[10px] text-zinc-600">
                        {post.category}
                      </span>
                      <span className="mono text-[10px] text-zinc-600">
                        {post.date}
                      </span>
                      <span className="mono text-[10px] text-zinc-600">
                        {post.content.length} blocks
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/blog/${encodeURIComponent(post.slug)}`}
                    className="inline-flex items-center justify-center rounded-md font-medium h-9 px-3 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  >
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    disabled={deleting === post.slug}
                    onClick={() => handleDelete(post.slug)}
                  >
                    {deleting === post.slug ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
