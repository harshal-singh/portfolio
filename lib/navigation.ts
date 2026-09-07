export interface NavItem {
  label: string;
  href: string;
}

/** Single-page landing — in-page section anchors only */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

export const footerNav: NavItem[] = [];
