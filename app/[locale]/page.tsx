import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

