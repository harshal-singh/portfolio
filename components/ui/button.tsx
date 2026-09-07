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
          "inline-flex cursor-pointer items-center justify-center font-medium transition-all active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            default: "aurora-pill",
            outline: "aurora-ghost",
            ghost:
              "rounded-full px-4 py-2 text-sm text-muted hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10",
            secondary: "aurora-ghost",
          }[variant],
          variant === "default" && {
            default: "",
            sm: "!px-3 !py-1.5 !text-xs",
            lg: "!px-6 !py-3 !text-base",
          }[size],
          variant !== "default" && {
            default: "h-10 px-4 py-2 text-sm rounded-full",
            sm: "h-9 px-3 text-xs rounded-full",
            lg: "h-11 px-6 text-base rounded-full",
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
