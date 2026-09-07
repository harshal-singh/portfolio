const SKILL_ICON_MAP: Record<string, string> = {
  typescript: "/icons/tech/typescript.svg",
  javascript: "/icons/tech/javascript.svg",
  html5: "/icons/tech/html5.svg",
  css3: "/icons/tech/css3.svg",
  "react.js": "/icons/tech/react.svg",
  react: "/icons/tech/react.svg",
  "next.js": "/icons/tech/nextdotjs.svg",
  "tailwind css": "/icons/tech/tailwindcss.svg",
  tailwind: "/icons/tech/tailwindcss.svg",
  "vue.js": "/icons/tech/vuedotjs.svg",
  vue: "/icons/tech/vuedotjs.svg",
  "node.js": "/icons/tech/nodedotjs.svg",
  node: "/icons/tech/nodedotjs.svg",
  "express.js": "/icons/tech/express.svg",
  express: "/icons/tech/express.svg",
  "rest apis": "/icons/tech/openapi.svg",
  rest: "/icons/tech/openapi.svg",
  graphql: "/icons/tech/graphql.svg",
  hasura: "/icons/tech/hasura.svg",
  php: "/icons/tech/php.svg",
  mysql: "/icons/tech/mysql.svg",
  mongodb: "/icons/tech/mongodb.svg",
  aws: "/icons/tech/aws.svg",
  docker: "/icons/tech/docker.svg",
  "azure devops": "/icons/tech/azuredevops.svg",
  "ci/cd": "/icons/tech/githubactions.svg",
  cicd: "/icons/tech/githubactions.svg",
  "bash scripting": "/icons/tech/gnubash.svg",
  bash: "/icons/tech/gnubash.svg",
  git: "/icons/tech/git.svg",
  github: "/icons/tech/github.svg",
  jira: "/icons/tech/jira.svg",
  figma: "/icons/tech/figma.svg",
  sketch: "/icons/tech/sketch.svg",
  postman: "/icons/tech/postman.svg",
  cursor: "/icons/tech/cursor.svg",
  "claude code": "/icons/tech/claude.svg",
  claude: "/icons/tech/claude.svg",
};

export function iconsForSkills(skills: string[]): string[] {
  const seen = new Set<string>();
  const icons: string[] = [];

  for (const skill of skills) {
    const icon = SKILL_ICON_MAP[skill.trim().toLowerCase()];
    if (icon && !seen.has(icon)) {
      seen.add(icon);
      icons.push(icon);
    }
  }

  return icons;
}
