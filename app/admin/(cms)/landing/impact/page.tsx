"use client";

import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import { seedContent } from "@/lib/seed";
import type { Achievement } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ImpactEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [achievements, setAchievements] = useState<Achievement[]>([
    ...content.achievements,
  ]);
  const [saving, setSaving] = useState(false);

  const impact = sections.achievements ?? seedContent.sections.achievements;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("impact", {
        achievements,
        sections,
      });
      toast.success("Impact section saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateImpact(patch: Partial<typeof impact>) {
    setSections({
      ...sections,
      achievements: { ...impact, ...patch },
    });
  }

  function updateAchievement(index: number, patch: Partial<Achievement>) {
    const next = [...achievements];
    next[index] = { ...next[index], ...patch };
    setAchievements(next);
  }

  return (
    <AdminShell
      title="Impact & Achievements"
      description="Achievement cards and section copy."
    >
      <div className="space-y-6">
        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">
            Section header
          </p>
          <div className="space-y-4">
            <AdminField label="Label">
              <Input
                value={impact.label}
                onChange={(e) => updateImpact({ label: e.target.value })}
              />
            </AdminField>
            <AdminField label="Title">
              <Input
                value={impact.title}
                onChange={(e) => updateImpact({ title: e.target.value })}
              />
            </AdminField>
            <AdminField label="Description">
              <Textarea
                value={impact.description}
                onChange={(e) => updateImpact({ description: e.target.value })}
                rows={2}
              />
            </AdminField>
          </div>
        </div>

        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">
            Achievement cards
          </p>
          {achievements.map((item, i) => (
            <div
              key={item.id}
              className="mb-6 p-4 rounded-xl border border-white/8 space-y-3"
            >
              <p className="mono text-xs text-zinc-500">Card {i + 1}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <AdminField label="Metric (e.g. 35%)">
                  <Input
                    value={item.metric}
                    onChange={(e) =>
                      updateAchievement(i, { metric: e.target.value })
                    }
                  />
                </AdminField>
                <AdminField label="Context (company)">
                  <Input
                    value={item.context}
                    onChange={(e) =>
                      updateAchievement(i, { context: e.target.value })
                    }
                  />
                </AdminField>
              </div>
              <AdminField label="Title">
                <Input
                  value={item.label}
                  onChange={(e) =>
                    updateAchievement(i, { label: e.target.value })
                  }
                />
              </AdminField>
              <AdminField label="Description">
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    updateAchievement(i, { description: e.target.value })
                  }
                  rows={3}
                />
              </AdminField>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setAchievements([
                ...achievements,
                {
                  id: crypto.randomUUID(),
                  metric: "",
                  label: "",
                  description: "",
                  context: "",
                },
              ])
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Add achievement
          </Button>
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
