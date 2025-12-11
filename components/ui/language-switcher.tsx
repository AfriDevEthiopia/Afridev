"use client";

import { useState, useRef, useEffect, useId } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Globe, Languages, Check, ChevronDown } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside - only add listener when open
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on escape key - only add listener when open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 hover:border-primary/50 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <currentLang.Flag />
        <span className="text-sm font-medium hidden sm:block">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 sm:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="glass rounded-2xl border border-border shadow-2xl shadow-black/20 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-border">
    <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">Select Language</span>
                </div>
              </div>

              {/* Language Options */}
              <div className="p-2" role="listbox">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
            locale === lang.code
                        ? "bg-primary/20 border border-primary/30"
                        : "hover:bg-secondary/50 border border-transparent"
                    }`}
                    role="option"
                    aria-selected={locale === lang.code}
                  >
                    {/* Flag */}
                    <lang.Flag />
                    
                    {/* Language Info */}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{lang.label}</p>
                      <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                    </div>

                    {/* Check mark for selected */}
                    {locale === lang.code && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
        </button>
      ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-secondary/30">
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> Supporting 3 languages
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
