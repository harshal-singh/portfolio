"use client";

import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import type { SectionMeta } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

export default function BlogListingPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [saving, setSaving] = useState(false);

  const blog = sections.blog;

  function updateBlog(patch: Partial<SectionMeta>) {
    setSections({ ...sections, blog: { ...blog, ...patch } });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", {
        sections: { ...content.sections, blog },
        aboutParagraphs: content.aboutParagraphs,
      });
      toast.success("Blog listing page saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Blog listing page"
      description="/blog page header and category filters."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="mono text-xs text-zinc-500 uppercase">/blog page</p>
          <AdminField label="Section label">
            <Input
              value={blog.label}
              onChange={(e) => updateBlog({ label: e.target.value })}
            />
          </AdminField>
          <AdminField label="Title">
            <Input
              value={blog.title}
              onChange={(e) => updateBlog({ title: e.target.value })}
            />
          </AdminField>
          <AdminField label="Description">
            <Textarea
              value={blog.description}
              onChange={(e) => updateBlog({ description: e.target.value })}
              rows={3}
            />
          </AdminField>
        </section>
      </div>
      <SaveBar onSave={handleSave} saving={saving} label="Save listing page" />
    </AdminShell>
  );
}
