import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Cinematic Glass Background Elements - Full Glass Effect */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Large floating glass orbs - High visibility */}
            <div className="glass-orb absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[700px] lg:h-[700px] -top-32 -left-32 animate-float-slow opacity-30 dark:opacity-60" />
            <div className="glass-orb absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] top-1/3 -right-24 animate-float-reverse opacity-25 dark:opacity-50" style={{ animationDelay: '2s' }} />
            <div className="glass-orb absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[550px] lg:h-[550px] bottom-1/4 -left-16 animate-float-slow opacity-30 dark:opacity-55" style={{ animationDelay: '4s' }} />
            <div className="glass-orb absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] -bottom-16 right-1/4 animate-float-reverse opacity-20 dark:opacity-45" style={{ animationDelay: '1s' }} />
            <div className="glass-orb absolute w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] top-1/4 right-1/3 animate-float-slow opacity-20 dark:opacity-40" style={{ animationDelay: '3s' }} />
            
            {/* Prominent prismatic light beams */}
            <div 
              className="absolute top-0 left-1/4 w-[3px] h-full opacity-10 dark:opacity-20"
              style={{ 
                background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.8) 20%, rgba(139, 92, 246, 0.8) 50%, rgba(168, 85, 247, 0.8) 80%, transparent 100%)',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
              }}
            />
            <div 
              className="absolute top-0 right-1/3 w-[2px] h-full opacity-5 dark:opacity-15"
              style={{ 
                background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.8) 30%, rgba(99, 102, 241, 0.8) 70%, transparent 100%)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
              }}
            />
            <div 
              className="absolute top-0 left-2/3 w-[2px] h-full opacity-5 dark:opacity-10"
              style={{ 
                background: 'linear-gradient(180deg, transparent 10%, rgba(168, 85, 247, 0.6) 40%, rgba(99, 102, 241, 0.6) 60%, transparent 90%)',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
              }}
            />
            
            {/* Ambient light spots - More visible */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] lg:w-[1400px] lg:h-[1400px] rounded-full opacity-20 dark:opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 30%, transparent 60%)'
              }}
            />
            
            {/* Additional glass reflections */}
            <div className="absolute top-0 left-0 w-full h-1/3 opacity-10 dark:opacity-30"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)'
              }}
            />
          </div>

          <NextIntlClientProvider messages={messages}>
            <div className="relative z-10">
              {children}
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

