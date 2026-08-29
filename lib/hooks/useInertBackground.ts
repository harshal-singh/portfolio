import { useEffect } from "react";

export function useInertBackground(
  active: boolean,
  selectors: string[] = ["#main-content", "footer"],
) {
  useEffect(() => {
    if (!active) return;

    const elements = selectors
      .map((selector) => document.querySelector<HTMLElement>(selector))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => el.setAttribute("inert", ""));

    return () => {
      elements.forEach((el) => el.removeAttribute("inert"));
    };
  }, [active, selectors]);
}
