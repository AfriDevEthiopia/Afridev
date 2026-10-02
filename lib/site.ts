/**
 * Copy and facts for afridev.io, kept in one place so they are easy to update.
 * Agency facts mirror tamiratkebede.com; services, projects and reviews come from lib/constants.ts.
 */

export const LINKS = {
  calendly: process.env.NEXT_PUBLIC_CALENDLY_LINK || "https://calendly.com/afridevet/30min",
  email: "contact@afridev.io",
  upwork: "https://www.upwork.com/agencies/1937186981697230253/",
  github: "https://github.com/AfriDevEthiopia",
  linkedin: "https://www.linkedin.com/company/afridevet",
  careers: "https://talent.afridev.io",
  founder: "https://tamiratkebede.com",
  introVideoId: "DOEM7pu9shU",
};

export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Careers", href: LINKS.careers },
];

export const AGENCY_DESCRIPTION =
  "We help startups and tech teams turn complex ideas into cloud\u2011native, scalable, and AI\u2011powered applications.";

export const TRACK_RECORD = [
  { value: "Top Rated", label: "Upwork agency status" },
  { value: "100%", label: "Job success score" },
  { value: "16", label: "Client projects delivered" },
  { value: "2–10", label: "People on the team" },
];

export const SERVICES = [
  {
    title: "Full-stack web development",
    description:
      "High-performance web apps on a modern React and Python stack, built cloud-native and ready for AI features.",
    points: ["Scalable cloud-native architecture", "React, Next.js, Node.js, Python", "AI/LLM integration ready"],
  },
  {
    title: "AI apps & integration",
    description:
      "ChatGPT, custom LLMs and AI automation built into your product, from chat assistants to voice agents.",
    points: ["LLM & RAG integration", "AI chat and voice agents", "Workflow automation"],
  },
  {
    title: "Mobile app development",
    description: "Fast, polished iOS and Android apps from a single Flutter codebase.",
    points: ["Cross-platform iOS & Android", "Native performance", "Offline-first capabilities"],
  },
  {
    title: "Desktop applications",
    description: "Robust desktop software that runs on Windows, macOS and Linux.",
    points: ["Cross-platform compatibility", "Native OS integration", "High-performance processing"],
  },
  {
    title: "Cloud & DevOps",
    description: "AWS infrastructure, Docker, Kubernetes and CI/CD pipelines that keep releases boring.",
    points: ["AWS & cloud infrastructure", "Docker & Kubernetes", "CI/CD automation"],
  },
  {
    title: "Consulting & optimization",
    description: "Architecture reviews, performance work and technical roadmaps for teams that need a second opinion.",
    points: ["Architecture review", "Performance optimization", "Technical roadmapping"],
  },
];

// Draft: review against how projects actually run
export const PROCESS = [
  {
    title: "Discovery call",
    body: "A free 30-minute call to understand your goals, users and constraints.",
  },
  {
    title: "Scope & plan",
    body: "A clear proposal with milestones, timeline and the stack we recommend.",
  },
  {
    title: "Build in sprints",
    body: "Working software every sprint, with regular demos and direct access to the team.",
  },
  {
    title: "Launch & support",
    body: "We ship to production, monitor the launch and stay on for improvements.",
  },
];

export const FOUNDER_NOTE = {
  // Draft for Tamirat to review
  quote:
    "We keep the team small on purpose. You work directly with the engineers building your product, and we only take on work we can deliver well.",
  name: "Tamirat Kebede",
  role: "Founder, AfriDev",
  photo: "/images/founder/tamirat.jpg",
};
