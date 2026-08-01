import { NextResponse } from "next/server";
import { revalidatePortfolioContent } from "@/lib/content/revalidate";
import { withGoogleAuth } from "@/lib/api/withGoogleAuth";
import { batchGetAllTabs, replaceTabData } from "@/lib/google/rows";
import { buildAdminContent, profileToRows, sectionsToRows } from "@/lib/google/serialize";
import { BOOTSTRAP_TABS } from "@/lib/google/spreadsheet";
import { SHEET_HEADERS, SHEET_TABS } from "@/lib/google/schema";
import type {
  BlogPost,
  Education,
  Experience,
  Profile,
  Project,
  SectionMeta,
  Stat,
} from "@/lib/types";

export const GET = withGoogleAuth(async (_req, { sheets, spreadsheetId }) => {
  const tabs = await batchGetAllTabs(sheets, spreadsheetId, BOOTSTRAP_TABS);
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
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EXPERIENCE,
        SHEET_HEADERS[SHEET_TABS.EXPERIENCE],
        jobs.map((e, i) => [
          e.id || crypto.randomUUID(),
          e.company,
          e.role,
          e.location,
          e.period,
          e.current ? "true" : "false",
          String(i),
        ])
      );
      const pointRows = jobs.flatMap((e) =>
        e.points.map((text, i) => [crypto.randomUUID(), e.id, text, String(i)])
      );
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.EXPERIENCE_POINTS,
        SHEET_HEADERS[SHEET_TABS.EXPERIENCE_POINTS],
        pointRows
      );
      break;
    }
    case "projects": {
      const projects = data as Project[];
      await replaceTabData(
        sheets,
        spreadsheetId,
        SHEET_TABS.PROJECTS,
        SHEET_HEADERS[SHEET_TABS.PROJECTS],
        projects.map((p, i) => [
          p.id || crypto.randomUUID(),
          p.name,
          p.tagline,
          p.description,
          p.stack.join("|"),
          p.year,
          p.role,
          p.link,
          p.accent,
          String(i),
        ])
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
