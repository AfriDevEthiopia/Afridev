import Image from "next/image";
import { UpworkRankBadge } from "@/components/layout/upwork-rank-badge";
import { LINKS } from "@/lib/site";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "./icons";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Web development", href: "#services" },
      { label: "AI integration", href: "#services" },
      { label: "Mobile apps", href: "#services" },
      { label: "Cloud & DevOps", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Reviews", href: "#reviews" },
      { label: "Careers", href: LINKS.careers },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Book a call", href: LINKS.calendly },
      { label: LINKS.email, href: `mailto:${LINKS.email}` },
      { label: "Upwork agency", href: LINKS.upwork },
    ],
  },
];

const SOCIAL = [
  { label: "AfriDev on GitHub", href: LINKS.github, icon: GithubIcon },
  { label: "AfriDev on LinkedIn", href: LINKS.linkedin, icon: LinkedinIcon },
  { label: "AfriDev on Upwork", href: LINKS.upwork, icon: UpworkIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 sm:gap-12 sm:px-8 sm:py-16 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2.5" aria-label="AfriDev home">
            <Image src="/images/icons/Icon-Color.svg" alt="" width={22} height={24} />
            <span className="font-semibold tracking-tight text-foreground">AfriDev</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Software agency building web, mobile and AI products for startups and tech teams. Based in Addis Ababa,
            working with clients worldwide.
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary-text"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-[13px] font-semibold text-foreground">{column.title}</p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-afd-event="nav_click"
                    data-afd-prop-to={link.label}
                    data-afd-prop-location="footer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-muted-foreground sm:text-[13px]">© {new Date().getFullYear()} AfriDev. All rights reserved.</p>
          <div className="max-w-full overflow-hidden">
            <UpworkRankBadge className="min-h-[40px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
