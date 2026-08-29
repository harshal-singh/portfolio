"use client";

import { AdminField } from "@/components/admin/AdminField";
import { BlogCoverMedia } from "@/components/blog/BlogCoverMedia";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blocksToEditorLines } from "@/lib/ai/parseGeminiJson";
import {
  blogDateToInputValue,
  formatBlogDate,
  inputValueToBlogDate,
} from "@/lib/blog/date";
import {
  BLOG_COVER_IDS,
  BLOG_COVER_LABELS,
  normalizeBlogCover,
  type BlogCoverId,
} from "@/lib/blog/covers";
import { gradientMap } from "@/lib/seed";
import type { BlogPost } from "@/lib/types";

export function BlogPostForm({
  post,
  onChange,
}: {
  post: BlogPost;
  onChange: (post: BlogPost) => void;
}) {
  function update(patch: Partial<BlogPost>) {
    onChange({ ...post, ...patch });
  }

  return (
    <div className="space-y-4">
      <AdminField label="Slug (URL)">
        <Input value={post.slug} onChange={(e) => update({ slug: e.target.value })} />
      </AdminField>
      <AdminField label="Title">
        <Input value={post.title} onChange={(e) => update({ title: e.target.value })} />
      </AdminField>
      <AdminField label="Excerpt">
        <Textarea value={post.excerpt} onChange={(e) => update({ excerpt: e.target.value })} rows={2} />
      </AdminField>
      <div className="grid md:grid-cols-3 gap-3">
        <AdminField label="Category">
          <Input value={post.category} onChange={(e) => update({ category: e.target.value })} />
        </AdminField>
        <AdminField label="Date">
          <Input
            type="date"
            value={blogDateToInputValue(post.date)}
            onChange={(e) => update({ date: inputValueToBlogDate(e.target.value) })}
            className="scheme-dark"
          />
        </AdminField>
        <AdminField label="Read time">
          <Input value={post.readTime} onChange={(e) => update({ readTime: e.target.value })} />
        </AdminField>
      </div>
      <AdminField label="Cover gradient">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {BLOG_COVER_IDS.map((id) => {
            const selected = normalizeBlogCover(post.cover) === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => update({ cover: id })}
                className={`rounded-lg border p-2 text-left transition-colors ${
                  selected
                    ? "border-accent ring-1 ring-accent/40"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <div
                  className={`h-10 rounded-md bg-gradient-to-br mb-1.5 ${gradientMap[id]}`}
                />
                <span className="mono text-[9px] text-zinc-500 block truncate">
                  {BLOG_COVER_LABELS[id as BlogCoverId]}
                </span>
              </button>
            );
          })}
        </div>
      </AdminField>
      <AdminField label="Cover image (public folder, optional)">
        <Input
          value={post.imageUrl ?? ""}
          onChange={(e) => update({ imageUrl: e.target.value })}
          placeholder="/images/blog/nextjs-page-load-cover.png"
        />
        <p className="text-xs text-zinc-500 mt-1.5">
          Overrides the gradient when set. File in{" "}
          <code className="text-zinc-400">public/images/blog/</code> →{" "}
          <code className="text-zinc-400">/images/blog/your-cover.png</code>
        </p>
        {post.imageUrl?.trim() ? (
          <div className="mt-3 relative aspect-video overflow-hidden rounded-lg border border-white/10">
            <BlogCoverMedia post={post} showCategoryWatermark={false} />
          </div>
        ) : null}
      </AdminField>
      <AdminField label="Tags (comma-separated)">
        <Input
          value={post.tags.join(", ")}
          onChange={(e) =>
            update({
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
        />
      </AdminField>
      <Checkbox
        label="Published (visible on site)"
        checked={post.published}
        onChange={(e) => update({ published: e.target.checked })}
      />
      <Checkbox
        label="Featured on homepage"
        checked={post.featured}
        onChange={(e) => update({ featured: e.target.checked })}
      />
      <AdminField
        label={`Content blocks (${post.content.length} blocks — type|text per line)`}
      >
        <Textarea
          value={blocksToEditorLines(post.content)}
          onChange={(e) => {
            const content = e.target.value
              .split("\n")
              .filter(Boolean)
              .map((line) => {
                const idx = line.indexOf("|");
                const type = idx === -1 ? "p" : line.slice(0, idx);
                const text = (idx === -1 ? line : line.slice(idx + 1)).replace(/\\n/g, "\n");
                return { type, text };
              });
            update({ content });
          }}
          rows={14}
          className="mono text-xs"
        />
      </AdminField>
    </div>
  );
}

export function createEmptyPost(overrides?: Partial<BlogPost>): BlogPost {
  return {
    slug: `new-post-${Date.now()}`,
    title: "New post",
    excerpt: "",
    category: "Engineering",
    readTime: "5 min read",
    date: formatBlogDate(new Date()),
    cover: "gradient-1",
    imageUrl: "",
    tags: [],
    published: false,
    featured: false,
    content: [{ type: "p", text: "" }],
    ...overrides,
  };
}
