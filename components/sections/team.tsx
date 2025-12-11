"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import { TEAM_MEMBERS, TESTIMONIALS } from "@/lib/constants";

const UPWORK_AGENCY_URL = "https://www.upwork.com/agencies/1937186981697230253/";

export function Team() {
  const t = useTranslations("team");
  const tTestimonials = useTranslations("testimonials");

  return (
    <section id="team" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative container mx-auto">
        {/* ===== CLIENT REVIEWS SECTION ===== */}
        <div id="testimonials" className="mb-16 sm:mb-20 lg:mb-28">
          {/* Reviews Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs sm:text-sm text-green-500 mb-3 sm:mb-4">
              Client Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
              {tTestimonials("title")}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              {tTestimonials("subtitle")}
            </p>
          </div>

          {/* Reviews Carousel */}
          <Carousel
            items={TESTIMONIALS}
            renderItem={(testimonial) => <ReviewCard testimonial={testimonial} />}
            autoSlideInterval={4000}
          />
        </div>

        {/* ===== TEAM SECTION ===== */}
        <div className="mb-12 sm:mb-16">
          {/* Team Header */}
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

          {/* Team Carousel */}
          <Carousel
            items={TEAM_MEMBERS}
            renderItem={(member) => <TeamCard member={member} t={t} />}
            autoSlideInterval={5000}
          />
        </div>

        {/* View on Upwork CTA */}
        <div className="text-center">
          <a
            href={UPWORK_AGENCY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14a800] hover:bg-[#14a800]/90 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-[#14a800]/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
            </svg>
            View Our Agency on Upwork
          </a>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3">
            100% Job Success Rate • Top Rated Agency
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== REUSABLE CAROUSEL COMPONENT =====
interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoSlideInterval?: number;
}

function Carousel<T extends { id: string }>({ items, renderItem, autoSlideInterval = 4000 }: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const isTransitioningRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate items to show based on screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  // Stable advance function using ref to avoid stale closures
  const advanceSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 500);
  }, [items.length]);

  // Start auto-slide interval
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advanceSlide, autoSlideInterval);
  }, [advanceSlide, autoSlideInterval]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // Get visible items with infinite loop effect
  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItems.push({ item: items[index], originalIndex: index });
    }
    return visibleItems;
  };

  const visibleItems = getVisibleItems();

  // Manual navigation
  const goToSlide = (index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex(index);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 500);
    startInterval();
  };

  const prevSlide = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 500);
    startInterval();
  };

  const handleNextSlide = () => {
    advanceSlide();
    startInterval();
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all group"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all group"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Track */}
      <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
        <div 
          className="flex gap-3 sm:gap-4 md:gap-6 transition-all duration-500 ease-out"
        >
          {visibleItems.map(({ item, originalIndex }, idx) => (
            <div
              key={`${item.id}-${originalIndex}-${idx}`}
              className={`flex-shrink-0 transition-all duration-500 ease-out ${
                itemsToShow === 1 ? "w-full" : itemsToShow === 2 ? "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)]" : "w-[calc(33.333%-0.667rem)] md:w-[calc(33.333%-1rem)]"
              }`}
              style={{
                animation: "slideIn 0.5s ease-out forwards",
              }}
            >
              {renderItem(item, originalIndex)}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6 sm:mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6 sm:w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0.5;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// ===== TEAM MEMBER CARD =====
function TeamCard({ member, t }: { member: typeof TEAM_MEMBERS[0]; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="group glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 text-center card-hover h-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
      <div>
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-5 lg:mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
              {member.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1">{member.name}</h3>
        
        {/* Title */}
        <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 leading-relaxed line-clamp-2">
          {member.title}
        </p>

        {/* Badge */}
        <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium mb-3 sm:mb-4 ${
          member.badge === "Top Rated"
            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
        }`}>
          {member.badge === "Top Rated" ? t("topRated") : t("risingTalent")}
        </span>
      </div>

      {/* Job Success */}
      <div className="pt-3 sm:pt-4 border-t border-border">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">{member.jobSuccess}</div>
        <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">{t("jobSuccess")}</div>
      </div>
    </div>
  );
}

// ===== REVIEW CARD =====
function ReviewCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="group glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 card-hover h-full min-h-[280px] sm:min-h-[320px] flex flex-col">
      {/* Upwork Logo & Rating */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#14a800]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
        </svg>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < testimonial.rating ? "text-yellow-500" : "text-muted-foreground/30"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Project Title */}
      <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2">
        {testimonial.project}
      </h3>

      {/* Quote */}
      <div className="flex-1">
        <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed line-clamp-4 sm:line-clamp-5">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 sm:pt-4 mt-auto border-t border-border">
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
          <span className="truncate max-w-[60%]">{testimonial.period.split(" - ")[0]}</span>
          <span className="font-medium text-green-500 truncate max-w-[40%]">{testimonial.budget.split(" ")[0]}</span>
        </div>
      </div>
    </div>
  );
}
