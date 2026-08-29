import { saveContent } from "@/lib/admin/client";
import type { SectionMeta } from "@/lib/types";

/** Merge section headers server-side without touching About paragraphs. */
export async function saveSectionHeaders(
  partial: Record<string, SectionMeta>,
) {
  await saveContent("sectionHeaders", partial);
}
