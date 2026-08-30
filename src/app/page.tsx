import { Hero } from "@/components/Hero";
import { Territories } from "@/components/Territories";
import { ExecutiveOverview } from "@/components/ExecutiveOverview";
import { Pillars } from "@/components/Pillars";
import { AdvisoryMatrix } from "@/components/AdvisoryMatrix";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Territories />
      <ExecutiveOverview />
      <Pillars />
      <AdvisoryMatrix />
      <Contact />
    </main>
  );
}
