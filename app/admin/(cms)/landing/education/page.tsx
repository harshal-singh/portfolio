"use client";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveContent } from "@/lib/admin/client";
import { saveSectionHeaders } from "@/lib/admin/saveSectionHeaders";
import type { Education } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EducationEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [education, setEducation] = useState<Education[]>([
    ...content.education,
  ]);
  const [saving, setSaving] = useState(false);
  const sec = sections.education;

  async function handleSave() {
    setSaving(true);
    try {
      await saveSectionHeaders({ education: sections.education });
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
    <AdminShell title="Education" description="Degrees and grades.">
      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input
            value={sec.label}
            onChange={(e) =>
              setSections({
                ...sections,
                education: { ...sec, label: e.target.value },
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
                education: { ...sec, title: e.target.value },
              })
            }
          />
        </AdminField>
      </div>
      {education.map((e, ei) => (
        <div
          key={e.id}
          className="mb-4 p-4 rounded-lg border border-white/5 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="mono text-xs text-zinc-500 uppercase">
              Entry {ei + 1} · {e.school || "New school"}
            </p>
            <AdminDeleteButton
              label="Delete education entry"
              onClick={() => {
                if (!confirm("Delete this education entry?")) return;
                setEducation(education.filter((_, i) => i !== ei));
              }}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
          <AdminField label="Degree">
            <Input
              value={e.degree}
              onChange={(ev) => {
                const n = [...education];
                n[ei] = { ...e, degree: ev.target.value };
                setEducation(n);
              }}
            />
          </AdminField>
          <AdminField label="School">
            <Input
              value={e.school}
              onChange={(ev) => {
                const n = [...education];
                n[ei] = { ...e, school: ev.target.value };
                setEducation(n);
              }}
            />
          </AdminField>
          <AdminField label="Period">
            <Input
              value={e.period}
              onChange={(ev) => {
                const n = [...education];
                n[ei] = { ...e, period: ev.target.value };
                setEducation(n);
              }}
            />
          </AdminField>
          <AdminField label="Grade">
            <Input
              value={e.grade}
              onChange={(ev) => {
                const n = [...education];
                n[ei] = { ...e, grade: ev.target.value };
                setEducation(n);
              }}
            />
          </AdminField>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setEducation([
            ...education,
            {
              id: crypto.randomUUID(),
              school: "",
              degree: "",
              period: "",
              grade: "",
            },
          ])
        }
      >
        <Plus className="w-4 h-4 mr-2" /> Add education
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
