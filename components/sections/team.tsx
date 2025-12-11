"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { TEAM_MEMBERS } from "@/lib/constants";

export function Team() {
  const t = useTranslations("team");
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
    <section id="team" className="py-16 sm:py-20 lg:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm text-primary mb-3 sm:mb-4">
            Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 text-center card-hover opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-5 lg:mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                {member.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2">{member.name}</h3>

              {/* Badge */}
              <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium mb-3 sm:mb-4 ${
                    member.badge === "Top Rated"
                  ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                  : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
              }`}>
                {member.badge === "Top Rated" ? t("topRated") : t("risingTalent")}
                </span>

              {/* Job Success */}
              <div className="pt-3 sm:pt-4 border-t border-border">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">{member.jobSuccess}</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">{t("jobSuccess")}</div>
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
