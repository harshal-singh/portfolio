import { cn, formatSectionKick } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "split" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "split",
}: SectionHeaderProps) {
  if (align === "left" || align === "center") {
    return (
      <div
        className={cn(
          "aurora-section-head mb-10",
          align === "left" && "text-left",
          className,
        )}
      >
        <p className="aurora-kick">{formatSectionKick(label)}</p>
        <h2 className="jk">{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-6",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="aurora-kick">{formatSectionKick(label)}</p>
        <h2 className="jk text-[clamp(1.7rem,3.8vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.035em]">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
