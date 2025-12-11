"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { PROJECTS } from "@/lib/constants";

export function Portfolio() {
  const t = useTranslations("portfolio");
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

  const typeColors: Record<string, string> = {
    "Mobile Development": "from-purple-500 to-pink-500",
    "AI Apps & Integration": "from-orange-500 to-red-500",
    "Desktop Application Development": "from-green-500 to-emerald-500",
    "Scripts & Utilities": "from-blue-500 to-cyan-500",
    "Web Development": "from-indigo-500 to-purple-500",
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs sm:text-sm text-accent mb-3 sm:mb-4">
            Our Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group glass rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden card-hover opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {/* Project Header with Gradient */}
              <div className={`h-20 sm:h-24 lg:h-32 bg-gradient-to-br ${typeColors[project.type] || "from-primary to-accent"} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-3 sm:left-4 lg:left-6">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-black/30 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium">
                  {project.type}
                </span>
                </div>
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
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="line-clamp-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <button className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm group/btn">
                  {t("viewProject")}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
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
