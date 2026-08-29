import { CmsImage } from "@/components/ui/cms-image";
import type { BlogPostMeta } from "@/lib/blog/postMeta";
import { gradientMap } from "@/lib/seed";
import { cn } from "@/lib/utils";

type BlogCoverPost = Pick<
  BlogPostMeta,
  "cover" | "category" | "imageUrl" | "title"
>;

interface BlogCoverMediaProps {
  post: BlogCoverPost;
  className?: string;
  showCategoryWatermark?: boolean;
  watermarkClassName?: string;
}

export function BlogCoverMedia({
  post,
  className,
  showCategoryWatermark = true,
  watermarkClassName,
}: BlogCoverMediaProps) {
  if (post.imageUrl?.trim()) {
    return (
      <CmsImage
        src={post.imageUrl}
        alt=""
        className={cn("h-full w-full object-cover grayscale-90", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full bg-linear-to-br",
        gradientMap[post.cover] || gradientMap["gradient-1"],
        className,
      )}
    >
      {showCategoryWatermark ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "heading font-bold text-white/4 text-center select-none",
              watermarkClassName ?? "text-5xl lg:text-6xl",
            )}
          >
            {post.category}
          </span>
        </div>
      ) : null}
    </div>
  );
}
