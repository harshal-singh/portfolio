"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminField } from "@/components/admin/AdminField";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import { Plus, Trash2 } from "lucide-react";

export default function SkillsEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [skills, setSkills] = useState({ ...content.skills });
  const [saving, setSaving] = useState(false);
  const sec = sections.skills;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", { sections, aboutParagraphs: content.aboutParagraphs });
      await saveContent("skills", skills);
      toast.success("Skills saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Skills" description="02 — Stack section: categories and tags.">
      <div className="space-y-4 mb-6">
        <AdminField label="Section label">
          <Input value={sec.label} onChange={(e) => setSections({ ...sections, skills: { ...sec, label: e.target.value } })} />
        </AdminField>
        <AdminField label="Title">
          <Input value={sec.title} onChange={(e) => setSections({ ...sections, skills: { ...sec, title: e.target.value } })} />
        </AdminField>
        <AdminField label="Description">
          <Textarea value={sec.description} onChange={(e) => setSections({ ...sections, skills: { ...sec, description: e.target.value } })} rows={2} />
        </AdminField>
      </div>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-6 pb-6 border-b border-white/5 last:border-0">
          <div className="flex items-center gap-2 mb-2">
            <Input
              value={category}
              onChange={(e) => {
                const next = { ...skills };
                delete next[category];
                next[e.target.value] = items;
                setSkills(next);
              }}
              className="max-w-xs font-medium"
            />
            <button type="button" onClick={() => { const n = { ...skills }; delete n[category]; setSkills(n); }} className="text-zinc-500 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <Textarea
            value={items.join("\n")}
            onChange={(e) => setSkills({ ...skills, [category]: e.target.value.split("\n").filter(Boolean) })}
            rows={4}
            placeholder="One skill per line"
          />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setSkills({ ...skills, "New Category": [] })}>
        <Plus className="w-4 h-4 mr-2" /> Add category
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
