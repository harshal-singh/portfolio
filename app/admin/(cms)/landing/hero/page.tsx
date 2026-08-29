"use client";

import { AdminField } from "@/components/admin/AdminField";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/SaveBar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/admin/client";
import type { Profile, Stat } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

export default function HeroEditorPage() {
  const { content, refresh } = useAdmin();
  const [profile, setProfile] = useState<Profile>(content.profile);
  const [stats, setStats] = useState<Stat[]>([...content.stats]);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent("profile", profile);
      await saveContent("stats", stats);
      toast.success("Hero & trust metrics saved");
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
      description="Homepage hero copy, availability, CTAs, trust metrics, and contact links."
    >
      <div className="space-y-6">
        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">
            Availability
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="Status pill">
              <Input
                value={profile.status}
                onChange={(e) =>
                  setProfile({ ...profile, status: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Current role">
              <Input
                value={profile.heroCurrentRole}
                onChange={(e) =>
                  setProfile({ ...profile, heroCurrentRole: e.target.value })
                }
              />
            </AdminField>
          </div>
        </div>

        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">Headline</p>
          <div className="space-y-4">
            <AdminField label="Headline (before highlight)">
              <Input
                value={profile.heroHeadline}
                onChange={(e) =>
                  setProfile({ ...profile, heroHeadline: e.target.value })
                }
                placeholder="I build product interfaces that"
              />
            </AdminField>
            <AdminField label="Highlight (accent text)">
              <Input
                value={profile.heroHighlight}
                onChange={(e) =>
                  setProfile({ ...profile, heroHighlight: e.target.value })
                }
                placeholder="ship faster and scale."
              />
            </AdminField>
            <AdminField label="Value proposition">
              <Textarea
                value={profile.heroValueProp}
                onChange={(e) =>
                  setProfile({ ...profile, heroValueProp: e.target.value })
                }
                rows={3}
              />
            </AdminField>
          </div>
        </div>

        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">
            Calls to action
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="Primary CTA label">
              <Input
                value={profile.heroPrimaryCtaLabel}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    heroPrimaryCtaLabel: e.target.value,
                  })
                }
              />
            </AdminField>
            <AdminField label="Primary CTA link">
              <Input
                value={profile.heroPrimaryCtaHref}
                onChange={(e) =>
                  setProfile({ ...profile, heroPrimaryCtaHref: e.target.value })
                }
                placeholder="#work"
              />
            </AdminField>
            <AdminField label="Secondary CTA label">
              <Input
                value={profile.heroSecondaryCtaLabel}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    heroSecondaryCtaLabel: e.target.value,
                  })
                }
              />
            </AdminField>
            <AdminField label="Secondary CTA link">
              <Input
                value={profile.heroSecondaryCtaHref}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    heroSecondaryCtaHref: e.target.value,
                  })
                }
                placeholder="mailto:you@email.com"
              />
            </AdminField>
          </div>
        </div>

        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">
            Trust metrics
          </p>
          <p className="text-sm text-zinc-500 mb-4">
            Four metrics shown below the hero.
          </p>
          {stats.map((s, i) => (
            <div key={s.id} className="grid grid-cols-2 gap-3 mb-3">
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
        </div>

        <div>
          <p className="mono text-xs text-zinc-500 uppercase mb-4">
            Profile & contact
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="First name">
              <Input
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Last name">
              <Input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Role (meta / author)">
              <Input
                value={profile.role}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Location">
              <Input
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Email">
              <Input
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Phone">
              <Input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </AdminField>
          </div>
          <AdminField label="Short bio (SEO / meta)">
            <Textarea
              value={profile.shortBio}
              onChange={(e) =>
                setProfile({ ...profile, shortBio: e.target.value })
              }
              rows={2}
            />
          </AdminField>
          <AdminField label="Footer tagline">
            <Input
              value={profile.footerTagline}
              onChange={(e) =>
                setProfile({ ...profile, footerTagline: e.target.value })
              }
            />
          </AdminField>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <AdminField label="Profile photo (public folder)">
              <Input
                value={profile.photoUrl}
                onChange={(e) =>
                  setProfile({ ...profile, photoUrl: e.target.value })
                }
                placeholder="/images/profile.jpg"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                Drop the file in <code className="text-zinc-400">public/images/</code>{" "}
                and use the path from site root, e.g.{" "}
                <code className="text-zinc-400">/images/profile.jpg</code>
              </p>
            </AdminField>
            <AdminField label="Resume PDF (public folder, optional)">
              <Input
                value={profile.resumePdfUrl}
                onChange={(e) =>
                  setProfile({ ...profile, resumePdfUrl: e.target.value })
                }
                placeholder="/resume/Harshal Singh - Resume - 2027.pdf"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                Drop your PDF in <code className="text-zinc-400">public/resume/</code>.
                Leave empty to use the auto-generated PDF from CMS data.
              </p>
            </AdminField>
          </div>
          <p className="mono text-xs text-zinc-500 uppercase mt-6 mb-4">
            Contact labels
          </p>
          <p className="text-sm text-zinc-500 mb-4">
            For page copy and form text, use Pages & contact in the sidebar.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <AdminField label="GitHub">
              <Input
                value={profile.socials.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: { ...profile.socials, github: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="LinkedIn">
              <Input
                value={profile.socials.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: { ...profile.socials, linkedin: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="Twitter / X">
              <Input
                value={profile.socials.twitter}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socials: { ...profile.socials, twitter: e.target.value },
                  })
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
