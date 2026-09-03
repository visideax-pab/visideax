import { Hero } from "@/components/Hero";
import { BrandFilm } from "@/components/BrandFilm";
import { ClientNotice } from "@/components/ClientNotice";
import { Territories } from "@/components/Territories";
import { ExecutiveOverview } from "@/components/ExecutiveOverview";
import { Pillars } from "@/components/Pillars";
import { AdvisoryMatrix } from "@/components/AdvisoryMatrix";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandFilm />
      <ClientNotice />
      <Territories />
      <ExecutiveOverview />
      <Pillars />
      <AdvisoryMatrix />
      <Contact />
    </main>
  );
}
