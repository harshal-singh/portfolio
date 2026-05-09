// Mock data for Harshal Singh's portfolio — replaced by backend later

export const profile = {
  name: "Harshal Singh",
  firstName: "Harshal",
  lastName: "Singh",
  role: "Software Engineer",
  shortBio:
    "Full-stack engineer with 5+ years building scalable web apps. I craft fast, accessible interfaces and ship reliable systems with React, Next.js & Node.",
  location: "Mumbai, India",
  email: "harshal.wrk@gmail.com",
  phone: "+91 88289 84985",
  website: "harshal-singh.vercel.app",
  status: "Open to Opportunities",
  socials: {
    github: "https://github.com/harshal-singh",
    linkedin: "https://linkedin.com/in/harshal-singh-56a55a236",
    twitter: "https://x.com/harshal_8ingh",
  },
  stats: [
    { value: "5+", label: "Years building products" },
    { value: "30+", label: "Shipped projects" },
    { value: "35%", label: "Avg. perf. uplift" },
    { value: "10", label: "M.Sc. SGPA" },
  ],
};

export const skills: Record<string, string[]> = {
  Frontend: [
    "React.js",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "GraphQL",
    "Hasura",
    "Socket.io",
    "PHP / Laravel",
  ],
  Database: ["MongoDB", "PostgreSQL", "MySQL"],
  DevOps: ["AWS", "Docker", "Nginx", "Azure DevOps", "GitHub Actions", "Bash"],
  Tooling: ["Git", "Figma", "REST", "JWT", "Postman"],
};

export const experience = [
  {
    id: "webol",
    company: "Webol",
    role: "Frontend Developer",
    location: "Mumbai, India",
    period: "Jul 2025 — Present",
    current: true,
    points: [
      "Building dynamic web apps with Vue.js, Laravel, PHP and MySQL.",
      "Translating Sketch designs into pixel-perfect, cross-browser UIs.",
      "Integrating Vue components into Laravel for reactive UX with clean separation.",
    ],
  },
  {
    id: "atrina",
    company: "Atrina Technologies",
    role: "Next.js Developer",
    location: "Mumbai, India",
    period: "Aug 2024 — May 2025",
    points: [
      "Led a full CMS revamp on Next.js with SSR — 35% faster page loads, better SEO.",
      "Containerized apps with Docker, automated CI/CD via Azure DevOps & GitHub Actions — 50% faster releases.",
      "Defined API contracts with backend, cutting integration issues by 90%.",
      "Authored onboarding playbook reducing new-joiner ramp-up by 40%.",
    ],
  },
  {
    id: "freelance",
    company: "Independent Contractor",
    role: "Full-Stack Developer",
    location: "Mumbai, India",
    period: "Jul 2022 — Sep 2024",
    points: [
      "Shipped scalable apps with React, Next.js, TypeScript, Hasura, GraphQL & Postgres.",
      "Optimized REST APIs with AWS Lambda & Express — 25% latency reduction.",
      "Drove code-review culture across freelance teams to lift overall quality.",
    ],
  },
  {
    id: "quadb",
    company: "Quadb Technologies",
    role: "Web Developer",
    location: "Ludhiana, India",
    period: "Feb 2021 — Feb 2022",
    points: [
      "Engineered secure server-side apps with Node.js, Express & JWT.",
      "Mentored a small dev team — sprint planning, task delegation, reviews.",
      "Translated Figma / Adobe XD designs into responsive HTML/CSS/JS.",
    ],
  },
];

export const projects = [
  {
    id: "pragnyapan",
    name: "Pragnyapan.ai",
    tagline: "AI marketing platform rooted in ancient wisdom.",
    description:
      "An AI-powered marketing platform that fuses Gemini-driven content generation with timeless philosophical frameworks — helping brands craft value-aligned, emotionally resonant messaging.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Gemini AI"],
    year: "2024",
    role: "Lead Engineer",
    link: "https://pragnyapan-ai.vercel.app/",
    accent: "lime",
  },
  {
    id: "meetspace",
    name: "MeetSpace",
    tagline: "Real-time WebRTC video meetings, instant rooms.",
    description:
      "A peer-to-peer video conferencing platform with instant room creation, low-latency signaling and persistent rooms — built end-to-end with WebRTC and Socket.io.",
    stack: ["WebRTC", "Node.js", "Socket.io", "MongoDB"],
    year: "2023",
    role: "Solo Build",
    link: "https://meet-spacee.vercel.app/",
    accent: "white",
  },
  {
    id: "cms-revamp",
    name: "Atrina CMS",
    tagline: "SSR-first CMS revamp, 35% faster.",
    description:
      "Re-platformed a legacy company website on Next.js with full SSR, image optimization and a clean editor workflow — measurable SEO and Core Web Vitals gains.",
    stack: ["Next.js", "SSR", "Docker", "Azure DevOps"],
    year: "2024",
    role: "Tech Lead",
    link: "#",
    accent: "lime",
  },
  {
    id: "pipeline",
    name: "CI/CD Pipeline Kit",
    tagline: "Reusable Docker + GitHub Actions templates.",
    description:
      "A set of opinionated CI/CD templates and Docker images that take new projects from commit to production in under a day. Used internally across freelance projects.",
    stack: ["Docker", "GitHub Actions", "Bash", "Nginx"],
    year: "2023",
    role: "Solo Build",
    link: "#",
    accent: "white",
  },
];

export const education = [
  {
    school: "Kishinchand Chellaram College",
    degree: "M.Sc. Information Technology",
    period: "Sep 2022 — Apr 2024",
    grade: "O · 10 SGPA",
  },
  {
    school: "Lala Lajpat Rai College",
    degree: "B.Sc. Information Technology",
    period: "Jul 2019 — Apr 2022",
    grade: "A+ · 9.5 CGPI",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  cover: string;
  tags: string[];
  content: { type: string; text: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-ssr-nextjs-35-percent-faster",
    title: "Shipping SSR on Next.js: how I cut page loads by 35%",
    excerpt:
      "A pragmatic walk-through of the rendering, caching and image strategies behind a real CMS revamp — including the trade-offs nobody talks about.",
    category: "Next.js",
    readTime: "9 min read",
    date: "Jun 24, 2025",
    cover: "gradient-1",
    tags: ["Next.js", "Performance", "SSR"],
    content: [
      {
        type: "p",
        text: "When I joined Atrina to lead the CMS revamp, the legacy stack was a tangle of client-side rendering, oversized hero images and a CDN that was barely doing its job. The brief was simple: make it fast, make it Google-friendly, ship in a quarter.",
      },
      {
        type: "h2",
        text: "1. Pick the rendering strategy per route",
      },
      {
        type: "p",
        text: "Next.js gives you SSR, SSG, ISR and client-only — and the temptation is to default to one. Don't. Marketing pages are SSG with ISR, dashboards stay client-side, the blog is ISR with on-demand revalidation. Treat it as a per-route decision.",
      },
      {
        type: "code",
        text: 'export const revalidate = 60; // ISR — refresh in the background',
      },
      {
        type: "h2",
        text: "2. Image pipeline is 60% of the win",
      },
      {
        type: "p",
        text: "Most performance regressions I've seen on Next sites come from images. AVIF + responsive sizes + a good CDN beats almost any JS optimization you'll do.",
      },
      { type: "h2", text: "3. Measure, don't vibe" },
      {
        type: "p",
        text: "Lighthouse is a starting point. Real user monitoring with Web Vitals beats it every time — 35% in the lab is meaningless if p75 LCP doesn't move in the field.",
      },
    ],
  },
  {
    slug: "docker-azure-devops-50-percent-faster-releases",
    title:
      "Docker + Azure DevOps: a CI/CD recipe that halves release time",
    excerpt:
      "The exact pipeline structure, caching tricks and image layering rules that took our deploys from 18 minutes to under 9.",
    category: "DevOps",
    readTime: "11 min read",
    date: "May 12, 2025",
    cover: "gradient-2",
    tags: ["Docker", "CI/CD", "Azure"],
    content: [
      {
        type: "p",
        text: "Slow pipelines kill momentum. Every minute a deploy takes is a minute someone is context-switching out of focus. Here's the pipeline shape I now use as a template.",
      },
      { type: "h2", text: "Multi-stage Dockerfiles" },
      {
        type: "p",
        text: "A two-stage Dockerfile with a slim runtime base is non-negotiable. Build dependencies should never ship to production.",
      },
      {
        type: "code",
        text: 'FROM node:20-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=build /app/.next ./.next\nCMD ["npm", "start"]',
      },
      { type: "h2", text: "Cache like you mean it" },
      {
        type: "p",
        text: "Azure DevOps cache tasks on node_modules and the .next/cache directory shaved nearly 7 minutes off cold builds in our case.",
      },
    ],
  },
  {
    slug: "design-systems-tailwind-real-world",
    title:
      "Design systems with Tailwind: lessons from real-world products",
    excerpt:
      "Tokens, primitives, and the discipline it takes to keep a Tailwind codebase from devolving into utility-class soup.",
    category: "Design Systems",
    readTime: "7 min read",
    date: "Apr 03, 2025",
    cover: "gradient-3",
    tags: ["Tailwind", "Design Systems", "React"],
    content: [
      {
        type: "p",
        text: "Tailwind makes it ridiculously fast to ship UI. It also makes it ridiculously easy to ship inconsistent UI. The fix is not to abandon utilities — it's to put a thin layer of design intent on top of them.",
      },
      { type: "h2", text: "Tokens as the source of truth" },
      {
        type: "p",
        text: "Define tokens for color, spacing and radius in your config. If a value isn't in there, it shouldn't be on the page.",
      },
      { type: "h2", text: "Primitives over snippets" },
      {
        type: "p",
        text: "A Button with three variants beats fifty hand-rolled buttons. Same for Card, Input and Badge. Pair this with shadcn-style copy-in components and you get the best of both worlds.",
      },
    ],
  },
  {
    slug: "webrtc-meetspace-build-log",
    title:
      "Build log: shipping a real-time video app with WebRTC & Socket.io",
    excerpt:
      "What I learned wiring up signaling, ICE servers and connection recovery for MeetSpace — the unsexy parts of real-time.",
    category: "Engineering",
    readTime: "13 min read",
    date: "Feb 18, 2025",
    cover: "gradient-4",
    tags: ["WebRTC", "Node.js", "Real-time"],
    content: [
      {
        type: "p",
        text: "WebRTC is one of those technologies that feels like magic for the first ten minutes and like quicksand for the next ten weeks. Here are the things I wish I'd known before starting MeetSpace.",
      },
      { type: "h2", text: "Signaling is the easy part" },
      {
        type: "p",
        text: "Most tutorials stop after a working signaling server. That's about 20% of the actual work — the other 80% is reconnection, ICE restarts and graceful degradation.",
      },
      { type: "h2", text: "You will need a TURN server" },
      {
        type: "p",
        text: "Symmetric NATs are everywhere. STUN-only setups will look perfect in dev and break for half your users in prod. Budget for TURN.",
      },
    ],
  },
  {
    slug: "typescript-discriminated-unions",
    title:
      "TypeScript discriminated unions: the pattern I reach for daily",
    excerpt:
      "How a small modeling discipline turns runtime branches into compile-time guarantees — and makes refactors fearless.",
    category: "TypeScript",
    readTime: "6 min read",
    date: "Jan 09, 2025",
    cover: "gradient-5",
    tags: ["TypeScript", "Patterns"],
    content: [
      {
        type: "p",
        text: "Most TypeScript bugs I see in code review boil down to the same thing: a state was modeled as a bag of optional fields when it should have been a discriminated union.",
      },
      { type: "h2", text: "The shape" },
      {
        type: "code",
        text: "type Result<T> =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; error: string };",
      },
      {
        type: "p",
        text: "Now you can't accidentally read .data while loading. The compiler stops you. That's the whole game.",
      },
    ],
  },
  {
    slug: "react-server-components-mental-model",
    title: "A working mental model for React Server Components",
    excerpt:
      "After a year of shipping with RSC in production, here's the framing that finally made it click for my team.",
    category: "React",
    readTime: "10 min read",
    date: "Dec 01, 2024",
    cover: "gradient-6",
    tags: ["React", "Next.js", "RSC"],
    content: [
      {
        type: "p",
        text: "Server Components confused everyone on my team for the first month. Here's the framing that finally got us all on the same page.",
      },
      {
        type: "h2",
        text: "Server is the default; client is an opt-in",
      },
      {
        type: "p",
        text: "Flip the mental model. By default, your component runs on the server, has zero JS cost on the client, and can talk to your data layer directly. You only opt into the client when you need interactivity.",
      },
    ],
  },
];

export const blogCategories = [
  "All",
  "Next.js",
  "DevOps",
  "Design Systems",
  "Engineering",
  "TypeScript",
  "React",
];

export const gradientMap: Record<string, string> = {
  "gradient-1": "from-accent/30 via-emerald-500/10 to-transparent",
  "gradient-2": "from-cyan-400/25 via-blue-500/10 to-transparent",
  "gradient-3": "from-rose-400/25 via-orange-500/10 to-transparent",
  "gradient-4": "from-violet-400/25 via-fuchsia-500/10 to-transparent",
  "gradient-5": "from-amber-300/30 via-orange-500/10 to-transparent",
  "gradient-6": "from-teal-300/25 via-emerald-500/10 to-transparent",
};
