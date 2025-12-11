"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateElement = (element: HTMLElement | null, delay: number) => {
      if (!element) return;
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0) translateX(0)";
      }, delay);
    };

    animateElement(leftRef.current, 200);
    animateElement(rightRef.current, 400);
  }, []);

  const stats = [
    { value: "88+", label: tStats("projects") },
    { value: "100%", label: tStats("satisfaction") },
    { value: "15+", label: tStats("countries") },
    { value: "99.9%", label: tStats("uptime") },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise-bg">
      {/* Animated background elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-accent/20 rounded-full blur-[80px] sm:blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-[100px]" />
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:32px_32px] lg:bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div
            ref={leftRef}
            className="opacity-0 -translate-x-4 sm:-translate-x-8 transition-all duration-1000 ease-out order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{t("tagline")}</span>
            </div>

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
            className="opacity-0 translate-x-4 sm:translate-x-8 transition-all duration-1000 ease-out order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect behind video - Reduced on mobile */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              
              {/* Video Container */}
              <div className="relative glass rounded-xl sm:rounded-2xl p-1.5 sm:p-2 glow-sm sm:glow">
                <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-black">
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
                <div className="flex items-center justify-between mt-2 sm:mt-3 px-1 sm:px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Watch Our Intro</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Learn more about AfriDev</p>
                    </div>
                  </div>
                  <a
                    href="https://youtu.be/DOEM7pu9shU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs text-primary hover:underline hidden sm:block"
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
