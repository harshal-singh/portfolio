"use client";

import { BlogContentBlocks } from "@/components/blog/BlogContentBlocks";
import { MetricCard } from "@/components/ui/metric-card";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { Tag } from "@/components/ui/tag";
import { CmsImage } from "@/components/ui/cms-image";
import { buildToc } from "@/lib/blog/postMeta";
import {
  isExternalProjectLink,
  projectCaseStudyHref,
  type ProjectMeta,
} from "@/lib/projects/meta";
import { gradientMap } from "@/lib/seed";
import type { Profile, Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectCaseStudyClientProps {
  project: Project | null;
  profile: Profile;
  related: ProjectMeta[];
}

export function ProjectCaseStudyClient({
  project,
  profile,
  related,
}: ProjectCaseStudyClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [project?.slug]);

  const toc = project ? buildToc(project.content) : [];

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2[id^='h-'], h3[id^='h-']"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => headings.forEach((h) => observer.unobserve(h));
  }, [toc]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-56 pb-32 text-center">
        <p className="text-label text-accent mb-3">404</p>
        <h1 className="text-h1 text-foreground mb-6">This project doesn&apos;t exist.</h1>
        <button
          type="button"
          onClick={() => router.push("/projects")}
          className="mono text-sm text-foreground inline-flex items-center gap-2 link-underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </button>
      </div>
    );
  }

  const external = isExternalProjectLink(project.link);

  return (
    <article className="relative">
      <ReadingProgress />
      <div
        className={cn(
          "relative h-[36vh] md:h-[55vh] overflow-hidden bg-gradient-to-br",
          !project.imageUrl &&
            (gradientMap[project.cover as keyof typeof gradientMap] || gradientMap["gradient-1"]),
        )}
      >
        {project.imageUrl ? (
          <>
            <CmsImage
              src={project.imageUrl}
              alt={`${project.name} hero`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/70" />
          </>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-10 md:pb-14">
          <Link
            href="/projects"
            className="mono text-xs text-foreground inline-flex items-center gap-2 mb-6 link-underline w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
          </Link>
          <span className="mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-md border border-border text-accent w-fit">
            {project.year} · {project.role}
          </span>
          <h1 className="heading text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05] mt-5 max-w-4xl">
            {project.name}
          </h1>
          <p className="text-lg md:text-xl text-muted mt-4 max-w-2xl">{project.tagline}</p>
          <p className="mono text-xs text-muted mt-4">{profile.name}</p>
        </div>
      </div>

      <div className="site-container py-16 grid md:grid-cols-12 gap-10">
        {toc.length > 0 ? (
          <aside className="md:col-span-3 print:hidden">
            <div className="md:sticky md:top-24">
              <p className="text-label mb-4">On this page</p>
              <ul className="space-y-2.5">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={cn(
                        "text-sm transition-colors block leading-snug",
                        activeSection === t.id
                          ? "text-accent font-medium"
                          : "text-muted hover:text-accent",
                      )}
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}

        <div className={cn("max-w-3xl", toc.length > 0 ? "md:col-span-9" : "md:col-span-12")}>
          {project.overview ? (
            <p className="text-xl md:text-2xl text-muted leading-relaxed border-l-2 border-accent pl-5 mb-12">
              {project.overview}
            </p>
          ) : null}

          {project.metrics.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
              {project.metrics.map((m) => (
                <MetricCard
                  key={m.id}
                  value={m.value}
                  label={m.label}
                  variant="compact"
                  className="text-left px-4 py-4"
                />
              ))}
            </div>
          ) : null}

          {project.outcomes.length > 0 ? (
            <div className="mb-12">
              <p className="text-label mb-4">Key outcomes</p>
              <ul className="space-y-3">
                {project.outcomes.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted text-[15px] leading-relaxed">
                    <span className="text-accent mt-2 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <BlogContentBlocks blocks={project.content} withHeadingIds />

          <div className="mt-14 pt-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-label mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Tag key={s} size="md">
                    {s}
                  </Tag>
                ))}
              </div>
            </div>
            {external ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-sm text-foreground inline-flex items-center gap-1.5 link-underline shrink-0"
              >
                Live project <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="site-container pb-20 md:pb-28 border-t border-border-subtle pt-14">
          <p className="text-label mb-8">More case studies</p>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {related.map((p) => (
              <Link
                key={p.id}
                href={projectCaseStudyHref(p)}
                className="group p-6 rounded-2xl border border-border-subtle bg-surface hover:border-accent/25 transition-all"
              >
                <p className="mono text-xs text-muted mb-2">{p.year} · {p.role}</p>
                <h3 className="heading text-h3 text-foreground group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <p className="text-muted text-sm mt-2">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
