"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  BlogPost,
  Education,
  Experience,
  PortfolioContent,
  Profile,
  Project,
  SectionMeta,
  Stat,
} from "@/lib/types";
import {
  ExternalLink,
  Loader2,
  LogOut,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type AdminContent = PortfolioContent & { allBlogPosts: BlogPost[] };

type Tab =
  | "profile"
  | "sections"
  | "stats"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "blog";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile & Hero" },
  { id: "sections", label: "Section Copy" },
  { id: "stats", label: "Stats & Marquee" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "blog", label: "Blog" },
];

async function saveContent(type: string, data: unknown) {
  const res = await fetch("/api/admin/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Save failed");
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="mono text-[11px] uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [publicReadConfigured, setPublicReadConfigured] = useState(true);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [sections, setSections] = useState<Record<string, SectionMeta>>({});
  const [aboutParagraphs, setAboutParagraphs] = useState<string[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [marquee, setMarquee] = useState<string[]>([]);
  const [skills, setSkills] = useState<Record<string, string[]>>({});
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [setupError, setSetupError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setSetupError(null);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "SpreadsheetSetupError") {
          setSetupError("SpreadsheetSetupError");
          return;
        }
        throw new Error(data.error ?? "Failed to load content");
      }
      const c = data.content as AdminContent;
      setSpreadsheetId(data.spreadsheetId);
      setPublicReadConfigured(Boolean(data.publicReadConfigured));
      setProfile(c.profile);
      setSections(c.sections);
      setAboutParagraphs(c.aboutParagraphs);
      setStats(c.stats);
      setMarquee(c.marquee);
      setSkills(c.skills);
      setExperience(c.experience);
      setProjects(c.projects);
      setEducation(c.education);
      setBlogPosts(c.allBlogPosts);
      setBlogCategories(c.blogCategories);
      setSelectedPost(c.allBlogPosts[0]?.slug ?? null);
    } catch {
      toast.error("Could not load content from Google Sheet");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(type: Tab | "marquee" | "blog", payload: unknown) {
    setSaving(true);
    try {
      await saveContent(type, payload);
      toast.success("Saved — site will update shortly");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading from Google Sheet…
      </div>
    );
  }

  if (setupError === "SpreadsheetSetupError") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <p className="mono text-xs uppercase tracking-widest text-accent mb-3">
          Setup required
        </p>
        <h1 className="heading text-3xl text-zinc-100 mb-4">
          Google Sheet could not be created
        </h1>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Sign-in succeeded, but the app could not create or find your portfolio
          spreadsheet. This usually means the{" "}
          <strong className="text-zinc-200">Google Drive API</strong> and{" "}
          <strong className="text-zinc-200">Google Sheets API</strong> are not
          enabled for your Google Cloud project.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400 mb-8">
          <li>
            Enable{" "}
            <a
              href="https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=583539693537"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent link-underline"
            >
              Google Drive API
            </a>
          </li>
          <li>
            Enable{" "}
            <a
              href="https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=583539693537"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent link-underline"
            >
              Google Sheets API
            </a>
          </li>
          <li>
            Wait 1–2 minutes, then click Retry below (no need to sign out)
          </li>
        </ol>
        <div className="flex gap-3">
          <Button onClick={() => load()}>Retry setup</Button>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
        Could not load content. Try refreshing the page.
      </div>
    );
  }

  const activePost = blogPosts.find((p) => p.slug === selectedPost);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-accent mb-2">
            CMS Admin
          </p>
          <h1 className="heading text-3xl text-zinc-100">Portfolio content</h1>
          <p className="text-sm text-zinc-500 mt-2">
            Edits save to your Google Sheet and appear on the live site
            instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:text-white"
          >
            View site <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          {spreadsheetId ? (
            <a
              href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:text-white"
            >
              Open sheet <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : null}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:text-white"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </div>

      {!publicReadConfigured ? (
        <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200/90">
          <p className="font-medium mb-1">Public site read setup</p>
          <p className="text-amber-200/70 leading-relaxed">
            Add <code className="mono text-xs">PORTFOLIO_SPREADSHEET_ID</code>{" "}
            and service account credentials to{" "}
            <code className="mono text-xs">.env.local</code>. Share the sheet
            with your service account email (Viewer). Until configured, the
            public site uses seed data; admin edits still save to your sheet.
          </p>
          {spreadsheetId ? (
            <p className="mt-2 mono text-xs text-amber-200/60">
              Spreadsheet ID: {spreadsheetId} — add this to{" "}
              <code className="mono">PORTFOLIO_SPREADSHEET_ID</code> in
              .env.local for the public site to read from the sheet.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <nav className="flex lg:flex-col flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                tab === t.id
                  ? "bg-accent/15 text-accent"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/4"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-6">
          {tab === "profile" && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="First name">
                  <Input
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                  />
                </Field>
                <Field label="Last name">
                  <Input
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                  />
                </Field>
                <Field label="Status pill">
                  <Input
                    value={profile.status}
                    onChange={(e) =>
                      setProfile({ ...profile, status: e.target.value })
                    }
                  />
                </Field>
                <Field label="Current role (Hero)">
                  <Input
                    value={profile.heroCurrentRole}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        heroCurrentRole: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Role">
                  <Input
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </Field>
                <Field label="Email">
                  <Input
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </Field>
              </div>
              <Field label="Short bio">
                <Textarea
                  value={profile.shortBio}
                  onChange={(e) =>
                    setProfile({ ...profile, shortBio: e.target.value })
                  }
                  rows={3}
                />
              </Field>
              <Field label="Footer tagline">
                <Input
                  value={profile.footerTagline}
                  onChange={(e) =>
                    setProfile({ ...profile, footerTagline: e.target.value })
                  }
                />
              </Field>
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="GitHub URL">
                  <Input
                    value={profile.socials.github}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socials: { ...profile.socials, github: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="LinkedIn URL">
                  <Input
                    value={profile.socials.linkedin}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socials: {
                          ...profile.socials,
                          linkedin: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Twitter URL">
                  <Input
                    value={profile.socials.twitter}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socials: {
                          ...profile.socials,
                          twitter: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
              </div>
              <Button
                onClick={() => handleSave("profile", profile)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving…" : "Save profile"}
              </Button>
            </>
          )}

          {tab === "sections" && (
            <>
              {Object.entries(sections).map(([id, sec]) => (
                <>
                  <div
                    key={id}
                    className="border-t border-white/5 pt-4 first:border-0 first:pt-0"
                  >
                    <p className="mono text-xs text-accent mb-3 uppercase">
                      {id === "blog" ? "Blog Page" : id}
                    </p>
                    <div className="grid gap-3">
                      <Field label="Label">
                        <Input
                          value={sec.label}
                          onChange={(e) =>
                            setSections({
                              ...sections,
                              [id]: { ...sec, label: e.target.value },
                            })
                          }
                        />
                      </Field>
                      <Field label="Title">
                        <Input
                          value={sec.title}
                          onChange={(e) =>
                            setSections({
                              ...sections,
                              [id]: { ...sec, title: e.target.value },
                            })
                          }
                        />
                      </Field>
                      <Field label="Description">
                        <Textarea
                          value={sec.description}
                          onChange={(e) =>
                            setSections({
                              ...sections,
                              [id]: { ...sec, description: e.target.value },
                            })
                          }
                          rows={2}
                        />
                      </Field>
                    </div>
                  </div>

                  {id === "about" && (
                    <div className="border-t border-white/5 pt-4">
                      <p className="mono text-xs text-accent mb-3 uppercase">
                        About paragraphs
                      </p>
                      {aboutParagraphs.map((p, i) => (
                        <Field key={i} label={`Paragraph ${i + 1}`}>
                          <Textarea
                            value={p}
                            onChange={(e) => {
                              const next = [...aboutParagraphs];
                              next[i] = e.target.value;
                              setAboutParagraphs(next);
                            }}
                            rows={3}
                            className="mb-3"
                          />
                        </Field>
                      ))}
                      <Button
                        variant="outline"
                        className="mb-4"
                        onClick={() =>
                          setAboutParagraphs([...aboutParagraphs, ""])
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add paragraph
                      </Button>
                    </div>
                  )}
                </>
              ))}
              <Button
                onClick={() =>
                  handleSave("sections", { sections, aboutParagraphs })
                }
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving…" : "Save sections"}
              </Button>
            </>
          )}

          {tab === "stats" && (
            <>
              <p className="text-sm text-zinc-400">About section stats</p>
              {stats.map((s, i) => (
                <div key={s.id} className="grid md:grid-cols-2 gap-3">
                  <Field label="Value">
                    <Input
                      value={s.value}
                      onChange={(e) => {
                        const next = [...stats];
                        next[i] = { ...s, value: e.target.value };
                        setStats(next);
                      }}
                    />
                  </Field>
                  <Field label="Label">
                    <Input
                      value={s.label}
                      onChange={(e) => {
                        const next = [...stats];
                        next[i] = { ...s, label: e.target.value };
                        setStats(next);
                      }}
                    />
                  </Field>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setStats([
                    ...stats,
                    { id: crypto.randomUUID(), value: "", label: "" },
                  ])
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add stat
              </Button>

              <div className="border-t border-white/5 pt-6">
                <p className="text-sm text-zinc-400 mb-3">
                  Marquee items (comma-separated line each)
                </p>
                {marquee.map((item, i) => (
                  <Input
                    key={i}
                    value={item}
                    className="mb-2"
                    onChange={(e) => {
                      const next = [...marquee];
                      next[i] = e.target.value;
                      setMarquee(next);
                    }}
                  />
                ))}
                <Button
                  variant="outline"
                  onClick={() => setMarquee([...marquee, ""])}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add marquee item
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleSave("stats", stats)}
                  disabled={saving}
                >
                  Save stats
                </Button>
                <Button
                  onClick={() => handleSave("marquee", marquee)}
                  disabled={saving}
                >
                  Save marquee
                </Button>
              </div>
            </>
          )}

          {tab === "skills" && (
            <>
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="border-t border-white/5 pt-4 first:border-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      value={category}
                      onChange={(e) => {
                        const next = { ...skills };
                        const vals = next[category];
                        delete next[category];
                        next[e.target.value] = vals;
                        setSkills(next);
                      }}
                      className="max-w-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = { ...skills };
                        delete next[category];
                        setSkills(next);
                      }}
                      className="text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Textarea
                    value={items.join("\n")}
                    onChange={(e) =>
                      setSkills({
                        ...skills,
                        [category]: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                    rows={4}
                    placeholder="One skill per line"
                  />
                </div>
              ))}
              <Button
                variant="outline"
                className="mr-3"
                onClick={() => setSkills({ ...skills, "New Category": [] })}
              >
                <Plus className="w-4 h-4 mr-2" /> Add category
              </Button>
              <Button
                onClick={() => handleSave("skills", skills)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" /> Save skills
              </Button>
            </>
          )}

          {tab === "experience" && (
            <>
              {experience.map((job, ji) => (
                <div
                  key={job.id}
                  className="border border-white/5 rounded-lg p-4 space-y-3"
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Role">
                      <Input
                        value={job.role}
                        onChange={(e) => {
                          const next = [...experience];
                          next[ji] = { ...job, role: e.target.value };
                          setExperience(next);
                        }}
                      />
                    </Field>
                    <Field label="Company">
                      <Input
                        value={job.company}
                        onChange={(e) => {
                          const next = [...experience];
                          next[ji] = { ...job, company: e.target.value };
                          setExperience(next);
                        }}
                      />
                    </Field>
                    <Field label="Period">
                      <Input
                        value={job.period}
                        onChange={(e) => {
                          const next = [...experience];
                          next[ji] = { ...job, period: e.target.value };
                          setExperience(next);
                        }}
                      />
                    </Field>
                    <Field label="Location">
                      <Input
                        value={job.location}
                        onChange={(e) => {
                          const next = [...experience];
                          next[ji] = { ...job, location: e.target.value };
                          setExperience(next);
                        }}
                      />
                    </Field>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      checked={job.current}
                      onChange={(e) => {
                        const next = [...experience];
                        next[ji] = { ...job, current: e.target.checked };
                        setExperience(next);
                      }}
                    />
                    Current role
                  </label>
                  <Field label="Bullet points (one per line)">
                    <Textarea
                      value={job.points.join("\n")}
                      onChange={(e) => {
                        const next = [...experience];
                        next[ji] = {
                          ...job,
                          points: e.target.value.split("\n").filter(Boolean),
                        };
                        setExperience(next);
                      }}
                      rows={4}
                    />
                  </Field>
                </div>
              ))}
              <Button
                variant="outline"
                className="mr-3"
                onClick={() =>
                  setExperience([
                    ...experience,
                    {
                      id: crypto.randomUUID(),
                      company: "",
                      role: "",
                      location: "",
                      period: "",
                      current: false,
                      points: [],
                    },
                  ])
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add job
              </Button>
              <Button
                onClick={() => handleSave("experience", experience)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" /> Save experience
              </Button>
            </>
          )}

          {tab === "projects" && (
            <>
              {projects.map((p, pi) => (
                <div
                  key={p.id}
                  className="border border-white/5 rounded-lg p-4 space-y-3"
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Name">
                      <Input
                        value={p.name}
                        onChange={(e) => {
                          const next = [...projects];
                          next[pi] = { ...p, name: e.target.value };
                          setProjects(next);
                        }}
                      />
                    </Field>
                    <Field label="Year">
                      <Input
                        value={p.year}
                        onChange={(e) => {
                          const next = [...projects];
                          next[pi] = { ...p, year: e.target.value };
                          setProjects(next);
                        }}
                      />
                    </Field>
                    <Field label="Tagline">
                      <Input
                        value={p.tagline}
                        onChange={(e) => {
                          const next = [...projects];
                          next[pi] = { ...p, tagline: e.target.value };
                          setProjects(next);
                        }}
                      />
                    </Field>
                    <Field label="Link">
                      <Input
                        value={p.link}
                        onChange={(e) => {
                          const next = [...projects];
                          next[pi] = { ...p, link: e.target.value };
                          setProjects(next);
                        }}
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={p.description}
                      onChange={(e) => {
                        const next = [...projects];
                        next[pi] = { ...p, description: e.target.value };
                        setProjects(next);
                      }}
                      rows={3}
                    />
                  </Field>
                  <Field label="Stack (one per line)">
                    <Textarea
                      value={p.stack.join("\n")}
                      onChange={(e) => {
                        const next = [...projects];
                        next[pi] = {
                          ...p,
                          stack: e.target.value.split("\n").filter(Boolean),
                        };
                        setProjects(next);
                      }}
                      rows={3}
                    />
                  </Field>
                </div>
              ))}
              <Button
                variant="outline"
                className="mr-3"
                onClick={() =>
                  setProjects([
                    ...projects,
                    {
                      id: crypto.randomUUID(),
                      name: "",
                      tagline: "",
                      description: "",
                      stack: [],
                      year: "",
                      role: "",
                      link: "#",
                      accent: "lime",
                    },
                  ])
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add project
              </Button>
              <Button
                onClick={() => handleSave("projects", projects)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" /> Save projects
              </Button>
            </>
          )}

          {tab === "education" && (
            <>
              {education.map((e, ei) => (
                <div
                  key={e.id}
                  className="grid md:grid-cols-2 gap-3 border border-white/5 rounded-lg p-4"
                >
                  <Field label="Degree">
                    <Input
                      value={e.degree}
                      onChange={(ev) => {
                        const next = [...education];
                        next[ei] = { ...e, degree: ev.target.value };
                        setEducation(next);
                      }}
                    />
                  </Field>
                  <Field label="School">
                    <Input
                      value={e.school}
                      onChange={(ev) => {
                        const next = [...education];
                        next[ei] = { ...e, school: ev.target.value };
                        setEducation(next);
                      }}
                    />
                  </Field>
                  <Field label="Period">
                    <Input
                      value={e.period}
                      onChange={(ev) => {
                        const next = [...education];
                        next[ei] = { ...e, period: ev.target.value };
                        setEducation(next);
                      }}
                    />
                  </Field>
                  <Field label="Grade">
                    <Input
                      value={e.grade}
                      onChange={(ev) => {
                        const next = [...education];
                        next[ei] = { ...e, grade: ev.target.value };
                        setEducation(next);
                      }}
                    />
                  </Field>
                </div>
              ))}
              <Button
                variant="outline"
                className="mr-3"
                onClick={() =>
                  setEducation([
                    ...education,
                    {
                      id: crypto.randomUUID(),
                      school: "",
                      degree: "",
                      period: "",
                      grade: "",
                    },
                  ])
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add education
              </Button>
              <Button
                onClick={() => handleSave("education", education)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" /> Save education
              </Button>
            </>
          )}

          {tab === "blog" && (
            <>
              <Field label="Filter categories (one per line, include All first)">
                <Textarea
                  value={blogCategories.join("\n")}
                  onChange={(e) =>
                    setBlogCategories(
                      e.target.value.split("\n").filter(Boolean),
                    )
                  }
                  rows={3}
                />
              </Field>

              <div className="flex flex-wrap gap-2">
                {blogPosts.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setSelectedPost(p.slug)}
                    className={`mono text-xs px-3 py-1.5 rounded-md border ${
                      selectedPost === p.slug
                        ? "border-accent text-accent"
                        : "border-white/10 text-zinc-400"
                    }`}
                  >
                    {p.title.slice(0, 28)}…
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const slug = `new-post-${Date.now()}`;
                    const post: BlogPost = {
                      slug,
                      title: "New post",
                      excerpt: "",
                      category: "Engineering",
                      readTime: "5 min read",
                      date: new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }),
                      cover: "gradient-1",
                      tags: [],
                      published: false,
                      content: [{ type: "p", text: "" }],
                    };
                    setBlogPosts([post, ...blogPosts]);
                    setSelectedPost(slug);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" /> New post
                </Button>
              </div>

              {activePost ? (
                <div className="space-y-3 border-t border-white/5 pt-4">
                  <Field label="Slug (URL)">
                    <Input
                      value={activePost.slug}
                      onChange={(e) => {
                        const oldSlug = activePost.slug;
                        const newSlug = e.target.value;
                        setBlogPosts(
                          blogPosts.map((p) =>
                            p.slug === oldSlug ? { ...p, slug: newSlug } : p,
                          ),
                        );
                        setSelectedPost(newSlug);
                      }}
                    />
                  </Field>
                  <Field label="Title">
                    <Input
                      value={activePost.title}
                      onChange={(e) =>
                        setBlogPosts(
                          blogPosts.map((p) =>
                            p.slug === activePost.slug
                              ? { ...p, title: e.target.value }
                              : p,
                          ),
                        )
                      }
                    />
                  </Field>
                  <Field label="Excerpt">
                    <Textarea
                      value={activePost.excerpt}
                      onChange={(e) =>
                        setBlogPosts(
                          blogPosts.map((p) =>
                            p.slug === activePost.slug
                              ? { ...p, excerpt: e.target.value }
                              : p,
                          ),
                        )
                      }
                      rows={2}
                    />
                  </Field>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Field label="Category">
                      <Input
                        value={activePost.category}
                        onChange={(e) =>
                          setBlogPosts(
                            blogPosts.map((p) =>
                              p.slug === activePost.slug
                                ? { ...p, category: e.target.value }
                                : p,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Date">
                      <Input
                        value={activePost.date}
                        onChange={(e) =>
                          setBlogPosts(
                            blogPosts.map((p) =>
                              p.slug === activePost.slug
                                ? { ...p, date: e.target.value }
                                : p,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Read time">
                      <Input
                        value={activePost.readTime}
                        onChange={(e) =>
                          setBlogPosts(
                            blogPosts.map((p) =>
                              p.slug === activePost.slug
                                ? { ...p, readTime: e.target.value }
                                : p,
                            ),
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Tags (comma-separated)">
                    <Input
                      value={activePost.tags.join(", ")}
                      onChange={(e) =>
                        setBlogPosts(
                          blogPosts.map((p) =>
                            p.slug === activePost.slug
                              ? {
                                  ...p,
                                  tags: e.target.value
                                    .split(",")
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                }
                              : p,
                          ),
                        )
                      }
                    />
                  </Field>
                  <label className="flex items-center gap-2 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      checked={activePost.published}
                      onChange={(e) =>
                        setBlogPosts(
                          blogPosts.map((p) =>
                            p.slug === activePost.slug
                              ? { ...p, published: e.target.checked }
                              : p,
                          ),
                        )
                      }
                    />
                    Published (visible on site)
                  </label>
                  <Field label="Content blocks (type|text per line — types: p, h2, code)">
                    <Textarea
                      value={activePost.content
                        .map((b) => `${b.type}|${b.text.replace(/\n/g, "\\n")}`)
                        .join("\n")}
                      onChange={(e) => {
                        const content = e.target.value
                          .split("\n")
                          .filter(Boolean)
                          .map((line) => {
                            const idx = line.indexOf("|");
                            const type = idx === -1 ? "p" : line.slice(0, idx);
                            const text = (
                              idx === -1 ? line : line.slice(idx + 1)
                            ).replace(/\\n/g, "\n");
                            return { type, text };
                          });
                        setBlogPosts(
                          blogPosts.map((p) =>
                            p.slug === activePost.slug ? { ...p, content } : p,
                          ),
                        );
                      }}
                      rows={12}
                      className="mono text-xs"
                    />
                  </Field>
                </div>
              ) : null}

              <Button
                onClick={() =>
                  handleSave("blog", {
                    posts: blogPosts,
                    categories: blogCategories,
                  })
                }
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" /> Save blog
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
