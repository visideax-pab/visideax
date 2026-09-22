import { Hero } from "@/components/Hero";
import { BrandFilm } from "@/components/BrandFilm";
import { ClientNotice } from "@/components/ClientNotice";
import { ExecutiveOverview } from "@/components/ExecutiveOverview";
import { Pillars } from "@/components/Pillars";
import { Presence } from "@/components/Presence";
import { AdvisoryMatrix } from "@/components/AdvisoryMatrix";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandFilm />
      <ClientNotice />
      <ExecutiveOverview />
      <Pillars />
      <Presence />
      <AdvisoryMatrix />
      <Contact />
    </main>
  );
}
