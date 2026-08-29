import type { Experience } from "@/lib/types";

/** Ensure array fields exist — legacy sheet rows and cached content may omit Phase 4 fields. */
export function normalizeExperience(job: Experience): Experience {
  return {
    ...job,
    overview: job.overview ?? "",
    points: job.points ?? [],
    impact: job.impact ?? [],
    technologies: job.technologies ?? [],
    metrics: job.metrics ?? [],
  };
}

export function normalizeExperienceList(jobs: Experience[]): Experience[] {
  return jobs.map(normalizeExperience);
}
