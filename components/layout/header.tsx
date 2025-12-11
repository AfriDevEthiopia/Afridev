"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Header() {
  const t = useTranslations("nav");
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "#home", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#testimonials", label: t("testimonials") },
    { href: "#team", label: t("team") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            {/* Show placeholder during SSR/hydration, then show themed logo */}
            {!mounted ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-transparent" />
            ) : (
              <Image
                src={resolvedTheme === "dark" ? "/images/logo-white.png" : "/images/logo-black.png"}
                alt="AfriDev Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            )}
            <span className="text-lg sm:text-xl font-bold text-foreground">
              Afri<span className="gradient-text">Dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 xl:px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden md:flex btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4"
            >
              Get Started
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary rounded-lg hover:bg-primary/10 transition-colors z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-background/98 backdrop-blur-xl z-40">
            <div className="container h-full flex flex-col py-8">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-4 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      animation: `fadeInUp 0.3s ease-out ${index * 0.05}s forwards`,
                      opacity: 0,
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-border space-y-6">
                <div className="flex items-center justify-between px-4 sm:hidden">
                  <p className="text-sm text-foreground/70">Appearance</p>
                  <ThemeToggle />
                </div>

                <div className="sm:hidden">
                  <p className="text-sm text-foreground/70 mb-3 px-4">Language</p>
                  <LanguageSwitcher />
                </div>
                
                <a
                  href="#contact"
                  className="btn-primary w-full text-center py-4 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
