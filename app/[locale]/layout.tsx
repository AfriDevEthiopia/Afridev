import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NoTranslate } from "@/components/NoTranslate";
import "../globals.css";

export const metadata: Metadata = {
  title: "AfriDev - Full Stack Developers | AI, LLM & Automation Experts",
  description:
    "At AfriDev, we help startups and tech teams build cloud-native, scalable, and AI-powered applications using modern technologies.",
  keywords: [
    "Full Stack Development",
    "AI Integration",
    "LLM",
    "Mobile Apps",
    "Web Development",
    "Ethiopia",
    "Cloud Computing",
    "DevOps",
  ],
  other: {
    "google": "notranslate",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="notranslate">
      <body className="antialiased">
        <NoTranslate />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

