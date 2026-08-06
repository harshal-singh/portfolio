"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminField } from "@/components/admin/AdminField";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveContent } from "@/lib/admin/client";
import { Plus } from "lucide-react";
import type { Education } from "@/lib/types";

export default function EducationEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [education, setEducation] = useState<Education[]>([...content.education]);
  const [saving, setSaving] = useState(false);
  const sec = sections.education;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", { sections, aboutParagraphs: content.aboutParagraphs });
      await saveContent("education", education);
      toast.success("Education saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Education" description="06 — Degrees and grades.">
      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input value={sec.label} onChange={(e) => setSections({ ...sections, education: { ...sec, label: e.target.value } })} />
        </AdminField>
        <AdminField label="Title">
          <Input value={sec.title} onChange={(e) => setSections({ ...sections, education: { ...sec, title: e.target.value } })} />
        </AdminField>
      </div>
      {education.map((e, ei) => (
        <div key={e.id} className="grid md:grid-cols-2 gap-3 mb-4 p-4 rounded-lg border border-white/5">
          <AdminField label="Degree">
            <Input value={e.degree} onChange={(ev) => { const n = [...education]; n[ei] = { ...e, degree: ev.target.value }; setEducation(n); }} />
          </AdminField>
          <AdminField label="School">
            <Input value={e.school} onChange={(ev) => { const n = [...education]; n[ei] = { ...e, school: ev.target.value }; setEducation(n); }} />
          </AdminField>
          <AdminField label="Period">
            <Input value={e.period} onChange={(ev) => { const n = [...education]; n[ei] = { ...e, period: ev.target.value }; setEducation(n); }} />
          </AdminField>
          <AdminField label="Grade">
            <Input value={e.grade} onChange={(ev) => { const n = [...education]; n[ei] = { ...e, grade: ev.target.value }; setEducation(n); }} />
          </AdminField>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setEducation([...education, { id: crypto.randomUUID(), school: "", degree: "", period: "", grade: "" }])}>
        <Plus className="w-4 h-4 mr-2" /> Add education
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
