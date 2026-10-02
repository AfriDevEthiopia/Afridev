import { PROCESS } from "@/lib/site";
import { SectionHeading } from "./section-heading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Process" id="process-title" title="How we work with you" />
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, index) => (
            <li key={step.title} className="border-t border-border pt-6">
              <span className="text-[13px] font-medium tabular-nums text-primary-text">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[17px] font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
