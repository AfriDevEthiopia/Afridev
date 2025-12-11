import type { Project, Testimonial, TeamMember } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "rateeat",
    title: "RateEat",
    type: "Mobile Development",
    description:
      "A mobile application that helps users discover the best restaurants and food spots across Ethiopia.",
    features: [
      "Comprehensive restaurant listings with detailed profiles, menus, and contact info",
      "User reviews and ratings to guide dining decisions",
      "Advanced search and filtering for cuisines",
    ],
  },
  {
    id: "skillbridge",
    title: "Skill Bridge",
    type: "AI Apps & Integration",
    description:
      "A study platform for Ethiopian students preparing for university entrance exams.",
    features: [
      "Personalized study materials",
      "Organized exam resources",
      "Interactive learning tools",
    ],
  },
  {
    id: "smartvid",
    title: "SmartVid AI",
    type: "Desktop Application Development",
    description: "Automate video creation and posting with AI-powered tools.",
    features: [],
  },
  {
    id: "leadconnector",
    title: "AI Lead Connector",
    type: "Scripts & Utilities",
    description: "AI-powered lead connector for real estate investors.",
    features: [],
  },
  {
    id: "healthmonitor",
    title: "Patient Health Monitoring System",
    type: "Web Development",
    description: "Health monitoring system for patients.",
    features: [],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    project: "Database and Frontend Development with Postgres SQL and Streamlit",
    rating: 5,
    period: "Nov 9, 2025 - Nov 26, 2025",
    budget: "$850.00 ($15.00/hr • 57 hours)",
    quote:
      "I had a fantastic experience with Tamirat. He was highly professional, incredibly easy to work with, and delivered top-notch results. The quality of his work was excellent. Highly recommended!",
  },
  {
    id: "2",
    project: "AI, LLM & Automations for our platform",
    rating: 5,
    period: "Oct 17, 2025 - Nov 6, 2025",
    budget: "$313.33 ($10.00/hr • 31 hours)",
    quote:
      "Fantastic Guy with a great team of people very efficient and thorough in his work and a proper gentleman",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tamirat",
    name: "Tamirat K.",
    title: "Sr. Full Stack Engineer | Django, Next.js & AI Automation | n8n Expert",
    status: "100% Job Success",
    badge: "Top Rated",
    jobSuccess: "100%",
  },
  {
    id: "tolosa",
    name: "Tolosa M.",
    title: "Full Stack | AI & Automation (n8n) | React.js | Next.js | Node.js",
    status: "100% Job Success",
    badge: "Rising Talent",
    jobSuccess: "100%",
  },
  {
    id: "abdi",
    name: "Abdi E.",
    title: "Senior Full-Stack Developer | Node.js | TypeScript | Python | Automation",
    status: "100% Job Success",
    badge: "Top Rated",
    jobSuccess: "100%",
  },
];

export const SUCCESS_STORIES = [
  {
    title: "E-Commerce Platform",
    metric: "50K+",
    description: "monthly users with 99.9% uptime",
  },
  {
    title: "AI Product Recommendations",
    metric: "25%",
    description: "increase in sales",
  },
  {
    title: "API Optimization",
    metric: "70%",
    description: "reduction in response times",
  },
];

