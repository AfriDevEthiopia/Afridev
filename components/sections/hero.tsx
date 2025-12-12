"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

const UPWORK_AGENCY_URL = "https://www.upwork.com/agencies/1937186981697230253/";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: "12+", label: tStats("projects") },
    { value: "100%", label: tStats("satisfaction") },
    { value: "5+", label: tStats("countries") },
    { value: "99.9%", label: tStats("uptime") },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 -left-32 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[128px] animate-pulse-glow" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-1/4 -right-32 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-accent/20 rounded-full blur-[80px] sm:blur-[128px] animate-pulse-glow" 
          style={{ animationDelay: "1.5s" }} 
        />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-linear-to-r from-primary/5 to-accent/5 rounded-full blur-[100px]" />
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-size-[32px_32px] lg:bg-size-[64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 w-full"
          >
            {/* Main Title - Simple fade in */}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>{" "}
              {t("titleEnd")}
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl"
            >
              {t("description")}
            </motion.p>

            {/* CTA Buttons - Navy Blue Corporate Identity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <motion.a
                href={UPWORK_AGENCY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#14a800] hover:bg-[#14a800]/90 text-white font-semibold transition-all shadow-lg shadow-[#14a800]/30 w-full sm:w-auto text-xs sm:text-sm"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
                Hire Us on Upwork
              </motion.a>
              <motion.button
                className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("cta")}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
              <motion.button
                className="bg-white text-[#001a66] border-2 border-[#001a66] dark:bg-white dark:text-[#001a66] dark:border-white/20 font-semibold px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl transition-all shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-100 w-full sm:w-auto text-xs sm:text-sm"
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("ctaSecondary")}
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: "rgba(0, 26, 102, 0.4)",
                  }}
                  className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/30 border border-border transition-colors"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                    <CountUp value={stat.value} delay={1.1 + index * 0.1} isLoaded={isLoaded} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - YouTube Video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="relative w-full">
              {/* Glow effect behind video - Navy Blue */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -inset-1 sm:-inset-2 md:-inset-4 bg-gradient-to-r from-[#001a66]/20 to-[#3b82f6]/20 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-xl md:blur-2xl" 
              />
              
              {/* Video Container */}
              <motion.div 
                className="relative glass rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-2 glow-sm sm:glow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-video rounded-md sm:rounded-lg md:rounded-xl overflow-hidden bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/DOEM7pu9shU"
                    title="AfriDev Introduction"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                
                {/* Video Label */}
                <div className="flex items-center justify-between mt-1.5 sm:mt-2 md:mt-3 px-0.5 sm:px-1 md:px-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <motion.div 
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded sm:rounded-md md:rounded-lg bg-gradient-to-br from-[#001a66] to-[#3b82f6] flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs md:text-sm font-medium truncate">Watch Our Intro</p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground hidden sm:block">Learn more about AfriDev</p>
                    </div>
                  </div>
                  <motion.a
                    href="https://youtu.be/DOEM7pu9shU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] sm:text-[10px] md:text-xs text-primary hover:underline hidden md:block shrink-0"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Open in YouTube →
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-bounce"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}

// Simple count up animation
function CountUp({ value, delay, isLoaded }: { value: string; delay: number; isLoaded: boolean }) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (!isLoaded || hasAnimated.current) return;
    
    let interval: NodeJS.Timeout | null = null;
    
    const timeout = setTimeout(() => {
      hasAnimated.current = true;
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
      const suffix = value.replace(/[0-9.]/g, "");
      const duration = 1500;
      const steps = 30;
      const stepDuration = duration / steps;
      let step = 0;
      
      interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(numericValue * easeOut * 10) / 10;
        
        if (Number.isInteger(numericValue)) {
          setDisplayValue(Math.round(current) + suffix);
        } else {
          setDisplayValue(current.toFixed(1) + suffix);
        }
        
        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(interval!);
        }
      }, stepDuration);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isLoaded, value, delay]);
  
  return <>{displayValue}</>;
}
