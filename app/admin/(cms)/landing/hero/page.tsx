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
import type { Profile } from "@/lib/types";

export default function HeroEditorPage() {
  const { content, refresh } = useAdmin();
  const [profile, setProfile] = useState<Profile>(content.profile);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("profile", profile);
      toast.success("Hero & profile saved");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Hero & Profile"
      description="Top of the homepage — name, status, bio, contact, and social links."
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <AdminField label="First name">
            <Input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          </AdminField>
          <AdminField label="Last name">
            <Input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          </AdminField>
          <AdminField label="Status pill">
            <Input value={profile.status} onChange={(e) => setProfile({ ...profile, status: e.target.value })} />
          </AdminField>
          <AdminField label="Current role">
            <Input value={profile.heroCurrentRole} onChange={(e) => setProfile({ ...profile, heroCurrentRole: e.target.value })} />
          </AdminField>
          <AdminField label="Role (meta / author)">
            <Input value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} />
          </AdminField>
          <AdminField label="Location">
            <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
          </AdminField>
          <AdminField label="Email">
            <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </AdminField>
          <AdminField label="Phone">
            <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </AdminField>
        </div>
        <AdminField label="Short bio">
          <Textarea value={profile.shortBio} onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })} rows={3} />
        </AdminField>
        <AdminField label="Footer tagline">
          <Input value={profile.footerTagline} onChange={(e) => setProfile({ ...profile, footerTagline: e.target.value })} />
        </AdminField>
        <div className="grid md:grid-cols-3 gap-4">
          <AdminField label="GitHub">
            <Input value={profile.socials.github} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })} />
          </AdminField>
          <AdminField label="LinkedIn">
            <Input value={profile.socials.linkedin} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })} />
          </AdminField>
          <AdminField label="Twitter / X">
            <Input value={profile.socials.twitter} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, twitter: e.target.value } })} />
          </AdminField>
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} />
    </AdminShell>
  );
}
