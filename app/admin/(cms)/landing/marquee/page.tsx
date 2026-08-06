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

export default function MarqueeEditorPage() {
  const { content, refresh } = useAdmin();
  const [marquee, setMarquee] = useState([...content.marquee]);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("marquee", marquee.filter(Boolean));
      toast.success("Marquee saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Marquee"
      description="Scrolling tech strip below the hero. One item per field."
    >
      {marquee.map((item, i) => (
        <AdminField key={i} label={`Item ${i + 1}`}>
          <Input
            value={item}
            className="mb-2"
            onChange={(e) => {
              const next = [...marquee];
              next[i] = e.target.value;
              setMarquee(next);
            }}
          />
        </AdminField>
      ))}
      <Button variant="outline" size="sm" onClick={() => setMarquee([...marquee, ""])}>
        <Plus className="w-4 h-4 mr-2" /> Add item
      </Button>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
