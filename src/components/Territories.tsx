"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const territories = [
  {
    name: "St. Moritz",
    role: "Alpine Origination",
    image: "/images/st-moritz.jpg",
    href: "/st-moritz",
  },
  {
    name: "Zürich",
    role: "Swiss Structuring",
    image: "/images/zurich.jpg",
    href: "/zurich",
  },
  {
    name: "London",
    role: "International Capital",
    image: "/images/london.jpg",
    href: "/london",
  },
];

export function Territories() {
  return (
    <section className="relative bg-alpine-slate py-0">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {territories.map((territory, i) => (
          <motion.a
            key={territory.name}
            href={territory.href}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block h-[280px] overflow-hidden sm:h-[340px]"
          >
            <Image
              src={territory.image}
              alt={territory.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-alpine-slate/55 transition-colors duration-500 group-hover:bg-alpine-slate/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-alpine-slate via-alpine-slate/20 to-transparent" />
            <div className="relative flex h-full flex-col items-center justify-end pb-9 text-center">
              <span className="font-display text-2xl text-alpine-cream">
                {territory.name}
              </span>
              <span className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-alpine-gold">
                {territory.role}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-alpine-cream/0 transition-all duration-300 group-hover:text-alpine-cream/70">
                Explore
                <ArrowUpRight size={13} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
