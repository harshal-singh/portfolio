"use client";

import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSectionHeaders } from "@/lib/admin/saveSectionHeaders";
import { saveContent } from "@/lib/admin/client";
import { seedContent } from "@/lib/seed";
import type { Profile, SectionMeta } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

function SectionFields({
  label,
  section,
  onChange,
}: {
  label: string;
  section: SectionMeta;
  onChange: (next: SectionMeta) => void;
}) {
  return (
    <div className="rounded-xl border border-white/8 p-5 space-y-4">
      <p className="mono text-xs text-zinc-500 uppercase">{label}</p>
      <AdminField label="Eyebrow label">
        <Input
          value={section.label}
          onChange={(e) => onChange({ ...section, label: e.target.value })}
        />
      </AdminField>
      <AdminField label="Title">
        <Input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
        />
      </AdminField>
      <AdminField label="Description">
        <Textarea
          value={section.description}
          onChange={(e) => onChange({ ...section, description: e.target.value })}
          rows={3}
        />
      </AdminField>
    </div>
  );
}

export default function PagesEditorPage() {
  const { content, refresh } = useAdmin();
  const [contact, setContact] = useState<SectionMeta>(
    content.sections.contact ?? seedContent.sections.contact,
  );
  const [resume, setResume] = useState<SectionMeta>(
    content.sections.resume ?? seedContent.sections.resume,
  );
  const [contactCta, setContactCta] = useState<SectionMeta>(
    content.sections.contactCta ?? seedContent.sections.contactCta,
  );
  const [profile, setProfile] = useState<Profile>(content.profile);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await saveSectionHeaders({ contact, resume, contactCta });
      await saveContent("profile", profile);
      toast.success("Page copy saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Pages & contact copy"
      description="Contact page, resume page, homepage CTA, and contact form text — all editable here."
    >
      <div className="space-y-6">
        <SectionFields
          label="Contact page (/contact)"
          section={contact}
          onChange={setContact}
        />
        <SectionFields
          label="Resume page (/resume)"
          section={resume}
          onChange={setResume}
        />
        <SectionFields
          label="Homepage contact CTA"
          section={contactCta}
          onChange={setContactCta}
        />

        <div className="rounded-xl border border-white/8 p-5 space-y-4">
          <p className="mono text-xs text-zinc-500 uppercase">Contact form & availability</p>
          <AdminField label="Availability description (under status on /contact)">
            <Textarea
              value={profile.contactAvailabilityDescription}
              onChange={(e) =>
                setProfile({ ...profile, contactAvailabilityDescription: e.target.value })
              }
              rows={3}
            />
          </AdminField>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="Form section label">
              <Input
                value={profile.contactFormLabel}
                onChange={(e) =>
                  setProfile({ ...profile, contactFormLabel: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Success message">
              <Input
                value={profile.contactFormSuccessMessage}
                onChange={(e) =>
                  setProfile({ ...profile, contactFormSuccessMessage: e.target.value })
                }
              />
            </AdminField>
          </div>
          <AdminField label="Form hint">
            <Textarea
              value={profile.contactFormHint}
              onChange={(e) =>
                setProfile({ ...profile, contactFormHint: e.target.value })
              }
              rows={2}
            />
          </AdminField>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="Header CTA label">
              <Input
                value={profile.headerContactLabel}
                onChange={(e) =>
                  setProfile({ ...profile, headerContactLabel: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Homepage CTA button label">
              <Input
                value={profile.contactCtaButtonLabel}
                onChange={(e) =>
                  setProfile({ ...profile, contactCtaButtonLabel: e.target.value })
                }
              />
            </AdminField>
          </div>
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
