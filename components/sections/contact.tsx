"use client";

import { useTranslations } from "next-intl";
import { useState, FormEvent, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { AnimatedButton } from "@/components/animations";

export function Contact() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

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

  const inputVariants = {
    idle: { 
      scale: 1,
      boxShadow: "0 0 0 0 rgba(0, 26, 102, 0)"
    },
    focused: { 
      scale: 1.01,
      boxShadow: "0 0 0 4px rgba(0, 26, 102, 0.1), 0 0 30px rgba(59, 130, 246, 0.08)"
    }
  };

  const labelVariants = {
    idle: { y: 0, scale: 1, color: "var(--foreground)" },
    focused: { y: -2, scale: 1.02, color: "var(--primary)" }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/5 via-transparent to-primary/5" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs sm:text-sm text-accent mb-3 sm:mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 sm:space-y-5 lg:space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.label 
                  htmlFor="name" 
                  className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                  variants={labelVariants}
                  animate={focusedField === "name" ? "focused" : "idle"}
                  transition={{ duration: 0.2 }}
                >
                  {t("name")}
                </motion.label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Tamirat Kebede"
                  variants={inputVariants}
                  animate={focusedField === "name" ? "focused" : "idle"}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <motion.label 
                  htmlFor="email" 
                  className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                  variants={labelVariants}
                  animate={focusedField === "email" ? "focused" : "idle"}
                  transition={{ duration: 0.2 }}
                >
                  {t("email")}
                </motion.label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="tamiratkebede120@gmail.com"
                  variants={inputVariants}
                  animate={focusedField === "email" ? "focused" : "idle"}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.label 
                htmlFor="subject" 
                className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                variants={labelVariants}
                animate={focusedField === "subject" ? "focused" : "idle"}
                transition={{ duration: 0.2 }}
              >
                {t("subject")}
              </motion.label>
              <motion.input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Project inquiry"
                variants={inputVariants}
                animate={focusedField === "subject" ? "focused" : "idle"}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <motion.label 
                htmlFor="message" 
                className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                variants={labelVariants}
                animate={focusedField === "message" ? "focused" : "idle"}
                transition={{ duration: 0.2 }}
              >
                {t("message")}
              </motion.label>
              <motion.textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm sm:text-base"
                placeholder="Tell us about your project..."
                variants={inputVariants}
                animate={focusedField === "message" ? "focused" : "idle"}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <AnimatedButton
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base lg:text-lg flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.svg 
                        className="w-4 h-4 sm:w-5 sm:h-5" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </motion.svg>
                      {t("sending")}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {t("send")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </AnimatedButton>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs sm:text-sm text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                    className="inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("success")}
                  </motion.div>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm text-center"
                >
                  {t("error")}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
