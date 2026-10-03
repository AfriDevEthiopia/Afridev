import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { Process } from "@/components/site/process";
import { Reviews } from "@/components/site/reviews";
import { Services } from "@/components/site/services";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Team } from "@/components/site/team";
import { Work } from "@/components/site/work";

export default function HomePage() {
  return (
    <>
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to contact
      </a>
      <SiteNav />
      <Hero />
      <main>
        <Services />
        <Work />
        <Process />
        <Reviews />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
