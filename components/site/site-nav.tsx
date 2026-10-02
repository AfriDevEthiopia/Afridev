"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LINKS, NAV_ITEMS } from "@/lib/site";
import { CloseIcon, MenuIcon } from "./icons";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto max-w-[71rem] rounded-2xl border backdrop-blur-md transition-shadow ${
          open ? "bg-surface" : "bg-surface/85"
        } ${scrolled || open ? "border-border shadow-md" : "border-border/70 shadow-xs"}`}
      >
        <div className="flex h-14 items-center justify-between pl-4 pr-2 sm:pl-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="AfriDev home">
            <Image src="/images/icons/Icon-Color.svg" alt="" width={22} height={24} priority />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">AfriDev</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-body transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href="#contact"
              className="hidden h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:inline-flex"
            >
              Book a call
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-lg p-2.5 text-foreground md:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="border-t border-border px-2 pb-3 pt-2 md:hidden">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[15px] font-medium text-foreground hover:bg-tint"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-11 items-center justify-center rounded-xl bg-primary text-[15px] font-semibold text-white"
            >
              Book a call
            </a>
            <a
              href={`mailto:${LINKS.email}`}
              className="mt-2 block py-2 text-center text-sm text-muted-foreground"
            >
              {LINKS.email}
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
