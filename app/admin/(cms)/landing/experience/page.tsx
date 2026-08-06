"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminField } from "@/components/admin/AdminField";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import { Plus } from "lucide-react";
import type { Experience } from "@/lib/types";

export default function ExperienceEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [experience, setExperience] = useState<Experience[]>([...content.experience]);
  const [saving, setSaving] = useState(false);
  const sec = sections.experience;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", { sections, aboutParagraphs: content.aboutParagraphs });
      await saveContent("experience", experience);
      toast.success("Experience saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Experience" description="03 — Timeline of roles and bullet points.">
      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input value={sec.label} onChange={(e) => setSections({ ...sections, experience: { ...sec, label: e.target.value } })} />
        </AdminField>
        <AdminField label="Title">
          <Input value={sec.title} onChange={(e) => setSections({ ...sections, experience: { ...sec, title: e.target.value } })} />
        </AdminField>
        <AdminField label="Description">
          <Textarea value={sec.description} onChange={(e) => setSections({ ...sections, experience: { ...sec, description: e.target.value } })} rows={2} />
        </AdminField>
      </div>
      {experience.map((job, ji) => (
        <div key={job.id} className="mb-6 p-4 rounded-lg border border-white/5 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <AdminField label="Role">
              <Input value={job.role} onChange={(e) => { const n = [...experience]; n[ji] = { ...job, role: e.target.value }; setExperience(n); }} />
            </AdminField>
            <AdminField label="Company">
              <Input value={job.company} onChange={(e) => { const n = [...experience]; n[ji] = { ...job, company: e.target.value }; setExperience(n); }} />
            </AdminField>
            <AdminField label="Period">
              <Input value={job.period} onChange={(e) => { const n = [...experience]; n[ji] = { ...job, period: e.target.value }; setExperience(n); }} />
            </AdminField>
            <AdminField label="Location">
              <Input value={job.location} onChange={(e) => { const n = [...experience]; n[ji] = { ...job, location: e.target.value }; setExperience(n); }} />
            </AdminField>
          </div>
          <Checkbox
            label="Current role"
            checked={job.current}
            onChange={(e) => {
              const n = [...experience];
              n[ji] = { ...job, current: e.target.checked };
              setExperience(n);
            }}
          />
          <AdminField label="Bullet points (one per line)">
            <Textarea value={job.points.join("\n")} onChange={(e) => { const n = [...experience]; n[ji] = { ...job, points: e.target.value.split("\n").filter(Boolean) }; setExperience(n); }} rows={4} />
          </AdminField>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setExperience([...experience, { id: crypto.randomUUID(), company: "", role: "", location: "", period: "", current: false, points: [] }])}>
        <Plus className="w-4 h-4 mr-2" /> Add job
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
