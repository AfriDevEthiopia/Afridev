"use client";

import { useEffect } from "react";

export function NoTranslate() {
  useEffect(() => {
    // Remove existing google translate meta tag if any
    const existingMeta = document.querySelector('meta[name="google"]');
    if (existingMeta) {
      existingMeta.remove();
    }

    // Add meta tag to prevent Google Translate
    const meta = document.createElement("meta");
    meta.name = "google";
    meta.content = "notranslate";
    document.head.appendChild(meta);

    // Note: The 'notranslate' class is already set on <html> by the layout,
    // so we don't need to add/remove it here

    return () => {
      // Cleanup on unmount - only remove meta tag, not the class
      // The class should remain as it's set by the layout
      const metaTag = document.querySelector('meta[name="google"]');
      if (metaTag) {
        metaTag.remove();
      }
    };
  }, []);

  return null;
}

