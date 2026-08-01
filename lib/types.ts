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
  footerTagline: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
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

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  role: string;
  link: string;
  accent: "lime" | "white";
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
  tags: string[];
  published: boolean;
  content: BlogBlock[];
}

export interface PortfolioContent {
  profile: Profile;
  aboutParagraphs: string[];
  sections: Record<string, SectionMeta>;
  stats: Stat[];
  marquee: string[];
  skills: Record<string, string[]>;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  blogPosts: BlogPost[];
  blogCategories: string[];
}

export type PortfolioSectionId =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "blogTeaser"
  | "education"
  | "blog";
