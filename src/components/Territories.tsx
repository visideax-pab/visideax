"use client";

import { motion } from "framer-motion";

const territories = [
  {
    name: "St. Moritz",
    role: "Alpine Origination",
    image: "/images/st-moritz.jpg",
  },
  {
    name: "Zürich",
    role: "Swiss Structuring",
    image: "/images/zurich.jpg",
  },
  {
    name: "London",
    role: "International Capital",
    image: "/images/london.jpg",
  },
];

export function Territories() {
  return (
    <section className="relative bg-alpine-slate py-0">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {territories.map((territory, i) => (
          <motion.div
            key={territory.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[280px] overflow-hidden sm:h-[340px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${territory.image})` }}
            />
            <div className="absolute inset-0 bg-alpine-slate/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-alpine-slate via-alpine-slate/20 to-transparent" />
            <div className="relative flex h-full flex-col items-center justify-end pb-9 text-center">
              <span className="font-display text-2xl text-alpine-cream">
                {territory.name}
              </span>
              <span className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-alpine-gold">
                {territory.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
