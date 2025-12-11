"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { 
  Rocket, 
  Smartphone, 
  Monitor, 
  Bot, 
  Cloud, 
  Target,
  type LucideIcon 
} from "lucide-react";

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm text-primary mb-3 sm:mb-4">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group glass rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 card-hover opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Icon with gradient background */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                {t(`${service.id}.title`)}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                {t(`${service.id}.description`)}
              </p>

              {/* Hover Arrow - Hidden on mobile */}
              <div className="mt-4 sm:mt-5 lg:mt-6 hidden sm:flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs sm:text-sm font-medium">Learn more</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
