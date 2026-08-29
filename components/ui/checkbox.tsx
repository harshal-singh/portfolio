import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId =
      id ??
      (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

    const box = (
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn("peer sr-only", className)}
          {...props}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded border border-border bg-surface transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:opacity-50"
        />
        <Check
          aria-hidden
          className="relative z-10 h-3 w-3 text-accent-foreground opacity-0 transition-opacity peer-checked:opacity-100"
          strokeWidth={3}
        />
      </span>
    );

    if (!label) return box;

    return (
      <label
        htmlFor={inputId}
        className="flex items-center gap-2.5 cursor-pointer group select-none"
      >
        <span className="mt-0.5">{box}</span>
        <span className="min-w-0">
          <span className="block text-sm text-foreground group-hover:text-foreground transition-colors">
            {label}
          </span>
          {description ? (
            <span className="block text-xs text-muted mt-0.5 leading-relaxed">
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
