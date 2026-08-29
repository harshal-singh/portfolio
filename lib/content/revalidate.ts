import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { CONTENT_CACHE_TAG } from "@/lib/constants";

/** Call after any admin write so the public site picks up changes immediately. */
export function revalidatePortfolioContent() {
  revalidateTag(CONTENT_CACHE_TAG, "max");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/experience");
  revalidatePath("/projects");
  revalidatePath("/contact");
  revalidatePath("/resume");
  revalidatePath("/blog");
}
