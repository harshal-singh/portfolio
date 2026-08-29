"use client";

import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import type { SectionMeta } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AboutEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [aboutParagraphs, setAboutParagraphs] = useState([
    ...content.aboutParagraphs,
  ]);
  const [saving, setSaving] = useState(false);
  const about = sections.about;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", { sections, aboutParagraphs });
      toast.success("About section saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateAbout(patch: Partial<SectionMeta>) {
    setSections({ ...sections, about: { ...about, ...patch } });
  }

  return (
    <AdminShell title="About" description="About block: heading and body copy.">
      <div className="space-y-4">
        <AdminField label="Section label">
          <Input
            value={about.label}
            onChange={(e) => updateAbout({ label: e.target.value })}
          />
        </AdminField>
        <AdminField label="Title">
          <Input
            value={about.title}
            onChange={(e) => updateAbout({ title: e.target.value })}
          />
        </AdminField>
        {aboutParagraphs.map((p, i) => (
          <AdminField key={i} label={`Paragraph ${i + 1}`}>
            <div className="flex items-start gap-2">
              <Textarea
                value={p}
                onChange={(e) => {
                  const next = [...aboutParagraphs];
                  next[i] = e.target.value;
                  setAboutParagraphs(next);
                }}
                rows={3}
                className="flex-1"
              />
              <AdminDeleteButton
                label="Delete paragraph"
                className="mt-2"
                onClick={() => {
                  if (!confirm("Delete this paragraph?")) return;
                  setAboutParagraphs(aboutParagraphs.filter((_, j) => j !== i));
                }}
              />
            </div>
          </AdminField>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAboutParagraphs([...aboutParagraphs, ""])}
        >
          <Plus className="w-4 h-4 mr-2" /> Add paragraph
        </Button>
      </div>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
