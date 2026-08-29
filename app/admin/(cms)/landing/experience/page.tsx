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
import type { Experience, ExperienceMetric } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function emptyJob(): Experience {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    location: "",
    period: "",
    current: false,
    overview: "",
    points: [],
    impact: [],
    technologies: [],
    metrics: [],
    gapAfterNote: "",
  };
}

export default function ExperienceEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [experience, setExperience] = useState<Experience[]>([
    ...content.experience,
  ]);
  const [saving, setSaving] = useState(false);
  const sec = sections.experience;

  async function handleSave() {
    setSaving(true);
    try {
      await saveSectionHeaders({ experience: sections.experience });
      await saveContent("experience", experience);
      toast.success("Experience saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateJob(index: number, patch: Partial<Experience>) {
    const next = [...experience];
    next[index] = { ...next[index], ...patch };
    setExperience(next);
  }

  function removeJob(index: number) {
    if (!confirm("Delete this job?")) return;
    setExperience(experience.filter((_, i) => i !== index));
  }

  function updateMetric(
    jobIndex: number,
    metricIndex: number,
    patch: Partial<ExperienceMetric>,
  ) {
    const next = [...experience];
    const metrics = [...next[jobIndex].metrics];
    metrics[metricIndex] = { ...metrics[metricIndex], ...patch };
    next[jobIndex] = { ...next[jobIndex], metrics };
    setExperience(next);
  }

  function removeMetric(jobIndex: number, metricIndex: number) {
    const job = experience[jobIndex];
    updateJob(jobIndex, {
      metrics: job.metrics.filter((_, i) => i !== metricIndex),
    });
  }

  function updateImpactLine(jobIndex: number, lineIndex: number, value: string) {
    const impact = [...experience[jobIndex].impact];
    impact[lineIndex] = value;
    updateJob(jobIndex, { impact });
  }

  function removeImpactLine(jobIndex: number, lineIndex: number) {
    const job = experience[jobIndex];
    updateJob(jobIndex, {
      impact: job.impact.filter((_, i) => i !== lineIndex),
    });
  }

  return (
    <AdminShell
      title="Experience"
      description="Timeline roles with overview, responsibilities, business impact, metrics, and technologies."
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-zinc-500">
          Saves to Experience, ExperiencePoints, ExperienceImpact, and
          ExperienceMetrics tabs.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input
            value={sec.label}
            onChange={(e) =>
              setSections({
                ...sections,
                experience: { ...sec, label: e.target.value },
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
                experience: { ...sec, title: e.target.value },
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
                experience: { ...sec, description: e.target.value },
              })
            }
            rows={2}
          />
        </AdminField>
      </div>

      {experience.map((job, ji) => (
        <div
          key={job.id}
          className="mb-8 p-5 rounded-xl border border-white/8 space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="mono text-xs text-zinc-500 uppercase">
              Role {ji + 1} · {job.company || "New company"}
            </p>
            <AdminDeleteButton
              label="Delete job"
              onClick={() => removeJob(ji)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <AdminField label="Role">
              <Input
                value={job.role}
                onChange={(e) => updateJob(ji, { role: e.target.value })}
              />
            </AdminField>
            <AdminField label="Company">
              <Input
                value={job.company}
                onChange={(e) => updateJob(ji, { company: e.target.value })}
              />
            </AdminField>
            <AdminField label="Period">
              <Input
                value={job.period}
                onChange={(e) => updateJob(ji, { period: e.target.value })}
              />
            </AdminField>
            <AdminField label="Location">
              <Input
                value={job.location}
                onChange={(e) => updateJob(ji, { location: e.target.value })}
              />
            </AdminField>
          </div>

          <Checkbox
            label="Current role"
            checked={job.current}
            onChange={(e) => updateJob(ji, { current: e.target.checked })}
          />

          <AdminField label="Overview">
            <Textarea
              value={job.overview}
              onChange={(e) => updateJob(ji, { overview: e.target.value })}
              rows={3}
            />
          </AdminField>

          <AdminField label="Gap note (shown after this role — career breaks, exam prep, etc.)">
            <Input
              value={job.gapAfterNote ?? ""}
              onChange={(e) => updateJob(ji, { gapAfterNote: e.target.value })}
              placeholder="Feb–Jul 2022 · Board exam preparation"
            />
          </AdminField>

          <AdminField label="Responsibilities (one per line)">
            <Textarea
              value={job.points.join("\n")}
              onChange={(e) =>
                updateJob(ji, {
                  points: e.target.value.split("\n").filter(Boolean),
                })
              }
              rows={4}
            />
          </AdminField>

          <div>
            <p className="mono text-xs text-zinc-500 uppercase mb-3">
              Business impact
            </p>
            {job.impact.map((line, ii) => (
              <div key={ii} className="flex items-start gap-2 mb-2">
                <Textarea
                  value={line}
                  onChange={(e) => updateImpactLine(ji, ii, e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <AdminDeleteButton
                  label="Delete impact line"
                  className="mt-2"
                  onClick={() => removeImpactLine(ji, ii)}
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateJob(ji, { impact: [...job.impact, ""] })}
            >
              <Plus className="w-4 h-4 mr-2" /> Add impact line
            </Button>
          </div>

          <AdminField label="Technologies (comma-separated)">
            <Textarea
              value={job.technologies.join(", ")}
              onChange={(e) =>
                updateJob(ji, {
                  technologies: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Next.js, TypeScript, Docker"
              rows={2}
            />
          </AdminField>

          <div>
            <p className="mono text-xs text-zinc-500 uppercase mb-3">Metrics</p>
            {job.metrics.map((m, mi) => (
              <div key={m.id} className="flex items-start gap-2 mb-3">
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <AdminField label="Value">
                    <Input
                      value={m.value}
                      onChange={(e) =>
                        updateMetric(ji, mi, { value: e.target.value })
                      }
                    />
                  </AdminField>
                  <AdminField label="Label">
                    <Input
                      value={m.label}
                      onChange={(e) =>
                        updateMetric(ji, mi, { label: e.target.value })
                      }
                    />
                  </AdminField>
                </div>
                <AdminDeleteButton
                  label="Delete metric"
                  className="mt-7"
                  onClick={() => removeMetric(ji, mi)}
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateJob(ji, {
                  metrics: [
                    ...job.metrics,
                    { id: crypto.randomUUID(), value: "", label: "" },
                  ],
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" /> Add metric
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => setExperience([...experience, emptyJob()])}
      >
        <Plus className="w-4 h-4 mr-2" /> Add job
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
