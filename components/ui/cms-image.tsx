import { resolvePublicAsset } from "@/lib/assets";

interface CmsImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Renders images from `public/` paths or absolute URLs set in the CMS. */
export function CmsImage({ src, alt, className }: CmsImageProps) {
  const resolved = resolvePublicAsset(src);
  if (!resolved) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- CMS paths and external URLs
    <img src={resolved} alt={alt} className={className} loading="lazy" decoding="async" />
  );
}
