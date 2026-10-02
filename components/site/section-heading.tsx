import type { ReactNode } from "react";

/** Tamirat-style section header: small uppercase eyebrow pill above a large title. */
export function SectionHeading({
  eyebrow,
  id,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  id: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-text">
          {eyebrow}
        </span>
        <h2 id={id} className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-[2.5rem] sm:leading-[1.1]">
          {title}
        </h2>
        {description && <p className="mt-4 text-[17px] leading-relaxed text-body text-pretty">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
