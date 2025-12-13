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
  Check,
  type LucideIcon 
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations";

// Navy Blue corporate color scheme - unified enterprise look
const SERVICES: { id: string; Icon: LucideIcon }[] = [
  { id: "fullstack", Icon: Rocket },
  { id: "mobile", Icon: Smartphone },
  { id: "desktop", Icon: Monitor },
  { id: "ai", Icon: Bot },
  { id: "cloud", Icon: Cloud },
  { id: "consulting", Icon: Target },
];

export function Services() {
  const t = useTranslations("services");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      
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
          {SERVICES.map((service) => {
            const benefits = t.raw(`${service.id}.benefits`) as string[];
            
            return (
              <StaggerItem key={service.id} variant="fadeUp">
                <motion.div
                  className="group glass rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full flex flex-col"
                  whileHover={{ 
                    y: -5, 
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  {/* Icon with unified Navy Blue background - Enterprise look */}
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#001a66]/90 dark:bg-[#001a66] flex items-center justify-center mb-4 sm:mb-5 border border-[#001a66]/20 dark:border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <service.Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {t(`${service.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                    {t(`${service.id}.description`)}
                  </p>

                  {/* Benefits List */}
                  <ul className="mt-auto space-y-2.5 sm:space-y-3">
                    {benefits.map((benefit, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-foreground/90"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#001a66] dark:bg-[#3b82f6] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
