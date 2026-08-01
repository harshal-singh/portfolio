/** Tab layout for the portfolio CMS spreadsheet. */

export const SPREADSHEET_NAME = "Portfolio — Site Content";

export const SHEET_TABS = {
  PROFILE: "Profile",
  SECTIONS: "Sections",
  ABOUT: "AboutParagraphs",
  STATS: "Stats",
  MARQUEE: "Marquee",
  SKILLS: "Skills",
  EXPERIENCE: "Experience",
  EXPERIENCE_POINTS: "ExperiencePoints",
  PROJECTS: "Projects",
  EDUCATION: "Education",
  BLOG_POSTS: "BlogPosts",
  BLOG_CONTENT: "BlogContent",
  BLOG_CATEGORIES: "BlogCategories",
  META: "_Meta",
} as const;

export type SheetTab = (typeof SHEET_TABS)[keyof typeof SHEET_TABS];

export const SHEET_COL_RANGE = "A:Z";
export const SHEET_DATA_RANGE = "A2:Z";

export const SHEET_HEADERS: Record<SheetTab, readonly string[]> = {
  [SHEET_TABS.PROFILE]: ["key", "value"],
  [SHEET_TABS.SECTIONS]: ["id", "label", "title", "description"],
  [SHEET_TABS.ABOUT]: ["id", "sortOrder", "text"],
  [SHEET_TABS.STATS]: ["id", "value", "label", "sortOrder"],
  [SHEET_TABS.MARQUEE]: ["id", "text", "sortOrder"],
  [SHEET_TABS.SKILLS]: ["id", "category", "name", "sortOrder"],
  [SHEET_TABS.EXPERIENCE]: [
    "id",
    "company",
    "role",
    "location",
    "period",
    "current",
    "sortOrder",
  ],
  [SHEET_TABS.EXPERIENCE_POINTS]: ["id", "experienceId", "text", "sortOrder"],
  [SHEET_TABS.PROJECTS]: [
    "id",
    "name",
    "tagline",
    "description",
    "stack",
    "year",
    "role",
    "link",
    "accent",
    "sortOrder",
  ],
  [SHEET_TABS.EDUCATION]: ["id", "school", "degree", "period", "grade", "sortOrder"],
  [SHEET_TABS.BLOG_POSTS]: [
    "slug",
    "title",
    "excerpt",
    "category",
    "readTime",
    "date",
    "cover",
    "tags",
    "published",
    "sortOrder",
  ],
  [SHEET_TABS.BLOG_CONTENT]: ["id", "slug", "sortOrder", "type", "text"],
  [SHEET_TABS.BLOG_CATEGORIES]: ["name", "sortOrder"],
  [SHEET_TABS.META]: ["key", "value"],
};

export const TAB_ORDER: SheetTab[] = [
  SHEET_TABS.PROFILE,
  SHEET_TABS.SECTIONS,
  SHEET_TABS.ABOUT,
  SHEET_TABS.STATS,
  SHEET_TABS.MARQUEE,
  SHEET_TABS.SKILLS,
  SHEET_TABS.EXPERIENCE,
  SHEET_TABS.EXPERIENCE_POINTS,
  SHEET_TABS.PROJECTS,
  SHEET_TABS.EDUCATION,
  SHEET_TABS.BLOG_POSTS,
  SHEET_TABS.BLOG_CONTENT,
  SHEET_TABS.BLOG_CATEGORIES,
  SHEET_TABS.META,
];

export const BOOTSTRAP_TABS: SheetTab[] = TAB_ORDER.filter((t) => t !== SHEET_TABS.META);

export const TAB_GID: Record<SheetTab, number> = Object.fromEntries(
  TAB_ORDER.map((tab, index) => [tab, index])
) as Record<SheetTab, number>;

export const SCHEMA_VERSION = "1";

export const PROFILE_KEYS = [
  "name",
  "firstName",
  "lastName",
  "role",
  "shortBio",
  "location",
  "email",
  "phone",
  "website",
  "status",
  "heroCurrentRole",
  "footerTagline",
  "socialGithub",
  "socialLinkedin",
  "socialTwitter",
] as const;

export const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "projects",
  "blogTeaser",
  "education",
  "blog",
] as const;
