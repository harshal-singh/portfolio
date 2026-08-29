"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminField } from "@/components/admin/AdminField";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import { seedContent } from "@/lib/seed";
import type { Testimonial } from "@/lib/types";
import { Plus, RotateCcw } from "lucide-react";

function emptyTestimonial(): Testimonial {
  return {
    id: crypto.randomUUID(),
    quote: "",
    author: "",
    role: "",
    company: "",
    published: false,
  };
}

export default function TestimonialsEditorPage() {
  const { content, refresh } = useAdmin();
  const [sections, setSections] = useState({ ...content.sections });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    ...(content.testimonials ?? []),
  ]);
  const [saving, setSaving] = useState(false);
  const sec = sections.testimonials ?? seedContent.sections.testimonials;

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("testimonials", { section: sec, testimonials });
      toast.success("Testimonials saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateItem(index: number, patch: Partial<Testimonial>) {
    const next = [...testimonials];
    next[index] = { ...next[index], ...patch };
    setTestimonials(next);
  }

  return (
    <AdminShell
      title="Testimonials"
      description="Peer and manager recommendations on the home page. Leave unpublished until you have real quotes."
    >
      <div className="space-y-4 mb-8">
        <AdminField label="Section label">
          <Input
            value={sec.label}
            onChange={(e) =>
              setSections({
                ...sections,
                testimonials: { ...sec, label: e.target.value },
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
                testimonials: { ...sec, title: e.target.value },
              })
            }
          />
        </AdminField>
        <AdminField label="Description">
          <Textarea
            value={sec.description}
            onChange={(e) =>
              setSections({
                ...sections,
                testimonials: { ...sec, description: e.target.value },
              })
            }
            rows={2}
          />
        </AdminField>
      </div>

      {testimonials.length === 0 ? (
        <p className="text-sm text-muted mb-6">
          No testimonials yet — the site shows a placeholder with a LinkedIn link until
          you publish at least one quote.
        </p>
      ) : null}

      {testimonials.map((t, ti) => (
        <div key={t.id} className="mb-6 p-4 rounded-lg border border-border space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="mono text-xs text-zinc-500 uppercase">
              Testimonial {ti + 1}
            </p>
            <AdminDeleteButton
              label="Delete testimonial"
              onClick={() => {
                if (!confirm("Delete this testimonial?")) return;
                setTestimonials(testimonials.filter((_, i) => i !== ti));
              }}
            />
          </div>
          <AdminField label="Quote">
            <Textarea
              value={t.quote}
              onChange={(e) => updateItem(ti, { quote: e.target.value })}
              rows={3}
              placeholder="What they said about working with you…"
            />
          </AdminField>
          <div className="grid md:grid-cols-3 gap-3">
            <AdminField label="Author">
              <Input
                value={t.author}
                onChange={(e) => updateItem(ti, { author: e.target.value })}
              />
            </AdminField>
            <AdminField label="Role">
              <Input
                value={t.role}
                onChange={(e) => updateItem(ti, { role: e.target.value })}
              />
            </AdminField>
            <AdminField label="Company">
              <Input
                value={t.company}
                onChange={(e) => updateItem(ti, { company: e.target.value })}
              />
            </AdminField>
          </div>
          <Checkbox
            label="Published (visible on home page)"
            checked={t.published}
            onChange={(e) => updateItem(ti, { published: e.target.checked })}
          />
        </div>
      ))}

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTestimonials([...testimonials, emptyTestimonial()])}
        >
          <Plus className="w-4 h-4 mr-2" /> Add testimonial
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTestimonials([])}
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Clear all
        </Button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
