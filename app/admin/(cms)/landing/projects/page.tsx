"use client";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import { saveSectionHeaders } from "@/lib/admin/saveSectionHeaders";
import { blocksToEditorLines } from "@/lib/ai/parseGeminiJson";
import {
  BLOG_COVER_IDS,
  BLOG_COVER_LABELS,
  normalizeBlogCover,
  type BlogCoverId,
} from "@/lib/blog/covers";
import { gradientMap } from "@/lib/seed";
import type { Project, ProjectMetric } from "@/lib/types";
import { ExternalLink, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function emptyProject(): Project {
  return {
    id: crypto.randomUUID(),
    slug: "",
    name: "",
    tagline: "",
    description: "",
    overview: "",
    stack: [],
    year: "",
    role: "",
    link: "#",
    accent: "lime",
    cover: "gradient-1",
    featured: false,
    outcomes: [],
    metrics: [],
    content: [],
    imageUrl: "",
    imageScrollEnabled: false,
  };
}

function parseContentLines(value: string) {
  return value
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf("|");
      const type = idx === -1 ? "p" : line.slice(0, idx);
      const text = (idx === -1 ? line : line.slice(idx + 1)).replace(
        /\\n/g,
        "\n",
      );
      return { type, text };
    });
}

export default function ProjectsEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [projects, setProjects] = useState<Project[]>([...content.projects]);
  const [saving, setSaving] = useState(false);
  const sec = sections.projects;

  async function handleSave() {
    setSaving(true);
    try {
      await saveSectionHeaders({ projects: sections.projects });
      await saveContent("projects", projects);
      toast.success("Projects saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateProject(index: number, patch: Partial<Project>) {
    const next = [...projects];
    next[index] = { ...next[index], ...patch };
    setProjects(next);
  }

  function updateListField(
    index: number,
    field: "outcomes" | "stack",
    value: string,
  ) {
    updateProject(index, {
      [field]: value
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }

  function addMetric(index: number) {
    const p = projects[index];
    updateProject(index, {
      metrics: [
        ...p.metrics,
        { id: crypto.randomUUID(), value: "", label: "" },
      ],
    });
  }

  function updateMetric(pi: number, mi: number, patch: Partial<ProjectMetric>) {
    const p = projects[pi];
    const metrics = [...p.metrics];
    metrics[mi] = { ...metrics[mi], ...patch };
    updateProject(pi, { metrics });
  }

  function removeProject(index: number) {
    if (!confirm("Delete this project?")) return;
    setProjects(projects.filter((_, i) => i !== index));
  }

  function removeMetric(pi: number, mi: number) {
    const p = projects[pi];
    updateProject(pi, { metrics: p.metrics.filter((_, i) => i !== mi) });
  }

  return (
    <AdminShell
      title="Projects"
      description="Portfolio cards and case studies. Projects with content blocks get a /projects/[slug] page."
    >
      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input
            value={sec.label}
            onChange={(e) =>
              setSections({
                ...sections,
                projects: { ...sec, label: e.target.value },
              })
            }
          />
        </AdminField>
        <AdminField label="Title">
          <Input
            value={sec.title}
            onChange={(e) =>
              setSections({
                ...sections,
                projects: { ...sec, title: e.target.value },
              })
            }
          />
        </AdminField>
        <AdminField label="Description">
          <Textarea
            value={sec.description}
            onChange={(e) =>
              setSections({
                ...sections,
                projects: { ...sec, description: e.target.value },
              })
            }
            rows={2}
          />
        </AdminField>
      </div>

      {projects.map((p, pi) => (
        <div
          key={p.id}
          className="mb-8 p-5 rounded-xl border border-border space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="heading text-lg text-foreground">
              {p.name || "New project"}
            </h3>
            <div className="flex items-center gap-2">
              {p.slug ? (
                <a
                  href={p.content.length > 0 ? `/projects/${p.slug}` : p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-xs text-muted inline-flex items-center gap-1 hover:text-accent"
                >
                  Preview <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}
              <AdminDeleteButton
                label="Delete project"
                onClick={() => removeProject(pi)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <AdminField label="Name">
              <Input
                value={p.name}
                onChange={(e) => updateProject(pi, { name: e.target.value })}
              />
            </AdminField>
            <AdminField label="Slug (URL)">
              <Input
                value={p.slug}
                onChange={(e) => updateProject(pi, { slug: e.target.value })}
                placeholder={p.id}
              />
            </AdminField>
            <AdminField label="Year">
              <Input
                value={p.year}
                onChange={(e) => updateProject(pi, { year: e.target.value })}
              />
            </AdminField>
            <AdminField label="Role">
              <Input
                value={p.role}
                onChange={(e) => updateProject(pi, { role: e.target.value })}
              />
            </AdminField>
            <AdminField label="Tagline">
              <Input
                value={p.tagline}
                onChange={(e) => updateProject(pi, { tagline: e.target.value })}
              />
            </AdminField>
            <AdminField label="External link">
              <Input
                value={p.link}
                onChange={(e) => updateProject(pi, { link: e.target.value })}
              />
            </AdminField>
            <AdminField label="Screenshot (public folder)">
              <Input
                value={p.imageUrl ?? ""}
                onChange={(e) => updateProject(pi, { imageUrl: e.target.value })}
                placeholder="/images/projects/meetspace.jpg"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                File in <code className="text-zinc-400">public/images/projects/</code> →{" "}
                <code className="text-zinc-400">/images/projects/meetspace.jpg</code>
              </p>
            </AdminField>
            <div className="md:col-span-2 space-y-3 rounded-lg border border-border p-4">
              <Checkbox
                label="Scroll preview on hover (full-page screenshot)"
                checked={p.imageScrollEnabled ?? false}
                onChange={(e) =>
                  updateProject(pi, { imageScrollEnabled: e.target.checked })
                }
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <AdminField label="Scroll duration (seconds)">
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    disabled={!p.imageScrollEnabled}
                    placeholder="45"
                    value={
                      p.imageScrollDurationMs
                        ? String(p.imageScrollDurationMs / 1000)
                        : ""
                    }
                    onChange={(e) => {
                      const sec = Number(e.target.value);
                      updateProject(pi, {
                        imageScrollDurationMs:
                          Number.isFinite(sec) && sec > 0
                            ? Math.round(sec * 1000)
                            : undefined,
                      });
                    }}
                  />
                </AdminField>
                <AdminField label="Return to top (seconds)">
                  <Input
                    type="number"
                    min={0.1}
                    step={0.1}
                    disabled={!p.imageScrollEnabled}
                    placeholder="5"
                    value={
                      p.imageScrollReturnMs
                        ? String(p.imageScrollReturnMs / 1000)
                        : ""
                    }
                    onChange={(e) => {
                      const sec = Number(e.target.value);
                      updateProject(pi, {
                        imageScrollReturnMs:
                          Number.isFinite(sec) && sec > 0
                            ? Math.round(sec * 1000)
                            : undefined,
                      });
                    }}
                  />
                </AdminField>
              </div>
              <p className="text-xs text-zinc-500">
                Leave duration empty to use defaults (45s scroll, 5s return). Only
                applies when a screenshot is set.
              </p>
            </div>
          </div>

          <AdminField label="Card description">
            <Textarea
              value={p.description}
              onChange={(e) =>
                updateProject(pi, { description: e.target.value })
              }
              rows={2}
            />
          </AdminField>

          <AdminField label="Case study overview">
            <Textarea
              value={p.overview}
              onChange={(e) => updateProject(pi, { overview: e.target.value })}
              rows={2}
            />
          </AdminField>

          <AdminField label="Stack (one per line)">
            <Textarea
              value={p.stack.join("\n")}
              onChange={(e) => updateListField(pi, "stack", e.target.value)}
              rows={3}
            />
          </AdminField>

          <AdminField label="Key outcomes (one per line)">
            <Textarea
              value={p.outcomes.join("\n")}
              onChange={(e) => updateListField(pi, "outcomes", e.target.value)}
              rows={4}
            />
          </AdminField>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">Metrics</p>
              <Button variant="ghost" size="sm" onClick={() => addMetric(pi)}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            {p.metrics.map((m, mi) => (
              <div key={m.id} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="Value"
                  value={m.value}
                  onChange={(e) =>
                    updateMetric(pi, mi, { value: e.target.value })
                  }
                />
                <Input
                  placeholder="Label"
                  value={m.label}
                  onChange={(e) =>
                    updateMetric(pi, mi, { label: e.target.value })
                  }
                />
                <AdminDeleteButton
                  label="Delete metric"
                  onClick={() => removeMetric(pi, mi)}
                />
              </div>
            ))}
          </div>

          <AdminField label="Cover gradient">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {BLOG_COVER_IDS.map((id) => {
                const selected = normalizeBlogCover(p.cover) === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => updateProject(pi, { cover: id })}
                    className={`rounded-lg border p-2 text-left transition-colors ${
                      selected
                        ? "border-accent ring-1 ring-accent/40"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <div
                      className={`h-8 rounded-md bg-gradient-to-br mb-1 ${gradientMap[id]}`}
                    />
                    <span className="mono text-[9px] text-muted block truncate">
                      {BLOG_COVER_LABELS[id as BlogCoverId]}
                    </span>
                  </button>
                );
              })}
            </div>
          </AdminField>

          <div className="flex flex-wrap gap-6">
            <AdminField label="Accent">
              <select
                value={p.accent}
                onChange={(e) =>
                  updateProject(pi, {
                    accent: e.target.value as "lime" | "white",
                  })
                }
                className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm"
              >
                <option value="lime">Lime</option>
                <option value="white">White</option>
              </select>
            </AdminField>
            <Checkbox
              label="Featured on homepage"
              checked={p.featured}
              onChange={(e) =>
                updateProject(pi, { featured: e.target.checked })
              }
            />
          </div>

          <AdminField
            label={`Case study content (${p.content.length} blocks — type|text per line)`}
          >
            <Textarea
              value={blocksToEditorLines(p.content)}
              onChange={(e) =>
                updateProject(pi, {
                  content: parseContentLines(e.target.value),
                })
              }
              rows={12}
              className="mono text-xs"
            />
          </AdminField>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => setProjects([...projects, emptyProject()])}
      >
        <Plus className="w-4 h-4 mr-2" /> Add project
      </Button>

      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
