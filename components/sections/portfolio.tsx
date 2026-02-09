"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { PROJECTS } from "@/lib/constants";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import Image from "next/image";

export function Portfolio() {
  const t = useTranslations("portfolio");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (e: React.MouseEvent, src: string, alt: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxImage({ src, alt });
  };

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage, closeLightbox]);

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

                  {/* Zoom button - appears on hover */}
                  {project.image && (
                    <motion.button
                      onClick={(e) => openLightbox(e, project.image!, project.title)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110 shadow-lg cursor-zoom-in"
                      aria-label={`View ${project.title} image full size`}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#001a66] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </motion.button>
                  )}
                  
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
                          <motion.span 
                            className="w-5 h-5 rounded-full bg-[#001a66] dark:bg-[#3b82f6] flex items-center justify-center shrink-0 mt-0.5"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.2 + 0.1 * idx, type: "spring", stiffness: 500 }}
                          >
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.span>
                          <span className="line-clamp-2">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ===== LIGHTBOX MODAL ===== */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative z-10 w-[90vw] h-[80vh] sm:w-[85vw] sm:h-[85vh] max-w-6xl"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes="90vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Image title */}
            <motion.p
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm sm:text-base font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.15 }}
            >
              {lightboxImage.alt}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
