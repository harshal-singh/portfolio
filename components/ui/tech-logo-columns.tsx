"use client";

import { cn } from "@/lib/utils";

export interface TechLogoItem {
  name: string;
  src: string;
}

/** Left column (scrolls down) — frontend, UI, and product craft */
const TECH_LOGO_COLUMN_DOWN: TechLogoItem[] = [
  { name: "React", src: "/icons/tech/react.svg" },
  { name: "Next.js", src: "/icons/tech/nextdotjs.svg" },
  { name: "TypeScript", src: "/icons/tech/typescript.svg" },
  { name: "Tailwind", src: "/icons/tech/tailwindcss.svg" },
  { name: "Vue", src: "/icons/tech/vuedotjs.svg" },
  { name: "Figma", src: "/icons/tech/figma.svg" },
  // { name: "GraphQL", src: "/icons/tech/graphql.svg" },
  // { name: "Cursor", src: "/icons/tech/cursor.svg" },
  // { name: "Claude", src: "/icons/tech/claude.svg" },
];

/** Right column (scrolls up) — backend, cloud, data, and delivery */
const TECH_LOGO_COLUMN_UP: TechLogoItem[] = [
  { name: "Node.js", src: "/icons/tech/nodedotjs.svg" },
  { name: "Docker", src: "/icons/tech/docker.svg" },
  { name: "AWS", src: "/icons/tech/aws.svg" },
  { name: "MySQL", src: "/icons/tech/mysql.svg" },
  { name: "MongoDB", src: "/icons/tech/mongodb.svg" },
  { name: "Git", src: "/icons/tech/git.svg" },
  // { name: "GitHub", src: "/icons/tech/github.svg" },
  // { name: "Bitbucket", src: "/icons/tech/bitbucket.svg" },
  // { name: "Jira", src: "/icons/tech/jira.svg" },
];

/** Fixed slot height keeps the -50% loop seam pixel-perfect */
const ITEM_SLOT_CLASS =
  "h-14 flex flex-col items-center justify-center shrink-0";

/** Fixed slot width keeps horizontal loop seam pixel-perfect */
const ITEM_SLOT_HORIZONTAL_CLASS =
  "w-14 flex items-center justify-center shrink-0";

function techIconKey(item: TechLogoItem, index: number): string {
  return `${item.src}-${index}`;
}

interface TechLogoScrollColumnsProps {
  className?: string;
  columnClassName?: string;
  showLabels?: boolean;
}

function TechLogoIcon({
  item,
  showLabels,
}: {
  item: TechLogoItem;
  showLabels?: boolean;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- local brand icons, dimmed */}
      <img
        src={item.src}
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 opacity-40"
        loading="eager"
        decoding="async"
      />
      {showLabels ? (
        <span className="mono text-[9px] uppercase tracking-wider text-muted/40 text-center leading-none mt-1">
          {item.name}
        </span>
      ) : null}
    </>
  );
}

function TechLogoColumn({
  items,
  direction,
  showLabels,
}: {
  items: TechLogoItem[];
  direction: "down" | "up";
  showLabels?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className="relative flex-1 min-w-18 max-w-22 h-full overflow-hidden"
      aria-hidden
    >
      <ul
        className={cn(
          "flex flex-col items-center gap-8 list-none m-0 p-0",
          direction === "down" ? "tech-scroll-down" : "tech-scroll-up",
        )}
      >
        {loop.map((item, i) => (
          <li key={techIconKey(item, i)} className={ITEM_SLOT_CLASS}>
            <TechLogoIcon item={item} showLabels={showLabels} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechLogoRow({
  items,
  direction,
  showLabels,
}: {
  items: TechLogoItem[];
  direction: "left" | "right";
  showLabels?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-1" aria-hidden>
      <ul
        className={cn(
          "flex flex-row items-center gap-8 list-none m-0 p-0 w-max",
          direction === "left" ? "tech-scroll-left" : "tech-scroll-right",
        )}
      >
        {loop.map((item, i) => (
          <li key={techIconKey(item, i)} className={ITEM_SLOT_HORIZONTAL_CLASS}>
            <TechLogoIcon item={item} showLabels={showLabels} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechLogoScrollColumns({
  className,
  columnClassName,
  showLabels = false,
}: TechLogoScrollColumnsProps) {
  return (
    <>
      {/* Mobile: two horizontal rows, opposite directions */}
      <div
        className={cn(
          "lg:hidden relative w-full space-y-8 py-2",
          "mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
          className,
        )}
        aria-label="Technologies"
      >
        <TechLogoRow
          items={TECH_LOGO_COLUMN_DOWN}
          direction="left"
          showLabels={showLabels}
        />
        <TechLogoRow
          items={TECH_LOGO_COLUMN_UP}
          direction="right"
          showLabels={showLabels}
        />
      </div>

      {/* Desktop: two vertical columns, opposite directions */}
      <div
        className={cn(
          "hidden lg:flex relative gap-3 h-full min-h-70 max-h-[min(520px,70vh)]",
          "mask-[linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]",
          className,
        )}
        aria-label="Technologies"
      >
        <div className={cn("flex gap-3 h-full w-full", columnClassName)}>
          <TechLogoColumn
            items={TECH_LOGO_COLUMN_DOWN}
            direction="down"
            showLabels={showLabels}
          />
          <TechLogoColumn
            items={TECH_LOGO_COLUMN_UP}
            direction="up"
            showLabels={showLabels}
          />
        </div>
      </div>
    </>
  );
}

export { TECH_LOGO_COLUMN_DOWN, TECH_LOGO_COLUMN_UP };
