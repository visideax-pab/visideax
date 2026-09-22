"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const cities = [
  {
    name: "St. Moritz",
    role: "Founding Base",
    image: "/images/st-moritz.jpg",
    description:
      "Where VisideaX was founded, and where our access is direct rather than claimed — one of Europe's most concentrated gathering points for principals and brands each winter season.",
  },
  {
    name: "Lugano",
    role: "Private Capital Gateway",
    image: "/images/lugano.jpg",
    description:
      "Ticino's private-banking tradition and its proximity to Milan extend our network into Swiss-Italian and Italian private capital, beyond the German-speaking cantons.",
  },
  {
    name: "Bratislava",
    role: "EU Institutional Base",
    image: "/images/bratislava.jpg",
    description:
      "Inside the European Union, close to Vienna and Budapest — the footing we need to work with governments, agencies and institutions across Europe, on their own terms.",
  },
];

export function Presence() {
  return (
    <section className="bg-alpine-cream py-28 lg:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Presence"
          title="Three Cities, One Reason for Each"
          description="We are not present everywhere. Each base exists for a specific reason, and each one is genuine."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden border border-alpine-slate/10 bg-white/60"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-alpine-slate/70 via-alpine-slate/10 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="font-display text-xl text-alpine-cream">{city.name}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="eyebrow text-alpine-gold">{city.role}</span>
                <p className="mt-3 text-sm leading-relaxed text-alpine-slate/65">
                  {city.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.68rem] leading-relaxed text-alpine-slate/35">
          Photos: Lake Lugano by Samuel Ferrara (CC BY-SA 4.0) and Bratislava by Marc Ryckaert
          (CC BY 3.0), via Wikimedia Commons.
        </p>
      </div>
    </section>
  );
}
