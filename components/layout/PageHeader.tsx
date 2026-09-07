import { AuroraSectionHeader } from "@/components/aurora/AuroraSectionHeader";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  label,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("site-container pt-24 pb-10 md:pt-28 md:pb-14", className)}>
      <AuroraSectionHeader
        label={label}
        title={title}
        description={description}
        align="left"
      />
    </div>
  );
}
