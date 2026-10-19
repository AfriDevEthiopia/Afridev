"use client";

import { useEffect, useRef } from "react";

const CLIENT = "ca-pub-3587873357935808";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/** Small banner (320×100) sitting just above the site footer. */
export function FooterAd() {
  const slotRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || slot.dataset.adPushed === "1") return;
    slot.dataset.adPushed = "1";
    window.adsbygoogle = window.adsbygoogle || [];
    try {
      window.adsbygoogle.push({});
    } catch {
      // Stays empty until AdSense approves the site.
    }
  }, []);

  return (
    <aside aria-label="Advertisement" className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-3 sm:px-8">
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Advertisement</p>
        <ins
          ref={slotRef}
          className="adsbygoogle"
          style={{ display: "inline-block", width: 320, height: 100 }}
          data-ad-client={CLIENT}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      </div>
    </aside>
  );
}
