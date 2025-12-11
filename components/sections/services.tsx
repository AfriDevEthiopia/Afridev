"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { 
  Rocket, 
  Smartphone, 
  Monitor, 
  Bot, 
  Cloud, 
  Target,
  type LucideIcon 
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";

const SERVICES: { id: string; Icon: LucideIcon; color: string }[] = [
  { id: "fullstack", Icon: Rocket, color: "from-blue-500 to-cyan-500" },
  { id: "mobile", Icon: Smartphone, color: "from-purple-500 to-pink-500" },
  { id: "desktop", Icon: Monitor, color: "from-green-500 to-emerald-500" },
  { id: "ai", Icon: Bot, color: "from-orange-500 to-red-500" },
  { id: "cloud", Icon: Cloud, color: "from-indigo-500 to-purple-500" },
  { id: "consulting", Icon: Target, color: "from-pink-500 to-rose-500" },
];

export function Services() {
  const t = useTranslations("services");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm text-primary mb-3 sm:mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Services Grid */}
        <StaggerContainer 
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {SERVICES.map((service) => (
            <StaggerItem key={service.id} variant="fadeUp">
              <motion.div
                className="group glass rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon with gradient background */}
                <motion.div 
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-5 lg:mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <service.Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {t(`${service.id}.title`)}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {t(`${service.id}.description`)}
                </p>

                {/* Hover Arrow - Hidden on mobile */}
                <motion.div 
                  className="mt-4 sm:mt-5 lg:mt-6 hidden sm:flex items-center gap-2 text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Learn more</span>
                  <motion.svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
