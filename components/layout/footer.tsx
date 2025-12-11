"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "#", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
    { name: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "Twitter", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  ];

  return (
    <footer className="relative pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      
      <div className="relative container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image
                src="/images/logo-white.png"
                alt="AfriDev Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-lg sm:text-xl font-bold">
                Afri<span className="gradient-text">Dev</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mb-4 sm:mb-6">
              {t("tagline")}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t("services")}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {["Full-Stack", "Mobile Apps", "AI Integration", "Cloud & DevOps"].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t("company")}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "#portfolio", label: tNav("portfolio") },
                { href: "#team", label: tNav("team") },
                { href: "#testimonials", label: tNav("testimonials") },
                { href: "#contact", label: tNav("contact") },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
            © {currentYear} AfriDev. {t("rights")}
          </p>
          <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" /> in Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
}
