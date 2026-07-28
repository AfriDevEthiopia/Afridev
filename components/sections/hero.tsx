"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const UPWORK_AGENCY_URL = "https://www.upwork.com/agencies/1937186981697230253/";

export function Hero() {
  const stats = [
    { value: "12+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "5+", label: "Countries Served" },
    { value: "99.9%", label: "Average Uptime" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise-bg">
      <div className="relative z-10 container mx-auto pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1 w-full"
          >
            {/* Main Title - Simple fade in */}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-4 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              Building the Future with{" "}
              <span className="text-accent">Cloud-Native & AI-Powered</span>{" "}
              Applications
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl"
            >
              At AfriDev, we help startups and tech teams build scalable, high-performance applications using modern technologies. From web and mobile apps to AI integration and DevOps, we turn complex ideas into seamless digital solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <button
                className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Free Consultation
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                className="btn-secondary w-full sm:w-auto"
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Our Work
              </button>
              <a
                href={UPWORK_AGENCY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5 text-[#14a800]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
                Hire us on Upwork
              </a>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-surface border border-border hover:border-border-strong transition-colors"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                    <CountUp value={stat.value} delay={0.5 + index * 0.1} />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="relative w-full">
              {/* Video Container */}
              <div className="relative glass rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-2 shadow-lg">
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
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded sm:rounded-md md:rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs md:text-sm font-medium truncate">Watch Our Intro</p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground hidden sm:block">Learn more about AfriDev</p>
                    </div>
                  </div>
                  <a
                    href="https://youtu.be/DOEM7pu9shU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] sm:text-[10px] md:text-xs text-primary hover:underline hidden md:block shrink-0"
                  >
                    Open in YouTube →
                  </a>
                </div>
              </div>
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
function CountUp({ value, delay }: { value: string; delay: number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (hasAnimated.current) return;
    
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
  }, [value, delay]);
  
  return <>{displayValue}</>;
}
