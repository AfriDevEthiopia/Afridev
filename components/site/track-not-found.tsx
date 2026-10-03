"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Reports a 404 to visitor analytics so broken links show up in the admin. */
export function TrackNotFound() {
  useEffect(() => {
    track("page_error", { status: 404 });
  }, []);
  return null;
}
