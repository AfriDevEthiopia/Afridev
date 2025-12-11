"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import { CursorGlow, PageTransition } from "@/components/animations";

export default function HomePage() {
  return (
    <PageTransition>
      {/* Cursor Glow Effect - Only on Desktop */}
      <CursorGlow />
      
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
