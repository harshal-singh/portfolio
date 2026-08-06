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
import type { Project } from "@/lib/types";

export default function ProjectsEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [projects, setProjects] = useState<Project[]>([...content.projects]);
  const [saving, setSaving] = useState(false);
  const sec = sections.projects;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("sections", { sections, aboutParagraphs: content.aboutParagraphs });
      await saveContent("projects", projects);
      toast.success("Projects saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Projects" description="04 — Selected work cards on the homepage.">
      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input value={sec.label} onChange={(e) => setSections({ ...sections, projects: { ...sec, label: e.target.value } })} />
        </AdminField>
        <AdminField label="Title">
          <Input value={sec.title} onChange={(e) => setSections({ ...sections, projects: { ...sec, title: e.target.value } })} />
        </AdminField>
        <AdminField label="Description">
          <Textarea value={sec.description} onChange={(e) => setSections({ ...sections, projects: { ...sec, description: e.target.value } })} rows={2} />
        </AdminField>
      </div>
      {projects.map((p, pi) => (
        <div key={p.id} className="mb-6 p-4 rounded-lg border border-white/5 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <AdminField label="Name">
              <Input value={p.name} onChange={(e) => { const n = [...projects]; n[pi] = { ...p, name: e.target.value }; setProjects(n); }} />
            </AdminField>
            <AdminField label="Year">
              <Input value={p.year} onChange={(e) => { const n = [...projects]; n[pi] = { ...p, year: e.target.value }; setProjects(n); }} />
            </AdminField>
            <AdminField label="Tagline">
              <Input value={p.tagline} onChange={(e) => { const n = [...projects]; n[pi] = { ...p, tagline: e.target.value }; setProjects(n); }} />
            </AdminField>
            <AdminField label="Link">
              <Input value={p.link} onChange={(e) => { const n = [...projects]; n[pi] = { ...p, link: e.target.value }; setProjects(n); }} />
            </AdminField>
          </div>
          <AdminField label="Description">
            <Textarea value={p.description} onChange={(e) => { const n = [...projects]; n[pi] = { ...p, description: e.target.value }; setProjects(n); }} rows={3} />
          </AdminField>
          <AdminField label="Stack (one per line)">
            <Textarea value={p.stack.join("\n")} onChange={(e) => { const n = [...projects]; n[pi] = { ...p, stack: e.target.value.split("\n").filter(Boolean) }; setProjects(n); }} rows={3} />
          </AdminField>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => setProjects([...projects, { id: crypto.randomUUID(), name: "", tagline: "", description: "", stack: [], year: "", role: "", link: "#", accent: "lime" }])}>
        <Plus className="w-4 h-4 mr-2" /> Add project
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
