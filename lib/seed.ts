import type { PortfolioContent } from "./types";

/** Default content — used when the sheet is not configured yet. */
export const seedContent: PortfolioContent = {
  profile: {
    name: "Harshal Singh",
    firstName: "Harshal",
    lastName: "Singh",
    role: "Frontend Engineer",
    shortBio:
      "Frontend Engineer with 3+ years of experience building production web applications using React.js, Next.js, TypeScript, and JavaScript.",
    location: "Mumbai, India · Open to remote",
    email: "harshal.wrk@gmail.com",
    phone: "+91 88289 84985",
    website: "harshal-singh.vercel.app",
    status: "Open to opportunities",
    heroCurrentRole: "Frontend Developer @ Webol Solutions",
    heroHeadline: "I build product interfaces that",
    heroHighlight: "ship faster and scale.",
    heroValueProp:
      "Experienced in reusable UI architecture, SSR-based applications, API integration, performance optimization, and CI/CD. Strong cross-functional experience with product, design, and backend teams, plus hands-on work in Node.js, AWS, Docker, and AI-assisted development.",
    heroPrimaryCtaLabel: "View selected work",
    heroPrimaryCtaHref: "/projects",
    heroSecondaryCtaLabel: "Discuss a role",
    heroSecondaryCtaHref: "/contact",
    footerTagline:
      "Frontend engineer based in Mumbai, open to remote product teams.",
    contactAvailabilityDescription:
      "Open to frontend engineering roles at remote product companies — React, Next.js, TypeScript, and full-stack collaboration. International roles with visa sponsorship welcome.",
    contactFormLabel: "Send a message",
    contactFormHint:
      "Recruiters and hiring managers — include role, team, and stack if you can.",
    contactFormSuccessMessage: "Message sent — I'll respond within 48 hours.",
    headerContactLabel: "Get in touch",
    contactCtaButtonLabel: "Get in touch",
    photoUrl: "/images/profile.jpg",
    resumePdfUrl: "/resume/Harshal Singh - Resume - 2027.pdf",
    socials: {
      github: "https://github.com/harshal-singh",
      linkedin: "https://linkedin.com/in/harshal-singh-56a55a236",
      twitter: "https://x.com/harshal_8ingh",
    },
  },
  aboutParagraphs: [
    "Frontend Engineer with 3+ years of experience building production web applications using React.js, Next.js, TypeScript, and JavaScript. Experienced in reusable UI architecture, SSR-based applications, API integration, performance optimization, and CI/CD.",
    "Strong cross-functional experience working with product, design, and backend teams, with additional hands-on experience in Node.js, AWS, Docker, and AI-assisted development using tools like Cursor and Claude Code.",
  ],
  sections: {
    about: {
      label: "01 — About",
      title: "Engineer who cares about the boring fundamentals.",
      description:
        "Production-focused frontend engineer — performance, architecture, and shipping velocity.",
    },
    achievements: {
      label: "Impact",
      title: "Measurable outcomes from recent work.",
      description: "",
    },
    skills: {
      label: "02 — Stack",
      title: "The toolbelt.",
      description:
        "A mix of what I reach for daily and what I trust in production. New tools earn their place by removing real pain, not by being shiny.",
    },
    experience: {
      label: "03 — Experience",
      title: "Where I've shipped.",
      description: "A short tour of the teams and clients I've built with.",
    },
    projects: {
      label: "04 — Selected Work",
      title: "Things I've built.",
      description:
        "A small set, chosen for the technical depth or the problem they solved.",
    },
    testimonials: {
      label: "07 — Endorsements",
      title: "What colleagues say.",
      description:
        "Recommendations from managers and teammates — add yours via the admin when ready.",
    },
    blogTeaser: {
      label: "05 — Writing",
      title: "Notes from the trench.",
      description: "",
    },
    education: {
      label: "06 — Education",
      title: "Foundations.",
      description: "",
    },
    blog: {
      label: "The Journal",
      title: "Writing about the craft of building software.",
      description:
        "Pragmatic notes from the trench — architecture decisions, performance work, and the small patterns that make codebases pleasant to live in.",
    },
    contact: {
      label: "Contact",
      title: "Let's connect.",
      description:
        "Recruiting for a frontend role, or want to discuss a product team? I'd like to hear from you.",
    },
    resume: {
      label: "Resume",
      title: "Experience at a glance.",
      description:
        "Experience, skills, and education — download the full PDF with one click.",
    },
    contactCta: {
      label: "Open to opportunities",
      title: "Let's talk about your next hire.",
      description:
        "Frontend engineering roles at remote product companies — React, Next.js, TypeScript, and teams offering visa sponsorship.",
    },
  },
  stats: [
    { id: "years", value: "3+", label: "Years in production" },
    { id: "roles", value: "3", label: "Product teams shipped with" },
    { id: "tech", value: "20+", label: "Technologies in use" },
    { id: "onboarding", value: "40%", label: "Faster team onboarding" },
  ],
  achievements: [
    {
      id: "onboarding",
      metric: "40%",
      label: "Faster team onboarding",
      description:
        "Authored developer onboarding documentation that reduced ramp-up time and improved knowledge transfer.",
      context: "Atrina Technologies",
    },
    {
      id: "cms-ssr",
      metric: "SSR",
      label: "CMS rebuild shipped",
      description:
        "Led a CMS frontend rebuild with Next.js and SSR, improving page-load performance, SEO, and application structure.",
      context: "Atrina Technologies",
    },
    {
      id: "roadmap",
      metric: "3 mo",
      label: "Delivery roadmap owned",
      description:
        "Owned technical planning for a quarterly delivery roadmap, aligning frontend execution with product and leadership requirements.",
      context: "Atrina Technologies",
    },
    {
      id: "ai-workflow",
      metric: "AI",
      label: "Faster dev workflows",
      description:
        "Streamlined implementation and debugging with Cursor, Claude Code, and Figma MCP for design-to-code delivery.",
      context: "Webol Solutions",
    },
  ],
  marquee: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "GraphQL",
    "MySQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Azure DevOps",
    "WebRTC",
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
    Frontend: ["React.js", "Next.js", "Tailwind CSS", "Vue.js"],
    Backend: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Hasura", "PHP"],
    Databases: ["MySQL", "MongoDB"],
    DevOps: ["AWS", "Docker", "Azure DevOps", "CI/CD", "Bash Scripting"],
    Tooling: [
      "Git",
      "GitHub",
      "Jira",
      "Figma",
      "Sketch",
      "Postman",
      "Cursor",
      "Claude Code",
    ],
  },
  experience: [
    {
      id: "webol",
      company: "Webol Solutions",
      role: "Frontend Developer",
      location: "Remote, UK",
      period: "Jul 2025 — Present",
      current: true,
      overview:
        "Building production web applications with Next.js, React, and TypeScript — from reusable UI components to API-integrated product features.",
      points: [
        "Engineer production web applications with Next.js, React.js, and TypeScript, building reusable components and responsive interfaces for product features.",
        "Integrate REST APIs and collaborate with backend engineers on API contracts, debugging, data flows, and production issue resolution.",
        "Translate product and Figma designs into scalable frontend experiences with product, design, and engineering teams from requirements through delivery.",
        "Streamline development workflows using Cursor, Claude Code, and Figma MCP for codebase exploration, implementation, debugging, and design-to-code tasks.",
        "Contribute to end-to-end feature delivery across frontend, APIs, and supporting infrastructure when required to ship production functionality.",
      ],
      impact: [],
      technologies: [
        "Next.js",
        "React.js",
        "TypeScript",
        "REST APIs",
        "Figma",
        "Cursor",
        "Claude Code",
      ],
      metrics: [],
    },
    {
      id: "atrina",
      company: "Atrina Technologies",
      role: "Next.js Developer",
      location: "Mumbai, India",
      period: "Aug 2024 — May 2025",
      current: false,
      overview:
        "Owned frontend delivery for a Next.js CMS rebuild — SSR architecture, reusable UI components, and cross-functional product execution.",
      points: [
        "Led a CMS frontend rebuild with Next.js and SSR, improving page-load performance and SEO while establishing a scalable application structure.",
        "Architected reusable React/Next.js and Tailwind CSS components to improve UI consistency and accelerate responsive feature development.",
        "Partnered with product, design, and backend teams to turn requirements and UI designs into production-ready features and API integrations.",
        "Owned technical planning for a 3-month delivery roadmap, defining implementation timelines and aligning frontend execution with product and leadership requirements.",
        "Authored developer onboarding documentation that reduced ramp-up time by approximately 40%, improving knowledge transfer and team productivity.",
      ],
      impact: [],
      technologies: [
        "Next.js",
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "SSR",
      ],
      metrics: [
        { id: "atrina-onboarding", value: "40%", label: "Faster ramp-up" },
      ],
    },
    {
      id: "quadb",
      company: "Quadb Technologies",
      role: "Web Developer",
      location: "Remote, India",
      period: "Feb 2021 — Feb 2022",
      current: false,
      overview:
        "Built responsive web interfaces and Node.js APIs — translating design files into production-ready experiences and shipping fixes in a fast-moving product team.",
      points: [
        "Crafted responsive web interfaces from Figma and Adobe XD designs using HTML, CSS, and JavaScript, translating designs into production-ready experiences.",
        "Engineered Node.js and Express.js APIs with JWT authentication to support secure communication between frontend applications and backend services.",
        "Implemented maintainable frontend features with a focus on responsive behavior, usability, and reliable product delivery.",
        "Designed and built KaiOS applications independently for feature phones, adapting interfaces and functionality for performance-constrained devices.",
        "Resolved frontend and backend issues and delivered production fixes in collaboration with the development team within a fast-moving product environment.",
      ],
      impact: [],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Node.js",
        "Express.js",
        "JWT",
        "Figma",
        "Adobe XD",
        "KaiOS",
      ],
      metrics: [],
    },
  ],
  projects: [
    {
      id: "pragnyapan",
      slug: "pragnyapan",
      name: "Pragnyapan.ai",
      tagline: "AI-powered marketing platform.",
      description:
        "Built an AI-powered marketing platform using Next.js, TypeScript, Tailwind CSS, and Gemini AI.",
      overview:
        "AI-powered marketing platform with responsive interfaces for AI-driven content creation and marketing workflows.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini AI"],
      year: "2024",
      role: "Frontend Engineer",
      link: "https://pragnyapan-ai.vercel.app/",
      imageUrl: "/images/projects/pragnyapan-ai.jpg",
      imageScrollEnabled: true,
      imageScrollDurationMs: 45_000,
      imageScrollReturnMs: 5_000,
      accent: "lime",
      cover: "gradient-4",
      featured: true,
      outcomes: [
        "Built an AI-powered marketing platform using Next.js, TypeScript, Tailwind CSS, and Gemini AI.",
        "Developed responsive interfaces for AI-driven content creation and marketing workflows.",
        "Owned frontend architecture and integrated generative AI capabilities into the application.",
      ],
      metrics: [],
      content: [],
    },
    {
      id: "meetspace",
      slug: "meetspace",
      name: "MeetSpace",
      tagline: "Real-time video meeting platform.",
      description:
        "Built a WebRTC-based peer-to-peer video and audio platform using Node.js, Socket.io, and MongoDB.",
      overview:
        "Real-time video meeting platform with WebRTC peer connections, Socket.io signaling, backend APIs, and a responsive frontend. Code on GitHub: github.com/harshal-singh/meet",
      stack: ["WebRTC", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      year: "2023",
      role: "Full-Stack Developer",
      link: "https://meet-spacee.vercel.app/",
      accent: "white",
      cover: "gradient-4",
      featured: true,
      outcomes: [
        "Built a WebRTC-based peer-to-peer video/audio platform using Node.js, Socket.io, and MongoDB.",
        "Implemented real-time signaling and backend APIs for meeting and session management.",
        "Developed the responsive frontend and integrated real-time communication workflows.",
      ],
      metrics: [],
      content: [
        {
          type: "p",
          text: "Most video tools optimize for enterprise features. MeetSpace optimizes for speed-to-room: paste a link, you're in a call. That constraint shaped every architectural decision.",
        },
        { type: "h2", text: "Signaling over Socket.io" },
        {
          type: "p",
          text: "WebRTC needs a signaling channel for SDP exchange and ICE candidates. I used Socket.io rooms keyed by meeting ID — each join triggers offer/answer negotiation with the first peer in the room acting as initiator.",
        },
        { type: "h2", text: "P2P with graceful fallback" },
        {
          type: "p",
          text: "Direct peer connections keep server costs near zero, but corporate firewalls often block UDP. STUN discovers public addresses; TURN relays media when P2P fails — configured via environment, not hardcoded.",
        },
        { type: "h2", text: "What I'd do differently" },
        {
          type: "p",
          text: "Screen sharing and recording would need SFU architecture (Livekit or mediasoup) — P2P doesn't scale past ~4 participants. For 1:1 and small rooms, the current stack is the right trade-off.",
        },
      ],
    },
    {
      id: "cms-revamp",
      slug: "cms-revamp",
      name: "Atrina CMS",
      tagline: "SSR-first CMS revamp, 35% faster.",
      description:
        "Re-platformed a legacy company website on Next.js with full SSR, image optimization and a clean editor workflow — measurable SEO and Core Web Vitals gains.",
      overview:
        "Led the re-platform of Atrina's marketing site from a client-rendered legacy stack to Next.js with SSR, ISR, and a Google Sheets–backed CMS — delivering measurable Core Web Vitals improvements and a workflow editors could adopt in days.",
      stack: ["Next.js", "SSR", "Docker", "Azure DevOps"],
      year: "2024",
      role: "Tech Lead",
      link: "#",
      accent: "lime",
      cover: "gradient-1",
      featured: false,
      outcomes: [
        "Cut lab LCP by 35% and reduced hero image payload by 60% with next/image + AVIF.",
        "Per-route rendering strategy: SSG/ISR for marketing, client-only for dashboards.",
        "Editor onboarding dropped from 2 weeks to 3 days with spreadsheet-based CMS.",
        "Docker + Azure DevOps pipeline cut deploy time from 18 min to under 9.",
      ],
      metrics: [
        { id: "cms-1", value: "35%", label: "Faster LCP (lab)" },
        { id: "cms-2", value: "60%", label: "Smaller hero images" },
        { id: "cms-3", value: "9 min", label: "Deploy time" },
      ],
      content: [
        {
          type: "p",
          text: "When I joined to lead the CMS revamp, the legacy stack was client-side rendering, oversized hero images, and a CDN doing minimal work. The brief: make it fast, make it Google-friendly, ship in a quarter.",
        },
        { type: "h2", text: "Rendering strategy per route" },
        {
          type: "p",
          text: "Marketing pages use SSG with ISR. The blog uses ISR with hourly revalidation. Internal dashboards stay client-side. Treating rendering as a per-route decision — not a global default — was the biggest architectural win.",
        },
        {
          type: "code",
          text: "export const revalidate = 3600; // ISR — refresh in the background",
        },
        { type: "h2", text: "Image pipeline" },
        {
          type: "p",
          text: "Most regressions on Next sites come from images. AVIF output, responsive sizes, and priority loading on LCP candidates beat almost any JS optimization. Hero images went from 1.2MB JPEGs to ~180KB AVIF.",
        },
        { type: "h2", text: "CMS without a CMS vendor" },
        {
          type: "p",
          text: "Google Sheets as the content store let editors work in a familiar tool while the site stayed fully static/ISR at the edge. Schema versioning and seed fallbacks keep the site running even when tabs are empty.",
        },
      ],
    },
    {
      id: "pipeline",
      slug: "pipeline",
      name: "CI/CD Pipeline Kit",
      tagline: "Reusable Docker + GitHub Actions templates.",
      description:
        "Reusable CI/CD templates and Docker images for shipping projects from commit to production faster.",
      overview: "",
      stack: ["Docker", "GitHub Actions", "Bash", "Nginx"],
      year: "2023",
      role: "Solo Build",
      link: "#",
      accent: "white",
      cover: "gradient-5",
      featured: false,
      outcomes: [],
      metrics: [],
      content: [],
    },
  ],
  education: [
    {
      id: "kc",
      school: "Kishinchand Chellaram College, Mumbai",
      degree: "Master of Science in Information Technology",
      period: "Sep 2022 — Apr 2024",
      grade: "Grade: O+",
    },
    {
      id: "llrc",
      school: "Lala Lajpat Rai College, Mumbai",
      degree: "Bachelor of Science in Information Technology",
      period: "Jul 2019 — Apr 2022",
      grade: "Grade: A+",
    },
  ],
  blogPosts: [
    {
      slug: "nextjs-page-load-4s-to-1-2s",
      title: "How I Reduced a Next.js Page Load from 4–5s to ~1.2s",
      excerpt:
        "A practical breakdown of improving SSR, caching, and performance for faster page loads.",
      category: "Next.js",
      readTime: "9 min read",
      date: "Aug 12, 2025",
      cover: "gradient-1",
      imageUrl: "/images/blog/nextjs-page-load-cover.png",
      tags: ["Next.js", "Performance", "Tailwind CSS"],
      published: true,
      featured: true,
      content: [
        {
          type: "p",
          text: "When a marketing page takes four or five seconds to become usable, you lose trust before anyone reads a word. Here is the stack of changes that brought a Next.js route down to about 1.2 seconds.",
        },
        { type: "h2", text: "Start with the render path" },
        {
          type: "p",
          text: "SSR is not free. Audit what runs on the server, what blocks HTML, and what can move to static generation or incremental revalidation instead.",
        },
        { type: "h2", text: "Cache with intent" },
        {
          type: "p",
          text: "CDN headers, Next.js fetch caching, and image optimization compound quickly. Measure LCP in the field, not only in Lighthouse.",
        },
      ],
    },
    {
      slug: "graphql-hasura-modern-frontend",
      title: "Why GraphQL and Hasura Can Simplify Modern Frontend Development",
      excerpt:
        "Using GraphQL and Hasura to reduce repetitive API work, handle relational data, and give frontend teams more control.",
      category: "GraphQL",
      readTime: "8 min read",
      date: "Jul 28, 2025",
      cover: "gradient-4",
      imageUrl: "/images/blog/graphql-hasura-cover.png",
      tags: ["GraphQL", "Hasura", "Frontend"],
      published: true,
      featured: true,
      content: [
        {
          type: "p",
          text: "REST endpoints multiply fast when products grow. GraphQL with Hasura gives frontend teams a typed contract over relational data without rebuilding CRUD for every screen.",
        },
        { type: "h2", text: "One query, many relations" },
        {
          type: "p",
          text: "Nested selections replace multiple round trips. That matters on mobile networks and in dashboard-style UIs where lists and detail panels share data.",
        },
        { type: "h2", text: "Permissions at the data layer" },
        {
          type: "p",
          text: "Row-level rules in Hasura keep authorization close to the database instead of scattered across dozens of API handlers.",
        },
      ],
    },
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
      published: true,
      featured: false,
      imageUrl: "",
      content: [
        {
          type: "p",
          text: "When I joined Atrina to lead the CMS revamp, the legacy stack was a tangle of client-side rendering, oversized hero images and a CDN that was barely doing its job. The brief was simple: make it fast, make it Google-friendly, ship in a quarter.",
        },
        { type: "h2", text: "1. Pick the rendering strategy per route" },
        {
          type: "p",
          text: "Next.js gives you SSR, SSG, ISR and client-only — and the temptation is to default to one. Don't. Marketing pages are SSG with ISR, dashboards stay client-side, the blog is ISR with on-demand revalidation. Treat it as a per-route decision.",
        },
        {
          type: "code",
          text: "export const revalidate = 60; // ISR — refresh in the background",
        },
        { type: "h2", text: "2. Image pipeline is 60% of the win" },
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
      title: "Docker + Azure DevOps: a CI/CD recipe that halves release time",
      excerpt:
        "The exact pipeline structure, caching tricks and image layering rules that took our deploys from 18 minutes to under 9.",
      category: "DevOps",
      readTime: "11 min read",
      date: "May 12, 2025",
      cover: "gradient-2",
      tags: ["Docker", "CI/CD", "Azure"],
      published: true,
      featured: false,
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
      title: "Design systems with Tailwind: lessons from real-world products",
      excerpt:
        "Tokens, primitives, and the discipline it takes to keep a Tailwind codebase from devolving into utility-class soup.",
      category: "Design Systems",
      readTime: "7 min read",
      date: "Apr 03, 2025",
      cover: "gradient-3",
      tags: ["Tailwind", "Design Systems", "React"],
      published: true,
      featured: false,
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
      published: true,
      featured: false,
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
      title: "TypeScript discriminated unions: the pattern I reach for daily",
      excerpt:
        "How a small modeling discipline turns runtime branches into compile-time guarantees — and makes refactors fearless.",
      category: "TypeScript",
      readTime: "6 min read",
      date: "Jan 09, 2025",
      cover: "gradient-5",
      tags: ["TypeScript", "Patterns"],
      published: true,
      featured: false,
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
      published: true,
      featured: false,
      content: [
        {
          type: "p",
          text: "Server Components confused everyone on my team for the first month. Here's the framing that finally got us all on the same page.",
        },
        { type: "h2", text: "Server is the default; client is an opt-in" },
        {
          type: "p",
          text: "Flip the mental model. By default, your component runs on the server, has zero JS cost on the client, and can talk to your data layer directly. You only opt into the client when you need interactivity.",
        },
      ],
    },
  ],
  testimonials: [],
  blogCategories: [
    "All",
    "Next.js",
    "GraphQL",
    "DevOps",
    "Design Systems",
    "Engineering",
    "TypeScript",
    "React",
  ],
};

export const gradientMap: Record<string, string> = {
  "gradient-1": "from-accent/30 via-emerald-500/10 to-transparent",
  "gradient-2": "from-cyan-400/25 via-blue-500/10 to-transparent",
  "gradient-3": "from-rose-400/25 via-orange-500/10 to-transparent",
  "gradient-4": "from-violet-400/25 via-fuchsia-500/10 to-transparent",
  "gradient-5": "from-amber-300/30 via-orange-500/10 to-transparent",
  "gradient-6": "from-teal-300/25 via-emerald-500/10 to-transparent",
};
