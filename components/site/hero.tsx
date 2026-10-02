import { AGENCY_DESCRIPTION, TRACK_RECORD } from "@/lib/site";
import { ArrowRightIcon, StarIcon } from "./icons";
import { IntroVideo } from "./intro-video";

export function Hero() {
  return (
    <header id="top" className="border-b border-border bg-gradient-to-b from-tint to-background">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-700">
                <StarIcon className="h-3.5 w-3.5" />
                Top Rated on Upwork
              </span>
              <span className="text-muted-foreground">Software agency · Addis Ababa · Founded 2025</span>
            </div>

            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground text-balance sm:text-6xl sm:leading-[1.02] lg:text-[3.6rem]">
              We build web, mobile and <span className="whitespace-nowrap text-primary">AI products</span> for&nbsp;startups
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body text-pretty">{AGENCY_DESCRIPTION}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-xl bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Book a free call
              </a>
              <a href="#work" className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground">
                See our work
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <IntroVideo />
        </div>

        <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface sm:mt-16 lg:grid-cols-4">
          {TRACK_RECORD.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col-reverse justify-end gap-1 border-border px-5 py-5 sm:px-6 ${
                index % 2 === 0 ? "border-r" : ""
              } ${index < 2 ? "border-b lg:border-b-0" : ""} ${index === 1 ? "lg:border-r" : ""}`}
            >
              <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
              <dd className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
