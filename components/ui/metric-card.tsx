import { MetricValue } from "@/components/ui/metric-value";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  description?: string;
  context?: string;
  variant?: "compact" | "detailed";
  animated?: boolean;
}

export function MetricCard({
  value,
  label,
  description,
  context,
  variant = "compact",
  animated = false,
  className,
  ...props
}: MetricCardProps) {
  if (variant === "detailed") {
    return (
      <div
        className={cn(
          "group relative p-6 md:p-7 rounded-2xl border border-border-subtle bg-surface shadow-sm",
          "hover:border-accent/25 transition-colors",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <MetricValue
            value={value}
            animated={animated}
            className="heading text-4xl md:text-5xl font-semibold text-accent tabular-nums"
          />
          {context ? (
            <span className="mono text-[10px] uppercase tracking-wider text-muted text-right max-w-32.5 leading-snug">
              {context}
            </span>
          ) : null}
        </div>
        <h3 className="heading text-h4 text-foreground mb-2">{label}</h3>
        {description ? (
          <p className="text-caption leading-relaxed">{description}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-center flex flex-col justify-center px-4 py-6 rounded-xl border border-border-subtle bg-surface h-37 sm:h-auto shadow-sm",
        className,
      )}
      {...props}
    >
      <MetricValue
        value={value}
        animated={animated}
        className="heading text-3xl md:text-4xl font-semibold text-foreground tabular-nums"
      />
      <div className="text-label mt-2 normal-case tracking-normal">{label}</div>
    </div>
  );
}
