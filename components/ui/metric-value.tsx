"use client";

import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";

type MetricValueProps = {
  value: string;
  className?: string;
  animated?: boolean;
};

export function MetricValue({ value, className, animated = false }: MetricValueProps) {
  if (animated) {
    return <CountUp value={value} className={className} />;
  }

  return <span className={cn(className)}>{value}</span>;
}
