import type { Metadata } from "next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.afridev.io/#website",
      "url": "https://www.afridev.io",
      "name": "AfriDev",
      "alternateName": ["AfriDev IO", "AfriDev Tech Agency", "AfriDev Ethiopia"],
    },
    {
      "@type": "Organization",
      "@id": "https://www.afridev.io/#organization",
      "name": "AfriDev",
      "url": "https://www.afridev.io",
      "logo": "https://www.afridev.io/icon.svg",
      "description": "Full Stack, AI, LLM & Cloud Application Development Agency.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ET",
        "addressLocality": "Addis Ababa",
      },
      "sameAs": [
        "https://github.com/AfriDevEthiopia",
        "https://www.linkedin.com/company/afridevet",
        "https://www.upwork.com/agencies/1937186981697230253/",
      ],
      "knowAbout": [
        "Software Engineering",
        "Full Stack Development",
        "Artificial Intelligence",
        "LLM Integration",
        "Cloud Computing",
        "Mobile App Development",
        "DevOps",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.afridev.io"),
  alternates: {
    canonical: "https://www.afridev.io",
  },
  title: "AfriDev - Full Stack Developers | AI, LLM & Automation Experts",
  description:
    "At AfriDev, we help startups and tech teams build cloud-native, scalable, and AI-powered applications using modern technologies.",
  applicationName: "AfriDev",
  openGraph: {
    siteName: "AfriDev",
    title: "AfriDev - Full Stack Developers | AI, LLM & Automation Experts",
    description:
      "At AfriDev, we help startups and tech teams build cloud-native, scalable, and AI-powered applications using modern technologies.",
    url: "https://www.afridev.io",
    type: "website",
    images: [
      {
        url: "/images/logos/logo-black.png",
        width: 1200,
        height: 630,
        alt: "AfriDev Software & AI Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriDev - Full Stack Developers | AI, LLM & Automation Experts",
    description:
      "At AfriDev, we help startups and tech teams build cloud-native, scalable, and AI-powered applications using modern technologies.",
    images: ["/images/logos/logo-black.png"],
  },
  keywords: [
    "AfriDev",
    "AfriDev Tech",
    "AfriDev Software",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
