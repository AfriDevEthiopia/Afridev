import { SERVICES } from "@/lib/site";
import { CheckIcon } from "./icons";
import { SectionHeading } from "./section-heading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <SectionHeading
          eyebrow="Services"
          id="services-title"
          title="What we build"
          description="End-to-end product engineering, from the first prototype to production infrastructure."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <li key={service.title} className="border-t border-border pt-6">
              <span className="text-[13px] font-medium tabular-nums text-primary-text">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-foreground">{service.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-body">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
