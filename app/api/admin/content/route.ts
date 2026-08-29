import { NextResponse } from "next/server";
import { revalidatePortfolioContent } from "@/lib/content/revalidate";
import { withGoogleAuth } from "@/lib/api/withGoogleAuth";
import { replaceTabData } from "@/lib/google/rows";
import {
  achievementsToRows,
  buildAdminContent,
  experienceToRows,
  profileToRows,
  projectsToRows,
  sectionsToRows,
  testimonialsToRows,
} from "@/lib/google/serialize";
import {
  ensureSpreadsheetSchema,
  readAllTabsWithFallback,
} from "@/lib/google/migrate";
import { BOOTSTRAP_TABS } from "@/lib/google/spreadsheet";
import { SHEET_HEADERS, SHEET_TABS } from "@/lib/google/schema";
import type {
  Achievement,
  BlogPost,
  Education,
  Experience,
  Profile,
  Project,
  SectionMeta,
  Stat,
  Testimonial,
} from "@/lib/types";

async function mergeSectionHeaders(
  sheets: Parameters<typeof readAllTabsWithFallback>[0],
  spreadsheetId: string,
  partial: Record<string, SectionMeta>,
) {
  const tabs = await readAllTabsWithFallback(sheets, spreadsheetId, BOOTSTRAP_TABS);
  const current = buildAdminContent(tabs).sections;
  const merged = { ...current, ...partial };
  await replaceTabData(
    sheets,
    spreadsheetId,
    SHEET_TABS.SECTIONS,
    SHEET_HEADERS[SHEET_TABS.SECTIONS],
    sectionsToRows(merged),
  );
}

export const GET = withGoogleAuth(async (_req, { sheets, spreadsheetId }) => {
  await ensureSpreadsheetSchema(sheets, spreadsheetId);
  const tabs = await readAllTabsWithFallback(sheets, spreadsheetId, BOOTSTRAP_TABS);
  const content = buildAdminContent(tabs);
  return NextResponse.json({
    content,
    spreadsheetId,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? null,
    publicReadConfigured: Boolean(
      process.env.PORTFOLIO_SPREADSHEET_ID &&
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ),
  });
});

export const POST = withGoogleAuth(async (req, { sheets, spreadsheetId }) => {
  const body = await req.json();
  const { type, data } = body as { type: string; data: unknown };

  switch (type) {
    case "profile": {
      const profile = data as Profile;
      profile.name = `${profile.firstName} ${profile.lastName}`.trim();
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.PROFILE,
        SHEET_HEADERS[SHEET_TABS.PROFILE],
        profileToRows(profile)
      );
      break;
    }
    case "sectionHeaders": {
      const partial = data as Record<string, SectionMeta>;
      await mergeSectionHeaders(sheets, spreadsheetId, partial);
      break;
    }
    case "sections": {
      const { sections, aboutParagraphs } = data as {
        sections: Record<string, SectionMeta>;
        aboutParagraphs: string[];
      };
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.SECTIONS,
        SHEET_HEADERS[SHEET_TABS.SECTIONS],
        sectionsToRows(sections)
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.ABOUT,
        SHEET_HEADERS[SHEET_TABS.ABOUT],
        aboutParagraphs.map((text, i) => [crypto.randomUUID(), String(i), text])
      );
      break;
    }
    case "stats": {
      const stats = data as Stat[];
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.STATS,
        SHEET_HEADERS[SHEET_TABS.STATS],
        stats.map((s, i) => [s.id || crypto.randomUUID(), s.value, s.label, String(i)])
      );
      break;
    }
    case "achievements": {
      const achievements = data as Achievement[];
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.ACHIEVEMENTS,
        SHEET_HEADERS[SHEET_TABS.ACHIEVEMENTS],
        achievementsToRows(achievements)
      );
      break;
    }
    case "impact": {
      const { achievements, sections } = data as {
        achievements: Achievement[];
        sections: Record<string, SectionMeta>;
      };
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.ACHIEVEMENTS,
        SHEET_HEADERS[SHEET_TABS.ACHIEVEMENTS],
        achievementsToRows(achievements)
      );
      await mergeSectionHeaders(sheets, spreadsheetId, {
        achievements: sections.achievements,
      });
      break;
    }
    case "marquee": {
      const items = data as string[];
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.MARQUEE,
        SHEET_HEADERS[SHEET_TABS.MARQUEE],
        items.map((text, i) => [crypto.randomUUID(), text, String(i)])
      );
      break;
    }
    case "skills": {
      const skills = data as Record<string, string[]>;
      const rows = Object.entries(skills).flatMap(([category, names]) =>
        names.map((name, i) => [crypto.randomUUID(), category, name, String(i)])
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.SKILLS,
        SHEET_HEADERS[SHEET_TABS.SKILLS],
        rows
      );
      break;
    }
    case "experience": {
      const jobs = data as Experience[];
      const rows = experienceToRows(jobs);
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EXPERIENCE,
        SHEET_HEADERS[SHEET_TABS.EXPERIENCE],
        rows.jobs,
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EXPERIENCE_POINTS,
        SHEET_HEADERS[SHEET_TABS.EXPERIENCE_POINTS],
        rows.points,
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EXPERIENCE_IMPACT,
        SHEET_HEADERS[SHEET_TABS.EXPERIENCE_IMPACT],
        rows.impact,
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EXPERIENCE_METRICS,
        SHEET_HEADERS[SHEET_TABS.EXPERIENCE_METRICS],
        rows.metrics,
      );
      break;
    }
    case "projects": {
      const projects = data as Project[];
      const rows = projectsToRows(projects);
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.PROJECTS,
        SHEET_HEADERS[SHEET_TABS.PROJECTS],
        rows.jobs,
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.PROJECT_OUTCOMES,
        SHEET_HEADERS[SHEET_TABS.PROJECT_OUTCOMES],
        rows.outcomes,
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.PROJECT_METRICS,
        SHEET_HEADERS[SHEET_TABS.PROJECT_METRICS],
        rows.metrics,
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.PROJECT_CONTENT,
        SHEET_HEADERS[SHEET_TABS.PROJECT_CONTENT],
        rows.content,
      );
      break;
    }
    case "testimonials": {
      const payload = data as {
        section: SectionMeta;
        testimonials: Testimonial[];
      };
      await mergeSectionHeaders(sheets, spreadsheetId, {
        testimonials: payload.section,
      });
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.TESTIMONIALS,
        SHEET_HEADERS[SHEET_TABS.TESTIMONIALS],
        testimonialsToRows(payload.testimonials),
      );
      break;
    }
    case "education": {
      const education = data as Education[];
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EDUCATION,
        SHEET_HEADERS[SHEET_TABS.EDUCATION],
        education.map((e, i) => [e.id || crypto.randomUUID(), e.school, e.degree, e.period, e.grade, String(i)])
      );
      break;
    }
    case "blog-categories": {
      const categories = data as string[];
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.BLOG_CATEGORIES,
        SHEET_HEADERS[SHEET_TABS.BLOG_CATEGORIES],
        categories.map((name, i) => [name, String(i)])
      );
      break;
    }
    case "blog": {
      const { posts, categories } = data as {
        posts: BlogPost[];
        categories: string[];
      };
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.BLOG_POSTS,
        SHEET_HEADERS[SHEET_TABS.BLOG_POSTS],
        posts.map((p, i) => [
          p.slug,
          p.title,
          p.excerpt,
          p.category,
          p.readTime,
          p.date,
          p.cover,
          p.tags.join("|"),
          p.published ? "true" : "false",
          p.featured ? "true" : "false",
          p.imageUrl ?? "",
          String(i),
        ])
      );
      const contentRows = posts.flatMap((p) =>
        p.content.map((block, i) => [crypto.randomUUID(), p.slug, String(i), block.type, block.text])
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.BLOG_CONTENT,
        SHEET_HEADERS[SHEET_TABS.BLOG_CONTENT],
        contentRows
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.BLOG_CATEGORIES,
        SHEET_HEADERS[SHEET_TABS.BLOG_CATEGORIES],
        categories.map((name, i) => [name, String(i)])
      );
      break;
    }
    default:
      return NextResponse.json({ error: "Unknown save type" }, { status: 400 });
  }

  revalidatePortfolioContent();
  return NextResponse.json({ ok: true });
});
