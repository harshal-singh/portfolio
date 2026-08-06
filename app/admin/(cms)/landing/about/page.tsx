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
import { Plus } from "lucide-react";
import type { SectionMeta, Stat } from "@/lib/types";

export default function AboutEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [aboutParagraphs, setAboutParagraphs] = useState([...content.aboutParagraphs]);
  const [stats, setStats] = useState<Stat[]>([...content.stats]);
  const [saving, setSaving] = useState(false);
  const about = sections.about;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", { sections, aboutParagraphs });
      await saveContent("stats", stats);
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
    <AdminShell title="About" description="01 — About block: heading, body copy, and stat row.">
      <div className="space-y-4">
        <AdminField label="Section label">
          <Input value={about.label} onChange={(e) => updateAbout({ label: e.target.value })} />
        </AdminField>
        <AdminField label="Title">
          <Input value={about.title} onChange={(e) => updateAbout({ title: e.target.value })} />
        </AdminField>
        {aboutParagraphs.map((p, i) => (
          <AdminField key={i} label={`Paragraph ${i + 1}`}>
            <Textarea
              value={p}
              onChange={(e) => {
                const next = [...aboutParagraphs];
                next[i] = e.target.value;
                setAboutParagraphs(next);
              }}
              rows={3}
            />
          </AdminField>
        ))}
        <Button variant="outline" size="sm" onClick={() => setAboutParagraphs([...aboutParagraphs, ""])}>
          <Plus className="w-4 h-4 mr-2" /> Add paragraph
        </Button>
        <hr className="border-white/5 my-6" />
        <p className="mono text-xs text-zinc-500 uppercase">Stats row</p>
        {stats.map((s, i) => (
          <div key={s.id} className="grid grid-cols-2 gap-3">
            <AdminField label="Value">
              <Input
                value={s.value}
                onChange={(e) => {
                  const next = [...stats];
                  next[i] = { ...s, value: e.target.value };
                  setStats(next);
                }}
              />
            </AdminField>
            <AdminField label="Label">
              <Input
                value={s.label}
                onChange={(e) => {
                  const next = [...stats];
                  next[i] = { ...s, label: e.target.value };
                  setStats(next);
                }}
              />
            </AdminField>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setStats([...stats, { id: crypto.randomUUID(), value: "", label: "" }])}>
          <Plus className="w-4 h-4 mr-2" /> Add stat
        </Button>
      </div>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
