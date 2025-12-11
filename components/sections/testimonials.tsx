"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const t = useTranslations("testimonials");
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
    <section id="testimonials" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs sm:text-sm text-green-500 mb-3 sm:mb-4">
            Client Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 card-hover opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-5 lg:mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">5.0</span>
              </div>

              {/* Quote */}
              <blockquote className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 lg:mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="border-t border-border pt-4 sm:pt-5 lg:pt-6">
                <p className="font-semibold text-xs sm:text-sm mb-1 line-clamp-1">{testimonial.project}</p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  <span className="line-clamp-1">{testimonial.period}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground hidden sm:block" />
                  <span className="text-green-500 font-medium">{testimonial.budget}</span>
                </div>
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
