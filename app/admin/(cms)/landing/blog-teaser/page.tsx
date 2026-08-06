"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminField } from "@/components/admin/AdminField";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import type { SectionMeta } from "@/lib/types";

export default function BlogTeaserEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [saving, setSaving] = useState(false);
  const blogTeaser = sections.blogTeaser;

  function updateTeaser(patch: Partial<SectionMeta>) {
    setSections({ ...sections, blogTeaser: { ...blogTeaser, ...patch } });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", {
        sections,
        aboutParagraphs: content.aboutParagraphs,
      });
      toast.success("Blog teaser saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Writing teaser"
      description="05 — Homepage blog block: heading and copy above your latest posts."
    >
      <div className="space-y-4">
        <AdminField label="Section label">
          <Input value={blogTeaser.label} onChange={(e) => updateTeaser({ label: e.target.value })} />
        </AdminField>
        <AdminField label="Title">
          <Input value={blogTeaser.title} onChange={(e) => updateTeaser({ title: e.target.value })} />
        </AdminField>
        <AdminField label="Description">
          <Textarea
            value={blogTeaser.description}
            onChange={(e) => updateTeaser({ description: e.target.value })}
            rows={2}
          />
        </AdminField>
      </div>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
