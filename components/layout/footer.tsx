"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { AnimatedButton, StaggerContainer, StaggerItem, Magnetic } from "@/components/animations";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const UPWORK_AGENCY_URL = "https://www.upwork.com/agencies/1937186981697230253/";

  const socialLinks = [
    { name: "Upwork", href: UPWORK_AGENCY_URL, icon: "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" },
    { name: "GitHub", href: "#", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
    { name: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "Twitter", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  ];

  return (
    <motion.footer 
      ref={footerRef}
      className="relative pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 border-t border-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      
      <div className="relative container mx-auto">
        <StaggerContainer 
          staggerDelay={0.1}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {/* Brand */}
          <StaggerItem className="col-span-2 sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Magnetic strength={0.2}>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
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
                  <span className="text-lg sm:text-xl font-bold">
                    Afri<span className="gradient-text">Dev</span>
                  </span>
                </motion.div>
              </Magnetic>
            </Link>
            <motion.p 
              className="text-xs sm:text-sm text-muted-foreground max-w-md mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {t("tagline")}
            </motion.p>
            
            {/* Hire Us Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <AnimatedButton
                href={UPWORK_AGENCY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-xl bg-[#14a800] hover:bg-[#14a800]/90 text-white text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
                Hire Us on Upwork
              </AnimatedButton>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name === "Upwork" ? "_blank" : undefined}
                  rel={social.name === "Upwork" ? "noopener noreferrer" : undefined}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all ${social.name === "Upwork" ? "hover:bg-[#14a800]/20 hover:text-[#14a800]" : "hover:bg-primary/20"}`}
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 400 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t("services")}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {["Full-Stack", "Mobile Apps", "AI Integration", "Cloud & DevOps"].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a 
                    href="#services" 
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                    whileHover={{ x: 5, color: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </StaggerItem>

          {/* Company */}
          <StaggerItem>
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">{t("company")}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "#portfolio", label: tNav("portfolio") },
                { href: "#team", label: tNav("team") },
                { href: "#testimonials", label: tNav("testimonials") },
                { href: "#contact", label: tNav("contact") },
              ].map((item, index) => (
                <motion.li 
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a 
                    href={item.href} 
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                    whileHover={{ x: 5, color: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
            © {currentYear} AfriDev. {t("rights")}
          </p>
          <motion.p 
            className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            Built by the AfriDev Team in Ethiopia
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
