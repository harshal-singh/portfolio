import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            default: "bg-accent text-accent-foreground hover:bg-accent-hover",
            outline:
              "border border-border text-foreground hover:border-accent/30 hover:bg-accent-muted",
            ghost: "text-muted hover:text-foreground hover:bg-surface-elevated",
            secondary:
              "bg-surface-elevated text-foreground border border-border-subtle hover:bg-surface",
          }[variant],
          {
            default: "h-10 px-4 py-2 text-sm",
            sm: "h-9 px-3 text-xs",
            lg: "h-11 px-6 text-base",
          }[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button };
