"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BlogPostForm, createEmptyPost } from "@/components/admin/blog/BlogPostForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { saveContent } from "@/lib/admin/client";
import type { BlogPost } from "@/lib/types";

export default function NewBlogPostPage() {
  const router = useRouter();
  const { content, refresh } = useAdmin();
  const [post, setPost] = useState<BlogPost>(() => createEmptyPost());
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!post.slug.trim() || !post.title.trim()) {
      toast.error("Slug and title are required");
      return;
    }
    if (content.allBlogPosts.some((p) => p.slug === post.slug)) {
      toast.error("A post with this slug already exists");
      return;
    }
    setSaving(true);
    try {
      await saveContent("blog", {
        posts: [post, ...content.allBlogPosts],
        categories: content.blogCategories,
      });
      toast.success("Post created");
      await refresh();
      router.push(`/admin/blog/${encodeURIComponent(post.slug)}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="New blog post" description="Create a draft. It stays hidden until you publish.">
      <BlogPostForm post={post} onChange={setPost} />
      <SaveBar onSave={handleSave} saving={saving} label="Create post" />
    </AdminShell>
  );
}
