"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const UPWORK_AGENCY_URL = "https://www.upwork.com/agencies/1937186981697230253/";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    
    const animateElement = (element: HTMLElement | null, delay: number) => {
      if (!element) return;
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = isDesktop ? "translate(0, 0)" : "translateY(0)";
      }, delay);
    };

    animateElement(leftRef.current, 200);
    animateElement(rightRef.current, 400);
  }, []);

  const stats = [
    { value: "12+", label: tStats("projects") },
    { value: "100%", label: tStats("satisfaction") },
    { value: "5+", label: tStats("countries") },
    { value: "99.9%", label: tStats("uptime") },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise-bg">
      {/* Animated background elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-accent/20 rounded-full blur-[80px] sm:blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-linear-to-r from-primary/5 to-accent/5 rounded-full blur-[100px]" />
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-size-[32px_32px] lg:bg-size-[64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div
            ref={leftRef}
            className="opacity-0 transition-all duration-1000 ease-out order-2 lg:order-1 w-full translate-y-5 lg:translate-y-0 lg:-translate-x-8"
          >
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-4 sm:mb-6">
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>{" "}
              {t("titleEnd")}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <a
                href={UPWORK_AGENCY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#14a800] hover:bg-[#14a800]/90 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-[#14a800]/30 w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
                Hire Us on Upwork
              </a>
              <button
                className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("cta")}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                className="btn-secondary w-full sm:w-auto"
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("ctaSecondary")}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/30 border border-border"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - YouTube Video */}
          <div
            ref={rightRef}
            className="opacity-0 transition-all duration-1000 ease-out order-1 lg:order-2 w-full translate-y-5 lg:translate-y-0 lg:translate-x-8"
          >
            <div className="relative w-full">
              {/* Glow effect behind video - Reduced on mobile */}
              <div className="absolute -inset-1 sm:-inset-2 md:-inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl md:rounded-3xl blur-lg sm:blur-xl md:blur-2xl" />
              
              {/* Video Container */}
              <div className="relative glass rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-1.5 md:p-2 glow-sm sm:glow">
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
                
                {/* Video Label - Simplified on mobile */}
                <div className="flex items-center justify-between mt-1.5 sm:mt-2 md:mt-3 px-0.5 sm:px-1 md:px-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded sm:rounded-md md:rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
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
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
