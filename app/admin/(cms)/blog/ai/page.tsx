"use client";

import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogDraftPreview } from "@/components/admin/blog/BlogDraftPreview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { saveContent } from "@/lib/admin/client";
import {
  buildBlogGenerationContext,
  ideaToBlogPost,
  type BlogIdea,
  type GeneratedBlogPost,
} from "@/lib/ai/gemini";
import {
  ExternalLink,
  Eye,
  Loader2,
  RefreshCw,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IdeaCard extends BlogIdea {
  draft?: GeneratedBlogPost;
  loading?: "draft" | "regenerate";
  previewOpen?: boolean;
}

export default function BlogAiPage() {
  const router = useRouter();
  const { content, refresh } = useAdmin();
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(3);
  const [withFullDrafts, setWithFullDrafts] = useState(false);
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [previewingSlug, setPreviewingSlug] = useState<string | null>(null);

  const blogContext = buildBlogGenerationContext(content);

  async function callAi(body: Record<string, unknown>) {
    const res = await fetch("/api/admin/ai/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        context: blogContext,
        excludeTitles: ideas.map((i) => i.title),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(data.error ?? data.hint ?? "AI request failed");
    return data;
  }

  async function handleGenerateIdeas() {
    setGenerating(true);
    setProgress(null);
    try {
      if (withFullDrafts) {
        setProgress("Generating ideas…");
        const data = await callAi({
          action: "ideas-with-drafts",
          count,
          topic: topic || undefined,
        });
        const items = data.items as Array<
          BlogIdea & { draft: GeneratedBlogPost }
        >;
        setIdeas(
          items.map((item) => ({
            ...item,
            draft: item.draft,
            previewOpen: true,
          })),
        );
        toast.success(
          `${items.length} full draft${items.length === 1 ? "" : "s"} ready — preview below`,
        );
      } else {
        const data = await callAi({
          action: "ideas",
          count,
          topic: topic || undefined,
        });
        setIdeas((data.ideas as BlogIdea[]).map((idea) => ({ ...idea })));
        toast.success(
          `Generated ${data.ideas.length} idea${data.ideas.length === 1 ? "" : "s"}`,
        );
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenerating(false);
      setProgress(null);
    }
  }

  async function handleDraft(index: number, regenerate = false) {
    const idea = ideas[index];
    setIdeas((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, loading: regenerate ? "regenerate" : "draft" }
          : item,
      ),
    );
    try {
      const data = await callAi({
        action: regenerate ? "regenerate" : "draft",
        idea: {
          title: idea.title,
          category: idea.category,
          excerpt: idea.excerpt,
        },
      });
      const draft = data.draft as GeneratedBlogPost;
      setIdeas((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, draft, loading: undefined, previewOpen: true }
            : item,
        ),
      );
      toast.success(regenerate ? "Draft regenerated" : "Full draft ready");
    } catch (e) {
      setIdeas((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, loading: undefined } : item,
        ),
      );
      toast.error(e instanceof Error ? e.message : "Draft failed");
    }
  }

  async function saveDraftPost(idea: IdeaCard): Promise<string> {
    if (!idea.draft) {
      throw new Error("Generate a draft first");
    }
    const post = ideaToBlogPost(idea, idea.draft);
    if (content.allBlogPosts.some((p) => p.slug === post.slug)) {
      post.slug = `${post.slug}-${Date.now()}`;
    }
    await saveContent("blog", {
      posts: [
        post,
        ...content.allBlogPosts.filter((p) => p.slug !== post.slug),
      ],
      categories: content.blogCategories,
    });
    await refresh();
    return post.slug;
  }

  async function handleSaveDraft(idea: IdeaCard, andEdit = false) {
    if (!idea.draft) {
      toast.error("Generate a draft first");
      return;
    }
    setSavingSlug(idea.draft.slug);
    try {
      const slug = await saveDraftPost(idea);
      toast.success("Saved as draft");
      if (andEdit) {
        router.push(`/admin/blog/${encodeURIComponent(slug)}`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSavingSlug(null);
    }
  }

  async function handlePreviewOnSite(idea: IdeaCard) {
    if (!idea.draft) {
      toast.error("Generate a draft first");
      return;
    }
    setPreviewingSlug(idea.draft.slug);
    try {
      const slug = await saveDraftPost(idea);
      window.open(
        `/blog/${encodeURIComponent(slug)}`,
        "_blank",
        "noopener,noreferrer",
      );
      toast.success("Draft saved — preview opened on /blog");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Preview failed");
    } finally {
      setPreviewingSlug(null);
    }
  }

  return (
    <AdminShell
      title="AI blog ideas"
      description="Generates fresh topics from your CMS — skips anything already published or saved as draft."
    >
      <div className="space-y-6">
        <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
          <AdminField label="Optional focus topic">
            <Input
              placeholder="e.g. caching, CI/CD — filtered through your skills & projects"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </AdminField>
          <AdminField label="Count">
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="h-10 w-full rounded-md border border-white/10 bg-background px-3 text-sm"
            >
              <option value={1}>1 post</option>
              <option value={2}>2 posts</option>
              <option value={3}>3 posts</option>
            </select>
          </AdminField>
          <Button onClick={handleGenerateIdeas} disabled={generating}>
            {generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {withFullDrafts ? "Generate full drafts" : "Generate ideas"}
          </Button>
        </div>

        <Checkbox
          label="Write full blog drafts immediately"
          description="Recommended — takes longer (~1 min per post) but you can preview the full article here."
          checked={withFullDrafts}
          onChange={(e) => setWithFullDrafts(e.target.checked)}
        />

        {progress ? (
          <p className="mono text-xs text-accent animate-pulse">{progress}</p>
        ) : null}

        {ideas.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-10">
            Generate full drafts to read and compare posts here before saving to
            your sheet.
          </p>
        ) : (
          <ul className="space-y-6">
            {ideas.map((idea, i) => (
              <li
                key={`${idea.slug}-${i}`}
                className="rounded-xl border border-white/8 p-5 space-y-4"
              >
                <div>
                  <h3 className="text-zinc-100 font-medium text-lg leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {idea.excerpt}
                  </p>
                  <p className="mono text-[10px] text-zinc-600 mt-3">
                    {idea.category} · {idea.tags.join(", ")}
                    {idea.draft
                      ? ` · ${idea.draft.content.length} blocks · ${idea.draft.readTime}`
                      : ""}
                  </p>
                </div>

                {idea.draft ? (
                  <BlogDraftPreview
                    draft={idea.draft}
                    defaultOpen={idea.previewOpen ?? false}
                  />
                ) : null}

                <div className="flex flex-wrap gap-2 pt-1">
                  {!idea.draft ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!!idea.loading || generating}
                      onClick={() => handleDraft(i, false)}
                    >
                      {idea.loading === "draft" ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Wand2 className="w-4 h-4 mr-2" />
                      )}
                      Write full draft
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={
                          previewingSlug !== null || savingSlug !== null
                        }
                        onClick={() => handlePreviewOnSite(idea)}
                      >
                        {previewingSlug === idea.draft.slug ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Eye className="w-4 h-4 mr-2" />
                        )}
                        Preview on site
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!!idea.loading || savingSlug !== null}
                        onClick={() => handleDraft(i, false)}
                      >
                        {idea.loading === "draft" ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4 mr-2" />
                        )}
                        Regenerate draft
                      </Button>
                      <Button
                        size="sm"
                        disabled={savingSlug !== null}
                        onClick={() => handleSaveDraft(idea, false)}
                      >
                        {savingSlug === idea.draft.slug ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Save as draft
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={savingSlug !== null}
                        onClick={() => handleSaveDraft(idea, true)}
                      >
                        Save & open editor
                      </Button>
                    </>
                  )}
                  {idea.draft && !idea.loading ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={!!idea.loading}
                      onClick={() => handleDraft(i, true)}
                    >
                      New angle
                    </Button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-zinc-600">
          Preview on site saves the draft and opens /blog/[slug] with the
          publish banner — same as All posts.{" "}
          <Link
            href="/admin/blog/posts"
            className="text-accent hover:underline inline-flex items-center gap-1"
          >
            All posts <ExternalLink className="w-3 h-3" />
          </Link>
        </p>
      </div>
    </AdminShell>
  );
}
