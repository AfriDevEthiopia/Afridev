"use client";

import { useEffect, useRef } from "react";

// The upworkrank widget script injects the badge at the location of its
// own <script> tag using document.currentScript. Because React does not
// execute inline <script> tags rendered from JSX, we manually create the
// element and append it to a container so the badge renders in the right
// place in the DOM.
export function UpworkRankBadge({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.querySelector("script[data-upworkrank]")) return;

    const script = document.createElement("script");
    script.src = "https://upworkrank.com/w.js";
    script.async = true;
    script.setAttribute("data-agency", "1937186981697230253");
    script.setAttribute("data-format", "badge");
    script.setAttribute("data-scope", "world");
    script.setAttribute("data-theme", "custom");
    script.setAttribute("data-bg", "#ffffff");
    script.setAttribute("data-fg", "#dc1818");
    script.setAttribute("data-radius", "24");
    script.setAttribute("data-fields", "mrr,rating,jobs");
    script.setAttribute("data-upworkrank", "true");

    container.appendChild(script);
  }, []);

  return <div ref={containerRef} className={className} aria-label="Upwork agency rank badge" />;
}
