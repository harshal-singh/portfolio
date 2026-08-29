import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "split";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "split",
}: SectionHeaderProps) {
  if (align === "left") {
    return (
      <div className={cn("mb-14", className)}>
        <p className="text-label text-accent mb-3">{label}</p>
        <h2 className="text-h1 text-foreground text-balance">{title}</h2>
        {description ? (
          <p className="mt-4 text-body text-muted max-w-2xl">{description}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-end justify-between flex-wrap mb-14",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="text-label text-accent mb-3">{label}</p>
        <h2 className="text-h1 text-foreground text-balance">{title}</h2>
      </div>
      {description ? (
        <p className="mt-4 text-body text-muted leading-relaxed text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}
