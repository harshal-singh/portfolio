/** @deprecated Import from @/lib/seed or use getPortfolioContent() instead. */
export { seedContent, gradientMap } from "./seed";
export type { BlogPost } from "./types";

import { seedContent } from "./seed";
export const profile = seedContent.profile;
export const skills = seedContent.skills;
export const experience = seedContent.experience;
export const projects = seedContent.projects;
export const education = seedContent.education;
export const blogPosts = seedContent.blogPosts;
export const blogCategories = seedContent.blogCategories;
