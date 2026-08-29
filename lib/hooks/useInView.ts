"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  once?: boolean;
  margin?: string;
  threshold?: number;
};

export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): [React.RefObject<T | null>, boolean] {
  const { once = true, margin = "-8% 0px", threshold = 0 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, margin, threshold]);

  return [ref, inView];
}
