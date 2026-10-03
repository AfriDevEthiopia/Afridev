import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FOUNDER_NOTE, LINKS, SERVICES } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE = "https://www.afridev.io";

// One graph so search engines and AI assistants can tie the agency, its founder, its services,
// its job board and its profiles elsewhere into a single entity.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "AfriDev",
      alternateName: ["AfriDev IO", "AfriDev Tech Agency", "AfriDev Ethiopia"],
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE}/#organization`,
      name: "AfriDev",
      url: SITE,
      logo: `${SITE}/icon.svg`,
      image: `${SITE}/og-image.jpg`,
      description:
        "Software development agency in Addis Ababa, Ethiopia building web, mobile and AI products (LLM, RAG, chat and voice agents) for startups and tech teams worldwide.",
      email: LINKS.email,
      foundingDate: "2025",
      address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
      areaServed: "Worldwide",
      founder: {
        "@type": "Person",
        "@id": `${LINKS.founder}/#person`,
        name: FOUNDER_NOTE.name,
        url: LINKS.founder,
        jobTitle: "Founder",
      },
      sameAs: [LINKS.github, LINKS.linkedin, LINKS.upwork, LINKS.careers],
      knowsAbout: [
        "Software Engineering",
        "Full Stack Development",
        "Artificial Intelligence",
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "AI Agents",
        "Cloud Computing",
        "Mobile App Development",
        "DevOps",
        "React",
        "Next.js",
        "Node.js",
        "Python",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title, description: service.description },
        })),
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: LINKS.email,
        url: LINKS.calendly,
        availableLanguage: "English",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: {
    canonical: SITE,
    types: { "text/plain": `${SITE}/llms.txt` },
  },
  title: "AfriDev | AI & Full-Stack Software Development Agency in Ethiopia",
  description:
    "AfriDev builds web, mobile and AI products (LLM, RAG, chat and voice agents) for startups and tech teams. Hire senior developers from Addis Ababa, Ethiopia. Book a free call.",
  authors: [{ name: FOUNDER_NOTE.name, url: LINKS.founder }],
  creator: "AfriDev",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  applicationName: "AfriDev",
  openGraph: {
    siteName: "AfriDev",
    title: "AfriDev | AI & Full-Stack Software Development Agency in Ethiopia",
    description:
      "AfriDev builds web, mobile and AI products (LLM, RAG, chat and voice agents) for startups and tech teams. Hire senior developers from Addis Ababa, Ethiopia. Book a free call.",
    url: SITE,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AfriDev Software & AI Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriDev | AI & Full-Stack Software Development Agency in Ethiopia",
    description:
      "AfriDev builds web, mobile and AI products (LLM, RAG, chat and voice agents) for startups and tech teams. Hire senior developers from Addis Ababa, Ethiopia. Book a free call.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "AfriDev",
    "AfriDev Tech",
    "AfriDev Software",
    "software development agency Ethiopia",
    "hire developers Ethiopia",
    "AI development agency",
    "LLM integration",
    "Full Stack Development",
    "AI Integration",
    "LLM",
    "Mobile Apps",
    "Web Development",
    "Ethiopia",
    "Cloud Computing",
    "DevOps",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} overflow-x-hidden`} style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans antialiased">
        {children}
        {/* First-party visitor analytics (no cookies, no third parties) */}
        <Script
          src="https://talent.afridev.io/api/v1/va/script.js"
          data-site="afridev"
          data-key="pk_afridev_0997ee279a3ba7d9"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
