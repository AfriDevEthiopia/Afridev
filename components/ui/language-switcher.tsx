"use client";

import { useId, useCallback } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "motion/react";

// Flag icons as SVG components for better rendering
// Using useId to generate unique IDs for clipPath elements to avoid duplicate ID conflicts
const FlagEN = () => {
  const id = useId();
  const clipId1 = `${id}-clip-s`;
  const clipId2 = `${id}-clip-t`;
  
  return (
    <svg className="w-6 h-6 rounded-sm overflow-hidden" viewBox="0 0 60 30">
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
  <svg className="w-6 h-6 rounded-sm overflow-hidden" viewBox="0 0 60 30">
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

  const currentLang = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];
  const currentIndex = LANGUAGES.findIndex((lang) => lang.code === locale);

  // Cycle to the next language on click
  const handleClick = useCallback(() => {
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    const nextLang = LANGUAGES[nextIndex];
    router.replace(pathname, { locale: nextLang.code });
  }, [router, pathname, currentIndex]);

  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 hover:border-primary/50 transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Current language: ${currentLang.label}. Click to switch language.`}
      title={`${currentLang.label} - Click to change`}
    >
      <currentLang.Flag />
      <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
    </motion.button>
  );
}
