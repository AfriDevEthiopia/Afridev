"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { PROJECT_TYPES } from "@/lib/site";

/**
 * "Book a call" flow. Any element with data-afd-book opens it (the element keeps its normal
 * href as a fallback). Without NEXT_PUBLIC_BOOKING_API_URL the modal stays dormant and those
 * links behave exactly as before.
 */

const API = (process.env.NEXT_PUBLIC_BOOKING_API_URL || "").replace(/\/$/, "");
export const bookingEnabled = !!API;

/** Details a visitor already typed elsewhere (the contact form), carried into the booking form. */
export interface BookingPrefill {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

/** Opens the booking modal from code. Returns false when booking is off (no API URL), so callers can fall back. */
export const openBooking = (prefill?: BookingPrefill, location = "unknown"): boolean => {
  if (!API || typeof window === "undefined") return false;
  window.dispatchEvent(new CustomEvent("afd:book", { detail: { prefill, location } }));
  return true;
};

interface Availability {
  timezone: string;
  slotMinutes: number;
  days: Record<string, string[]>;
}

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const dayKey = (iso: string, tz: string) => new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(new Date(iso));
const timeLabel = (iso: string, tz: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(new Date(iso));
const longLabel = (iso: string, tz: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(new Date(iso));

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary-soft sm:text-[15px]";

type Step = "pick" | "details" | "done";

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("pick");
  const [tz, setTz] = useState("UTC");
  const [month, setMonth] = useState(() => {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [slots, setSlots] = useState<string[]>([]); // every free slot (ISO) in the loaded range
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Open from any [data-afd-book] element, or from openBooking()
  useEffect(() => {
    if (!API) return;
    const show = (location: string, from: HTMLElement | null, data: BookingPrefill = {}) => {
      returnFocus.current = from;
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
      setPrefill(data);
      setStep("pick");
      setSlot(null);
      setDay(null);
      setFormError("");
      setOpen(true);
      track("booking_open", { location });
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-afd-book]");
      if (!el) return;
      e.preventDefault();
      show(el.dataset.afdPropLocation || "unknown", el);
    };
    const onOpen = (e: Event) => {
      const { prefill: data, location } = (e as CustomEvent<{ prefill?: BookingPrefill; location: string }>).detail;
      show(location, document.activeElement as HTMLElement | null, data);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("afd:book", onOpen);
    // The "pick another time" email links to /#book
    const onHash = () => {
      if (window.location.hash === "#book") show("reschedule_email", null);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
      window.removeEventListener("afd:book", onOpen);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  // Load the visible month (padded by a day each side: the visitor's timezone can shift a slot across midnight)
  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    const from = new Date(Date.UTC(month.y, month.m, 0)).toISOString().slice(0, 10);
    const to = new Date(Date.UTC(month.y, month.m + 1, 1)).toISOString().slice(0, 10);
    try {
      const res = await fetch(`${API}/bookings/availability?from=${from}&to=${to}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || "Could not load times");
      setSlots(Object.values((json.data as Availability).days).flat());
    } catch (e) {
      setSlots([]);
      setLoadError(e instanceof Error ? e.message : "Could not load times");
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    // Fetching on open / month change is the point of this effect; load() sets loading state first
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open && step === "pick") void load();
  }, [open, step, load]);

  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const s of slots) {
      const k = dayKey(s, tz);
      map.set(k, [...(map.get(k) || []), s]);
    }
    return map;
  }, [slots, tz]);

  const timeZones = useMemo(() => {
    try {
      const all = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
      return all.includes(tz) ? all : [tz, ...all];
    } catch {
      return [tz];
    }
  }, [tz]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slot) return;
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          website: data.get("website"),
          startAt: slot,
          timezone: tz,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setSlot(null);
        setStep("pick");
        setLoadError("That time was just taken. Please choose another.");
        void load();
        return;
      }
      if (!res.ok) throw new Error(json?.error?.message || "Something went wrong. Please try again.");
      track("booking_request", { project_type: String(data.get("projectType")) });
      setStep("done");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  // Month grid (weeks start on Monday)
  const first = new Date(month.y, month.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const todayKey = dayKey(new Date().toISOString(), tz);
  const nowMonth = new Date();
  const canGoBack = month.y > nowMonth.getFullYear() || month.m > nowMonth.getMonth();
  const monthName = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(first);
  const daySlots = day ? byDay.get(day) || [] : [];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        className="flex max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden bg-surface shadow-xl outline-none sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
          <div>
            <h2 id="booking-title" className="text-lg font-semibold tracking-tight text-foreground">
              {step === "done" ? "Request sent" : "Book a free 30-minute call"}
            </h2>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Google Meet · Free, no commitment</p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="-mr-2 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-tint hover:text-foreground">
            <span aria-hidden="true" className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {step === "pick" && (
            <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{monthName}</p>
                  <div className="flex gap-1">
                    <button type="button" aria-label="Previous month" disabled={!canGoBack} onClick={() => setMonth(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }))} className="h-9 w-9 rounded-lg border border-border text-foreground disabled:opacity-40">‹</button>
                    <button type="button" aria-label="Next month" onClick={() => setMonth(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }))} className="h-9 w-9 rounded-lg border border-border text-foreground">›</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <span key={d} className="py-1">{d}</span>
                  ))}
                </div>
                <div className={`mt-1 grid grid-cols-7 gap-1 ${loading ? "opacity-50" : ""}`} aria-busy={loading}>
                  {cells.map((d, i) => {
                    if (d === null) return <span key={`b${i}`} />;
                    const key = ymd(month.y, month.m, d);
                    const available = (byDay.get(key)?.length ?? 0) > 0;
                    const selected = day === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={!available}
                        aria-pressed={selected}
                        aria-label={`${d} ${monthName}${available ? "" : ", no times"}`}
                        onClick={() => {
                          setDay(key);
                          setSlot(null);
                        }}
                        className={`aspect-square rounded-xl text-sm font-medium transition-colors ${
                          selected ? "bg-primary text-white" : available ? "bg-primary-soft text-primary-text hover:bg-primary hover:text-white" : "text-muted-foreground/50"
                        } ${key === todayKey && !selected ? "ring-1 ring-border-strong" : ""}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <label className="mt-4 block text-[12px] text-muted-foreground">
                  Times shown in
                  <select value={tz} onChange={(e) => setTz(e.target.value)} className="mt-1 block w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px] text-foreground">
                    {timeZones.map((z) => (
                      <option key={z} value={z}>{z.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div aria-live="polite">
                {loadError && <p className="mb-3 rounded-xl bg-danger/10 px-3 py-2 text-[13px] text-danger">{loadError}</p>}
                {!day ? (
                  <p className="text-sm text-muted-foreground">{loading ? "Loading times…" : slots.length || loadError ? "Pick a highlighted day to see times." : "No times are open this month. Try the next one."}</p>
                ) : (
                  <>
                    <p className="mb-3 text-sm font-semibold text-foreground">
                      {new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${day}T12:00:00Z`))}
                    </p>
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-2">
                      {daySlots.map((s) => (
                        <button key={s} type="button" aria-pressed={slot === s} onClick={() => setSlot(s)} className={`h-11 rounded-xl border text-sm font-semibold transition-colors ${slot === s ? "border-primary bg-primary text-white" : "border-border text-foreground hover:border-primary"}`}>
                          {timeLabel(s, tz)}
                        </button>
                      ))}
                    </div>
                    <button type="button" disabled={!slot} onClick={() => setStep("details")} className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50">
                      Continue
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {step === "details" && slot && (
            <form onSubmit={submit} className="space-y-4">
              <p className="flex items-center justify-between gap-3 rounded-xl bg-tint px-4 py-3 text-sm font-medium text-foreground">
                <span>{longLabel(slot, tz)} <span className="font-normal text-muted-foreground">({tz.replace(/_/g, " ")})</span></span>
                <button type="button" onClick={() => setStep("pick")} className="text-primary-text underline underline-offset-4">Change</button>
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-[13px] font-medium text-foreground">Name
                  <input name="name" required minLength={2} maxLength={120} autoComplete="name" defaultValue={prefill.name} className={`${inputClass} mt-1.5`} />
                </label>
                <label className="block text-[13px] font-medium text-foreground">Email
                  <input name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={prefill.email} className={`${inputClass} mt-1.5`} />
                </label>
              </div>
              <label className="block text-[13px] font-medium text-foreground">Project type
                <select name="projectType" required defaultValue={prefill.projectType && PROJECT_TYPES.includes(prefill.projectType) ? prefill.projectType : PROJECT_TYPES[0]} className={`${inputClass} mt-1.5`}>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block text-[13px] font-medium text-foreground">What are you building?
                <textarea name="message" rows={4} maxLength={3000} required defaultValue={prefill.message} placeholder="A few lines about the project, goals and timeline" className={`${inputClass} mt-1.5 resize-y`} />
              </label>
              {/* Honeypot: hidden from people, bots fill it */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              {formError && <p role="alert" className="rounded-xl bg-danger/10 px-3 py-2 text-[13px] text-danger">{formError}</p>}
              <button type="submit" disabled={submitting} className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60">
                {submitting ? "Sending…" : "Request this time"}
              </button>
              <p className="text-center text-[12px] text-muted-foreground">We confirm each request by email with your Google Meet link.</p>
            </form>
          )}

          {step === "done" && slot && (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-2xl text-primary-text">✓</span>
              <p className="mt-4 text-lg font-semibold text-foreground">{longLabel(slot, tz)}</p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-body">
                We’ll email you once the time is confirmed, with your Google Meet link and a calendar invite.
              </p>
              <button type="button" onClick={close} className="mt-6 h-11 rounded-xl border border-border px-6 text-sm font-semibold text-foreground hover:bg-tint">Done</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
