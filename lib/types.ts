export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  shortBio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  status: string;
  heroCurrentRole: string;
  heroHeadline: string;
  heroHighlight: string;
  heroValueProp: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  footerTagline: string;
  /** Shown on /contact under the availability status. */
  contactAvailabilityDescription: string;
  /** Contact form section label (defaults to "Send a message"). */
  contactFormLabel: string;
  /** Hint below the contact form label. */
  contactFormHint: string;
  /** Toast after a successful submission. */
  contactFormSuccessMessage: string;
  /** Header / mobile CTA button label. */
  headerContactLabel: string;
  /** Homepage contact CTA button label. */
  contactCtaButtonLabel: string;
  /** Public URL — Google Drive, CDN, or /public path. */
  photoUrl: string;
  /** Link to your designed PDF resume (Google Drive direct link, etc.). */
  resumePdfUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface Achievement {
  id: string;
  metric: string;
  label: string;
  description: string;
  context: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface SectionMeta {
  label: string;
  title: string;
  description: string;
}

export interface ExperienceMetric {
  id: string;
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  overview: string;
  points: string[];
  impact: string[];
  technologies: string[];
  metrics: ExperienceMetric[];
  /** Optional note shown after this role (employment gaps, breaks). */
  gapAfterNote?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  published: boolean;
}

export interface ProjectMetric {
  id: string;
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview: string;
  stack: string[];
  year: string;
  role: string;
  link: string;
  accent: "lime" | "white";
  cover: string;
  featured: boolean;
  outcomes: string[];
  metrics: ProjectMetric[];
  content: BlogBlock[];
  /** Set at read time — not stored in the sheet. */
  hasCaseStudy?: boolean;
  /** Optional screenshot or cover image URL from CMS. */
  imageUrl?: string;
  /** Hover scroll through full-page screenshot on project cards. */
  imageScrollEnabled?: boolean;
  /** Scroll-down duration in ms (admin sets seconds). */
  imageScrollDurationMs?: number;
  /** Return-to-top duration in ms (admin sets seconds). */
  imageScrollReturnMs?: number;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  grade: string;
}

export interface BlogBlock {
  type: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  cover: string;
  imageUrl?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  content: BlogBlock[];
}

export interface PortfolioContent {
  profile: Profile;
  aboutParagraphs: string[];
  sections: Record<string, SectionMeta>;
  stats: Stat[];
  achievements: Achievement[];
  marquee: string[];
  skills: Record<string, string[]>;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  blogPosts: BlogPost[];
  blogCategories: string[];
  testimonials: Testimonial[];
}

export type PortfolioSectionId =
  | "about"
  | "achievements"
  | "skills"
  | "experience"
  | "projects"
  | "testimonials"
  | "blogTeaser"
  | "education"
  | "blog"
  | "contact"
  | "resume"
  | "contactCta";
