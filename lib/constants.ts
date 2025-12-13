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
  {
    id: "3",
    project: "Python Coder Needed for Script Adjustments and Modifications",
    rating: 5,
    period: "Aug 15, 2025 - Oct 15, 2025",
    budget: "$773.34 ($10.00/hr • 77 hours)",
    quote:
      "Fantastic guy to work with absolute pleasure, patience and very professional",
  },
  {
    id: "4",
    project: "Backend vibe coder needed",
    rating: 5,
    period: "Jul 26, 2025 - Sep 6, 2025",
    budget: "$570.00 (Fixed price)",
    quote:
      "Your clear communication, professionalism, and collaborative approach made the project smooth and enjoyable. I truly appreciate the trust and support, and I would be more than happy to work with you again.",
  },
  {
    id: "5",
    project: "Full-Stack Engineer with AI chatbot Integration Experience",
    rating: 5,
    period: "Jul 15, 2025 - Jul 16, 2025",
    budget: "$8.75 (Fixed price)",
    quote:
      "Tamirat is exceptionally talented and consistently exceeded our expectations. His expertise in AI chatbot integration was clearly demonstrated throughout the project. He delivered high-quality work on time and communicated effectively.",
  },
  {
    id: "6",
    project: "EuroStack - MVP",
    rating: 5,
    period: "Jun 21, 2025 - Jun 21, 2025",
    budget: "$40.00 ($20.00/hr • 2 hours)",
    quote:
      "I had a great experience working with Tamirat! From the very beginning, communication was smooth and professional. The quality of the design work exceeded expectations – clean, modern, and fully aligned with our vision.",
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
    image: "/images/teams/tamirat.jpg",
  },
  {
    id: "tolosa",
    name: "Tolosa M.",
    title: "Full Stack | AI & Automation (n8n) | React.js | Next.js | Node.js",
    status: "100% Job Success",
    badge: "Rising Talent",
    jobSuccess: "100%",
    image: "/images/teams/tolosa.jpg",
  },
  {
    id: "abdi",
    name: "Abdi E.",
    title: "Senior Full-Stack Developer | Node.js | TypeScript | Python | Automation",
    status: "100% Job Success",
    badge: "Top Rated",
    jobSuccess: "100%",
    image: "/images/teams/abdi.jpg",
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

