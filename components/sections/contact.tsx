"use client";

import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";

export function Contact() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-primary/5" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs sm:text-sm text-accent mb-3 sm:mb-4">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-12 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
              {t("name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="John Doe"
            />
          </div>
          <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="john@example.com"
            />
              </div>
          </div>

            {/* Subject */}
          <div>
              <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
              {t("subject")}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Project inquiry"
            />
          </div>

            {/* Message */}
          <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              required
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm sm:text-base"
                placeholder="Tell us about your project..."
            />
          </div>

          {/* Submit Button */}
            <button
            type="submit"
            disabled={isSubmitting}
              className="w-full btn-primary py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base lg:text-lg"
          >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t("sending")}
                </span>
              ) : (
                t("send")
              )}
            </button>

          {/* Status Messages */}
          {status === "success" && (
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs sm:text-sm text-center">
              {t("success")}
            </div>
          )}
          {status === "error" && (
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm text-center">
              {t("error")}
            </div>
          )}
        </form>
        </div>
      </div>
    </section>
  );
}
