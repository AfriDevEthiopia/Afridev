import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/types";
import { ExternalIcon } from "./icons";
import { SectionHeading } from "./section-heading";

const CATEGORY: Record<string, string> = {
  "Mobile Development": "Mobile app",
  "AI Apps & Integration": "AI integration",
  "Web Application": "Web application",
};

// Show the strongest work first
const ORDER = ["smartvid", "leadconnector", "rateeat", "skillbridge"];

export function Work() {
  const projects = PROJECTS.filter(
    (project): project is Project & { image: string; link: string } => !!project.image && !!project.link,
  ).sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

  return (
    <section id="work" aria-labelledby="work-title" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Our work"
          id="work-title"
          title="Products we’ve shipped"
          description="A selection of recent client work across AI, web and mobile."
        />
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {projects.map((project, index) => (
            <li key={project.id}>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-tint sm:aspect-[16/9] lg:aspect-[2/1]">
                  <Image
                    src={project.image}
                    alt={`${project.title} product screenshot`}
                    fill
                    sizes="(min-width: 640px) 560px, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={index < 2}
                  />
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:mt-6">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">{project.title}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground sm:text-[13px]">{CATEGORY[project.type] ?? project.type}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-body sm:text-[15px]">{project.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-text">
                  <span className="break-all sm:break-normal">Visit {new URL(project.link).hostname.replace(/^www\./, "")}</span>
                  <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
