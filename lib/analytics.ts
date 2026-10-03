/**
 * First-party visitor analytics (AfriDev admin → Visitors). The tracker script is
 * added in app/layout.tsx; calls made before it loads are queued and replayed.
 */
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    afd?: { track: (name: string, props?: Props) => void };
    __afdq?: unknown[][];
  }
}

export const track = (name: string, props?: Props) => {
  if (typeof window === "undefined") return;
  if (window.afd) window.afd.track(name, props);
  else (window.__afdq ||= []).push(["track", name, props]);
};
