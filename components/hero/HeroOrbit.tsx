import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

const ORBIT_PILLS = ["React", "Next.js", "TypeScript", "Node.js"] as const;

const PILL_DELAYS = ["400ms", "550ms", "700ms", "850ms"] as const;

type HeroOrbitProps = {
  className?: string;
};

export function HeroOrbit({ className }: HeroOrbitProps) {
  return (
    <div
      className={cn(
        "hero-orbit-stage relative mx-auto w-[min(340px,90vw)] h-[340px]",
        className,
      )}
      aria-hidden
    >
      <div className="hero-orbit-ring absolute inset-0 rounded-full border border-dashed border-border-subtle" />
      <div className="hero-orbit-ring hero-orbit-ring-inner absolute inset-10 rounded-full border border-dashed border-border-subtle" />

      {ORBIT_PILLS.map((label, index) => (
        <span
          key={label}
          className={cn(
            "hero-orbit-pill mono absolute rounded-full border border-border bg-surface px-3 py-1.5 text-[0.7rem] text-muted whitespace-nowrap",
            `hero-orbit-pill-${index}`,
          )}
          style={{ animationDelay: `${PILL_DELAYS[index]}, ${PILL_DELAYS[index]}` }}
        >
          {label}
        </span>
      ))}

      <div className="hero-orbit-core absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/25 bg-accent-muted">
        <Zap className="h-7 w-7 text-accent" strokeWidth={1.75} aria-hidden />
      </div>
    </div>
  );
}

export { ORBIT_PILLS };
