import { seedContent } from "@/lib/seed";
import type { PortfolioContent } from "@/lib/types";
import { projectsToRows } from "./serialize";
import { getDriveClient } from "./sheetsClient";
import { getSheetsClient } from "./sheetsClient";
import {
  BOOTSTRAP_TABS,
  SCHEMA_VERSION,
  SECTION_IDS,
  SHEET_HEADERS,
  SHEET_TABS,
  SPREADSHEET_NAME,
  TAB_ORDER,
  type SheetTab,
} from "./schema";
import { batchUpdateValues } from "./rows";

const APP_MARKER_KEY = "portfolioApp";
const APP_MARKER_VALUE = "1";

export async function findOrCreateSpreadsheet(
  accessToken: string,
  ownerEmail: string | null | undefined
): Promise<string> {
  const drive = getDriveClient(accessToken);

  const byMarker = await drive.files.list({
    q: `appProperties has { key='${APP_MARKER_KEY}' and value='${APP_MARKER_VALUE}' } and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
    fields: "files(id)",
    spaces: "drive",
    pageSize: 1,
  });
  const marked = byMarker.data.files?.[0]?.id;
  if (marked) return marked;

  const byName = await drive.files.list({
    q: `name='${SPREADSHEET_NAME}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
    fields: "files(id)",
    spaces: "drive",
    pageSize: 1,
  });
  const named = byName.data.files?.[0]?.id;
  if (named) {
    await drive.files
      .update({
        fileId: named,
        requestBody: { appProperties: { [APP_MARKER_KEY]: APP_MARKER_VALUE } },
      })
      .catch((err) => console.error("[spreadsheet] failed to backfill marker:", err));
    return named;
  }

  return createSpreadsheet(accessToken, ownerEmail);
}

async function createSpreadsheet(
  accessToken: string,
  ownerEmail: string | null | undefined
): Promise<string> {
  const sheets = getSheetsClient(accessToken);

  const created = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: SPREADSHEET_NAME },
      sheets: TAB_ORDER.map((title, index) => ({
        properties: { sheetId: index, index, title },
      })),
    },
  });

  const spreadsheetId = created.data.spreadsheetId;
  if (!spreadsheetId) throw new Error("Google Sheets did not return a spreadsheetId");

  await batchUpdateValues(sheets, spreadsheetId, buildSeedRanges(ownerEmail));

  const drive = getDriveClient(accessToken);
  await drive.files.update({
    fileId: spreadsheetId,
    requestBody: { appProperties: { [APP_MARKER_KEY]: APP_MARKER_VALUE } },
  });

  return spreadsheetId;
}

function header(tab: SheetTab) {
  return [...SHEET_HEADERS[tab]];
}

function buildSeedRanges(ownerEmail: string | null | undefined) {
  const c = seedContent;
  const now = new Date().toISOString();
  const uuid = () => crypto.randomUUID();

  const profileRows = [
    header(SHEET_TABS.PROFILE),
    ...Object.entries({
      name: c.profile.name,
      firstName: c.profile.firstName,
      lastName: c.profile.lastName,
      role: c.profile.role,
      shortBio: c.profile.shortBio,
      location: c.profile.location,
      email: c.profile.email,
      phone: c.profile.phone,
      website: c.profile.website,
      status: c.profile.status,
      heroCurrentRole: c.profile.heroCurrentRole,
      heroHeadline: c.profile.heroHeadline,
      heroHighlight: c.profile.heroHighlight,
      heroValueProp: c.profile.heroValueProp,
      heroPrimaryCtaLabel: c.profile.heroPrimaryCtaLabel,
      heroPrimaryCtaHref: c.profile.heroPrimaryCtaHref,
      heroSecondaryCtaLabel: c.profile.heroSecondaryCtaLabel,
      heroSecondaryCtaHref: c.profile.heroSecondaryCtaHref,
      footerTagline: c.profile.footerTagline,
      socialGithub: c.profile.socials.github,
      socialLinkedin: c.profile.socials.linkedin,
      socialTwitter: c.profile.socials.twitter,
    }).map(([key, value]) => [key, value]),
  ];

  const sectionRows = [
    header(SHEET_TABS.SECTIONS),
    ...SECTION_IDS.map((id) => [
      id,
      c.sections[id]?.label ?? "",
      c.sections[id]?.title ?? "",
      c.sections[id]?.description ?? "",
    ]),
  ];

  const aboutRows = [
    header(SHEET_TABS.ABOUT),
    ...c.aboutParagraphs.map((text, i) => [uuid(), String(i), text]),
  ];

  const statsRows = [
    header(SHEET_TABS.STATS),
    ...c.stats.map((s, i) => [s.id, s.value, s.label, String(i)]),
  ];

  const achievementsRows = [
    header(SHEET_TABS.ACHIEVEMENTS),
    ...c.achievements.map((a, i) => [
      a.id,
      a.metric,
      a.label,
      a.description,
      a.context,
      String(i),
    ]),
  ];

  const marqueeRows = [
    header(SHEET_TABS.MARQUEE),
    ...c.marquee.map((text, i) => [uuid(), text, String(i)]),
  ];

  const skillRows = [
    header(SHEET_TABS.SKILLS),
    ...Object.entries(c.skills).flatMap(([category, names]) =>
      names.map((name, i) => [uuid(), category, name, String(i)])
    ),
  ];

  const experienceRows = [
    header(SHEET_TABS.EXPERIENCE),
    ...c.experience.map((e, i) => [
      e.id,
      e.company,
      e.role,
      e.location,
      e.period,
      e.current ? "true" : "false",
      e.overview,
      e.technologies.join("|"),
      String(i),
    ]),
  ];

  const experiencePointRows = [
    header(SHEET_TABS.EXPERIENCE_POINTS),
    ...c.experience.flatMap((e) =>
      e.points.map((text, i) => [uuid(), e.id, text, String(i)]),
    ),
  ];

  const experienceImpactRows = [
    header(SHEET_TABS.EXPERIENCE_IMPACT),
    ...c.experience.flatMap((e) =>
      e.impact.map((text, i) => [uuid(), e.id, text, String(i)]),
    ),
  ];

  const experienceMetricRows = [
    header(SHEET_TABS.EXPERIENCE_METRICS),
    ...c.experience.flatMap((e) =>
      e.metrics.map((m, i) => [m.id, e.id, m.value, m.label, String(i)]),
    ),
  ];

  const projectRows = [
    header(SHEET_TABS.PROJECTS),
    ...projectsToRows(c.projects).jobs,
  ];

  const projectOutcomeRows = [
    header(SHEET_TABS.PROJECT_OUTCOMES),
    ...c.projects.flatMap((p) =>
      (p.outcomes ?? []).map((text, i) => [uuid(), p.id, text, String(i)]),
    ),
  ];

  const projectMetricRows = [
    header(SHEET_TABS.PROJECT_METRICS),
    ...c.projects.flatMap((p) =>
      (p.metrics ?? []).map((m, i) => [m.id, p.id, m.value, m.label, String(i)]),
    ),
  ];

  const projectContentRows = [
    header(SHEET_TABS.PROJECT_CONTENT),
    ...c.projects.flatMap((p) =>
      (p.content ?? []).map((block, i) => [
        uuid(),
        p.slug || p.id,
        String(i),
        block.type,
        block.text,
      ]),
    ),
  ];

  const testimonialRows = [
    header(SHEET_TABS.TESTIMONIALS),
    ...c.testimonials.map((t, i) => [
      t.id,
      t.quote,
      t.author,
      t.role,
      t.company,
      t.published ? "true" : "false",
      String(i),
    ]),
  ];

  const educationRows = [
    header(SHEET_TABS.EDUCATION),
    ...c.education.map((e, i) => [e.id, e.school, e.degree, e.period, e.grade, String(i)]),
  ];

  const blogPostRows = [
    header(SHEET_TABS.BLOG_POSTS),
    ...c.blogPosts.map((p, i) => [
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
    ]),
  ];

  const blogContentRows = [
    header(SHEET_TABS.BLOG_CONTENT),
    ...c.blogPosts.flatMap((p) =>
      p.content.map((block, i) => [uuid(), p.slug, String(i), block.type, block.text])
    ),
  ];

  const blogCategoryRows = [
    header(SHEET_TABS.BLOG_CATEGORIES),
    ...c.blogCategories.map((name, i) => [name, String(i)]),
  ];

  const metaRows = [
    header(SHEET_TABS.META),
    ["schemaVersion", SCHEMA_VERSION],
    ["ownerEmail", ownerEmail ?? ""],
    ["createdAt", now],
  ];

  return [
    { range: `${SHEET_TABS.PROFILE}!A1`, values: profileRows },
    { range: `${SHEET_TABS.SECTIONS}!A1`, values: sectionRows },
    { range: `${SHEET_TABS.ABOUT}!A1`, values: aboutRows },
    { range: `${SHEET_TABS.STATS}!A1`, values: statsRows },
    { range: `${SHEET_TABS.ACHIEVEMENTS}!A1`, values: achievementsRows },
    { range: `${SHEET_TABS.MARQUEE}!A1`, values: marqueeRows },
    { range: `${SHEET_TABS.SKILLS}!A1`, values: skillRows },
    { range: `${SHEET_TABS.EXPERIENCE}!A1`, values: experienceRows },
    { range: `${SHEET_TABS.EXPERIENCE_POINTS}!A1`, values: experiencePointRows },
    { range: `${SHEET_TABS.EXPERIENCE_IMPACT}!A1`, values: experienceImpactRows },
    { range: `${SHEET_TABS.EXPERIENCE_METRICS}!A1`, values: experienceMetricRows },
    { range: `${SHEET_TABS.PROJECTS}!A1`, values: projectRows },
    { range: `${SHEET_TABS.PROJECT_OUTCOMES}!A1`, values: projectOutcomeRows },
    { range: `${SHEET_TABS.PROJECT_METRICS}!A1`, values: projectMetricRows },
    { range: `${SHEET_TABS.PROJECT_CONTENT}!A1`, values: projectContentRows },
    { range: `${SHEET_TABS.TESTIMONIALS}!A1`, values: testimonialRows },
    { range: `${SHEET_TABS.EDUCATION}!A1`, values: educationRows },
    { range: `${SHEET_TABS.BLOG_POSTS}!A1`, values: blogPostRows },
    { range: `${SHEET_TABS.BLOG_CONTENT}!A1`, values: blogContentRows },
    { range: `${SHEET_TABS.BLOG_CATEGORIES}!A1`, values: blogCategoryRows },
    { range: `${SHEET_TABS.META}!A1`, values: metaRows },
  ];
}

export { BOOTSTRAP_TABS };
