"use client";

import { useId, useCallback, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

// Flag icons as SVG components for better rendering
// Using useId to generate unique IDs for clipPath elements to avoid duplicate ID conflicts
const FlagEN = () => {
  const id = useId();
  const clipId1 = `${id}-clip-s`;
  const clipId2 = `${id}-clip-t`;
  
  return (
    <svg className="w-5 h-5 rounded-sm overflow-hidden" viewBox="0 0 60 30">
      <defs>
        <clipPath id={clipId1}><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id={clipId2}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      </defs>
      <g clipPath={`url(#${clipId1})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clipId2})`} stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
};

const FlagET = () => (
  <svg className="w-5 h-5 rounded-sm overflow-hidden" viewBox="0 0 60 30">
    <rect width="60" height="10" fill="#078930"/>
    <rect y="10" width="60" height="10" fill="#FCDD09"/>
    <rect y="20" width="60" height="10" fill="#DA121A"/>
    <circle cx="30" cy="15" r="6" fill="#0F47AF"/>
    <g fill="#FCDD09" transform="translate(30,15)">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <polygon key={i} points="0,-5 1,-1.5 5,-1.5 2,0.5 3,4 0,2 -3,4 -2,0.5 -5,-1.5 -1,-1.5" 
          transform={`rotate(${angle})`} />
      ))}
    </g>
  </svg>
);

const LANGUAGES = [
  { code: "en", label: "English", Flag: FlagEN, nativeName: "English" },
  { code: "am", label: "Amharic", Flag: FlagET, nativeName: "አማርኛ" },
  { code: "om", label: "Afaan Oromo", Flag: FlagET, nativeName: "Afaan Oromoo" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  const handleSelect = useCallback((code: string) => {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
    setIsOpen(false);
  }, [router, pathname, locale]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 hover:border-primary/50 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Current language: ${currentLang.label}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <currentLang.Flag />
        <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
        <motion.svg
          className="w-3.5 h-3.5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card border border-border shadow-xl overflow-hidden z-50"
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === locale;
              return (
                <motion.button
                  key={lang.code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary/60"
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <lang.Flag />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium leading-tight">{lang.nativeName}</span>
                    <span className="text-[11px] text-muted-foreground leading-tight">{lang.label}</span>
                  </div>
                  {isActive && (
                    <motion.svg
                      className="w-4 h-4 ml-auto shrink-0 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </motion.svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
