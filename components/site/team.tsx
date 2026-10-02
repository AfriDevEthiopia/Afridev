import Image from "next/image";
import { FOUNDER_NOTE, LINKS } from "@/lib/site";
import { ArrowRightIcon } from "./icons";
import { SectionHeading } from "./section-heading";

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="The team" id="team-title" title="A note from our founder" />
          <figure className="mt-10">
            <blockquote className="text-xl font-medium leading-[1.5] tracking-[-0.01em] text-foreground text-pretty sm:text-2xl">
              “{FOUNDER_NOTE.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Image
                src={FOUNDER_NOTE.photo}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
              />
              <div>
                <a href={LINKS.founder} className="font-semibold text-foreground hover:text-primary-text">
                  {FOUNDER_NOTE.name}
                </a>
                <p className="text-sm text-muted-foreground">{FOUNDER_NOTE.role}</p>
              </div>
            </figcaption>
          </figure>
        </div>

        <aside className="self-end rounded-2xl border border-border bg-surface p-7 sm:p-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-text">Careers</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">We’re hiring engineers</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body">
            Join the team building these products. See open roles and apply in two short steps.
          </p>
          <a
            href={LINKS.careers}
            className="group mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary"
          >
            View open roles
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </aside>
      </div>
    </section>
  );
}
