import { TESTIMONIALS } from "@/lib/constants";
import { LINKS } from "@/lib/site";
import { ExternalIcon, StarIcon } from "./icons";
import { SectionHeading } from "./section-heading";

/** "Nov 9, 2025 - Nov 26, 2025" -> "Nov 2025" */
const endMonth = (period: string) => {
  const end = period.split(" - ").at(-1) ?? period;
  const [month, , year] = end.replace(",", "").split(" ");
  return year ? `${month} ${year}` : end;
};

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Reviews"
          id="reviews-title"
          title="What clients say"
          description="Verified feedback from Upwork clients."
          aside={
            <a
              href={LINKS.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-text underline-offset-4 hover:underline"
            >
              See all reviews on Upwork
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          }
        />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {TESTIMONIALS.map((review) => (
            <li key={review.id} className="flex flex-col border-t border-border pt-6">
              <div className="flex gap-0.5 text-amber-500" role="img" aria-label={`Rated ${review.rating} out of 5`}>
                {Array.from({ length: review.rating }, (_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">“{review.quote}”</blockquote>
              <p className="mt-5 text-xs leading-snug text-muted-foreground break-words sm:text-[13px]">
                <span className="text-body">{review.project.replace(/\s+-\s+/g, " – ")}</span>
                <br />
                Upwork client · {endMonth(review.period)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
