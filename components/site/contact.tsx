"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { LINKS } from "@/lib/site";
import { CalendarIcon, CheckIcon, ChevronDownIcon, MailIcon, UpworkIcon } from "./icons";
import { SectionHeading } from "./section-heading";

const PROJECT_TYPES = [
  "Web application",
  "AI integration",
  "Mobile app",
  "Desktop app",
  "Cloud & DevOps",
  "Consulting",
  "Something else",
];

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary-soft sm:px-4 sm:text-[15px]";

export function Contact() {
  const [sent, setSent] = useState(false);
  const started = useRef(false);

  // Opens the visitor's email app with the enquiry addressed to AfriDev, ready to send
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const projectType = String(data.get("subject") ?? "");
    const details = String(data.get("message") ?? "").trim();

    const subject = `Project enquiry: ${projectType} – ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType}`, "", details].join("\n");
    track("contact_submit", { project_type: projectType });
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      data-afd-section="contact"
      aria-labelledby="contact-title"
      className="border-t border-border bg-gradient-to-b from-background to-tint"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-28 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            id="contact-title"
            title="Let’s talk about your project"
            description="Tell us what you’re building, or book a free 30-minute consultation to talk it through with our team."
          />
          <ul className="mt-8 divide-y divide-border border-y border-border sm:mt-10">
            {[
              {
                icon: CalendarIcon,
                label: "Book a 30-minute call",
                detail: "Free, no commitment",
                href: LINKS.calendly,
                cta: "calendly",
              },
              { icon: MailIcon, label: LINKS.email, detail: "Email us directly", href: `mailto:${LINKS.email}`, cta: "email" },
              { icon: UpworkIcon, label: "Hire us on Upwork", detail: "Top Rated agency", href: LINKS.upwork, cta: "hire" },
            ].map(({ icon: Icon, label, detail, href, cta }) => (
              <li key={label}>
                <a
                  href={href}
                  data-afd-event="cta_click"
                  data-afd-prop-cta={cta}
                  data-afd-prop-location="contact"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3.5 py-3.5 sm:gap-4 sm:py-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary-text sm:text-[15px]">
                      {label}
                    </span>
                    <span className="block text-xs text-muted-foreground sm:text-[13px]">{detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-md sm:p-8">
          {sent ? (
            <div className="flex h-full flex-col justify-center py-10" role="status">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                <CheckIcon className="h-4 w-4" />
                Message ready to send
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                Check your email app
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                We opened a message to{" "}
                <a
                  href={`mailto:${LINKS.email}`}
                  className="font-medium text-primary-text underline underline-offset-4"
                >
                  {LINKS.email}
                </a>{" "}
                with your details filled in. Press send and our team will reply by email. If nothing opened, write to
                us at that address directly, or{" "}
                <a
                  href={LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-text underline underline-offset-4"
                >
                  book a call
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 self-start text-sm font-medium text-body underline-offset-4 hover:text-foreground hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onFocusCapture={() => {
                if (started.current) return;
                started.current = true;
                track("contact_start");
              }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="What do you need?" htmlFor="subject">
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    <option value="" disabled>
                      Choose a project type
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </Field>
              <Field label="Project details" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building, and what does success look like?"
                  className={`${inputClass} resize-y`}
                />
              </Field>
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Send message
              </button>
              <p className="text-center text-[13px] text-muted-foreground">
                Opens your email app with a message to {LINKS.email}.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
