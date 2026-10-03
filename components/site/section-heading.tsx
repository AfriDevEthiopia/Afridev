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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="max-w-2xl">
        <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-text">
          {eyebrow}
        </span>
        <h2 id={id} className="mt-3 text-[1.75rem] font-semibold tracking-[-0.03em] text-foreground text-balance sm:mt-4 sm:text-3xl md:text-[2.5rem] sm:leading-[1.1]">
          {title}
        </h2>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-body text-pretty sm:mt-4 sm:text-[17px]">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
