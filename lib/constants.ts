import type { Project, Testimonial } from "@/types";

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
    image: "/images/projects/rateeat.jpg",
    link: "https://rateeat.app/en",
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
    image: "/images/projects/skillbridge.jpg",
    link: "https://skillbridge.academy/en",
  },
  {
    id: "smartvid",
    title: "SmartVid AI",
    type: "Web Application",
    description:
      "Enterprise-grade AI video creation platform. From concept to finished video in minutes with AI script generation, professional voiceover in 40+ languages, and advanced compositing.",
    features: [
      "AI-powered script generation with industry-specific terminology",
      "Studio-quality voice synthesis in 40+ languages",
      "Multi-layer video editing with professional transitions",
    ],
    image: "/images/projects/smartaivideo.png",
    link: "https://smartaivideo.ai/",
  },
  {
    id: "leadconnector",
    title: "Investor Callback",
    type: "AI Apps & Integration",
    description:
      "AI-powered lead qualification platform for real estate professionals. Deploy AI Lead Qualifiers that work 24/7 to convert prospects into qualified clients.",
    features: [
      "98% contact rate with 24/7 AI availability",
      "3x more conversions with personalized follow-up calls",
      "Professional voice quality that builds credibility",
    ],
    image: "/images/projects/investorcallback.png",
    link: "https://investorcallback.com/",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    project: "Database and Frontend Development with Postgres SQL and Streamlit",
    rating: 5,
    period: "Nov 9, 2025 - Nov 26, 2025",
    quote:
      "I had a fantastic experience with Tamirat. He was highly professional, incredibly easy to work with, and delivered top-notch results. The quality of his work was excellent. Highly recommended!",
  },
  {
    id: "2",
    project: "AI, LLM & Automations for our platform",
    rating: 5,
    period: "Oct 17, 2025 - Nov 6, 2025",
    quote:
      "Fantastic Guy with a great team of people very efficient and thorough in his work and a proper gentleman",
  },
  {
    id: "3",
    project: "Python Coder Needed for Script Adjustments and Modifications",
    rating: 5,
    period: "Aug 15, 2025 - Oct 15, 2025",
    quote:
      "Fantastic guy to work with absolute pleasure, patience and very professional",
  },
  {
    id: "4",
    project: "Backend vibe coder needed",
    rating: 5,
    period: "Jul 26, 2025 - Sep 6, 2025",
    quote:
      "Your clear communication, professionalism, and collaborative approach made the project smooth and enjoyable. I truly appreciate the trust and support, and I would be more than happy to work with you again.",
  },
  {
    id: "5",
    project: "Full-Stack Engineer with AI chatbot Integration Experience",
    rating: 5,
    period: "Jul 15, 2025 - Jul 16, 2025",
    quote:
      "Tamirat is exceptionally talented and consistently exceeded our expectations. His expertise in AI chatbot integration was clearly demonstrated throughout the project. He delivered high-quality work on time and communicated effectively.",
  },
  {
    id: "6",
    project: "EuroStack - MVP",
    rating: 5,
    period: "Jun 21, 2025 - Jun 21, 2025",
    quote:
      "I had a great experience working with Tamirat! From the very beginning, communication was smooth and professional. The quality of the design work exceeded expectations – clean, modern, and fully aligned with our vision.",
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

