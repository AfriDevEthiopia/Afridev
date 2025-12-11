"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", nativeName: "English" },
  { code: "am", label: "Amharic", flag: "🇪🇹", nativeName: "አማርኛ" },
  { code: "om", label: "Afaan Oromo", flag: "🇪🇹", nativeName: "Afaan Oromoo" },
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
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLang.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
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
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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
                    <span className="text-2xl">{lang.flag}</span>
                    
                    {/* Language Info */}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{lang.label}</p>
                      <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                    </div>

                    {/* Check mark for selected */}
                    {locale === lang.code && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-secondary/30">
                <p className="text-xs text-muted-foreground text-center">
                  🌍 Supporting 3 languages
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
