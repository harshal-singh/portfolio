"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BlogPostForm, createEmptyPost } from "@/components/admin/blog/BlogPostForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { saveContent } from "@/lib/admin/client";
import type { BlogPost } from "@/lib/types";
import { ExternalLink } from "lucide-react";

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = decodeURIComponent(params.slug as string);
  const { content, refresh } = useAdmin();

  const existing = useMemo(
    () => content.allBlogPosts.find((p) => p.slug === slugParam),
    [content.allBlogPosts, slugParam]
  );

  const [post, setPost] = useState<BlogPost>(
    () => existing ?? createEmptyPost()
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const found = content.allBlogPosts.find((p) => p.slug === slugParam);
    if (found) setPost({ ...found });
  }, [slugParam]);

  if (!existing) {
    return (
      <AdminShell title="Post not found">
        <p className="text-sm text-zinc-500 mb-4">No post with slug &quot;{slugParam}&quot;.</p>
        <Link
          href="/admin/blog/posts"
          className="inline-flex items-center justify-center rounded-md font-medium h-9 px-3 text-xs border border-white/15 text-zinc-200 hover:border-white/30 hover:bg-white/[0.03]"
        >
          Back to all posts
        </Link>
      </AdminShell>
    );
  }

  async function handleSave() {
    if (!post.slug.trim() || !post.title.trim()) {
      toast.error("Slug and title are required");
      return;
    }
    const slugTaken = content.allBlogPosts.some(
      (p) => p.slug === post.slug && p.slug !== slugParam
    );
    if (slugTaken) {
      toast.error("Another post already uses this slug");
      return;
    }
    setSaving(true);
    try {
      const posts = content.allBlogPosts.map((p) => (p.slug === slugParam ? post : p));
      await saveContent("blog", { posts, categories: content.blogCategories });
      toast.success("Post saved");
      await refresh();
      if (post.slug !== slugParam) {
        router.replace(`/admin/blog/${encodeURIComponent(post.slug)}`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title={post.title}
      description={`Editing /blog/${post.slug}`}
    >
      <div className="mb-6">
        <Link
          href={`/blog/${encodeURIComponent(post.slug)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-xs text-accent inline-flex items-center gap-1 hover:underline"
        >
          {post.published ? "View live post" : "Preview on site (draft banner)"}{" "}
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
      <BlogPostForm post={post} onChange={setPost} />
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
