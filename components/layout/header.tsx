"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedButton, AnimatedNavLink, Magnetic } from "@/components/animations";

export function Header() {
  const t = useTranslations("nav");
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show glass effect when scrolled past 20px
      setIsScrolled(currentScrollY > 20);
      
      // Hide header when scrolling down (start hiding at just 50px)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down & past threshold - hide immediately
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Only show when scrolling up
        setIsHidden(false);
      }
      
      // Always show at the very top
      if (currentScrollY < 20) {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHidden && !isMobileMenuOpen ? "-100%" : 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen ? "glass-header" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <Magnetic strength={0.2}>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Show placeholder during SSR/hydration, then show themed logo */}
                {!mounted ? (
                  <div className="h-8 sm:h-10 w-auto bg-transparent" />
                ) : (
                  <Image
                    src={resolvedTheme === "dark" ? "/images/logo-white.png" : "/images/logo-black.png"}
                    alt="AfriDev Logo"
                    width={120}
                    height={40}
                    className="h-8 sm:h-10 w-auto object-contain"
                  />
                )}
                <span className="text-lg sm:text-xl font-bold text-foreground">
                  Afri<span className="gradient-text">Dev</span>
                </span>
              </motion.div>
            </Magnetic>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: "easeOut" }}
              >
                <AnimatedNavLink
                  href={item.href}
                  className="px-3 xl:px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </AnimatedNavLink>
              </motion.div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div 
              className="hidden sm:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <LanguageSwitcher />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <ThemeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <AnimatedButton
                href="#contact"
                className="hidden md:flex btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4"
              >
                Get Started
              </AnimatedButton>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-foreground hover:text-primary rounded-lg hover:bg-primary/10 transition-colors z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.path
                      key="close"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.g
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen with Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-background/98 backdrop-blur-xl z-40"
            >
              <div className="container h-full flex flex-col py-8">
                <motion.div 
                  className="flex flex-col gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    }
                  }}
                >
                  {navItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 10, backgroundColor: "rgba(0, 26, 102, 0.08)" }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-4 text-lg font-medium text-foreground hover:text-primary rounded-xl transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="mt-8 pt-8 border-t border-border space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between px-4 sm:hidden">
                    <p className="text-sm text-foreground/70">Appearance</p>
                    <ThemeToggle />
                  </div>

                  <div className="sm:hidden">
                    <p className="text-sm text-foreground/70 mb-3 px-4">Language</p>
                    <LanguageSwitcher />
                  </div>
                  
                  <AnimatedButton
                    href="#contact"
                    className="btn-primary w-full text-center py-4 text-lg block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </AnimatedButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
