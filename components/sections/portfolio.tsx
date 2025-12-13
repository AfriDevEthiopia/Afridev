"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { PROJECTS } from "@/lib/constants";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import Image from "next/image";

export function Portfolio() {
  const t = useTranslations("portfolio");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs sm:text-sm text-accent mb-3 sm:mb-4"
          >
            Our Work
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

        {/* Portfolio Grid */}
        <StaggerContainer 
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.id} variant="fadeUp">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden h-full block"
                whileHover={{ 
                  y: -8, 
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Project Image Header */}
                <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden bg-muted cursor-pointer">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    /* Fallback placeholder with project initial */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#001a66] to-[#0047ab] flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Subtle Navy Blue overlay on hover */}
                  <div className="absolute inset-0 bg-[#001a66]/0 group-hover:bg-[#001a66]/20 transition-all duration-300" />
                  
                  {/* Project type badge */}
                  <motion.div 
                    className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/90 dark:bg-[#001a66]/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-[#001a66] dark:text-white font-medium shadow-lg">
                      {project.type}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-8">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-5 lg:mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Features - Show fewer on mobile */}
                  {project.features.length > 0 && (
                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 lg:mb-6">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <motion.svg 
                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#001a66] dark:text-[#3b82f6] shrink-0 mt-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.2 + 0.1 * idx, type: "spring", stiffness: 500 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </motion.svg>
                          <span className="line-clamp-2">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm group-hover:gap-3 transition-all">
                    {t("viewProject")}
                    <svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
