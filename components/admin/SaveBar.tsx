"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

export function SaveBar({
  onSave,
  saving,
  label = "Save changes",
}: {
  onSave: () => void;
  saving: boolean;
  label?: string;
}) {
  return (
    <div className="sticky bottom-0 -mx-6 px-6 py-4 mt-8 border-t border-white/8 bg-background/95 backdrop-blur-sm">
      <Button onClick={onSave} disabled={saving}>
        {saving ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        {saving ? "Saving…" : label}
      </Button>
    </div>
  );
}
