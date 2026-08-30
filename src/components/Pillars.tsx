"use client";

import { motion } from "framer-motion";
import { Shield, Network, Scale } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { pillars } from "@/lib/data";

const icons = [Shield, Network, Scale];

export function Pillars() {
  return (
    <section id="pillars" className="relative bg-alpine-slate py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container relative">
        <SectionHeading
          eyebrow="Business Pillars"
          title="Three Operating Pillars, One Institutional Moat"
          description="Each mandate rests on the same three pillars — a defensible network, genuine ecosystem synergy, and Swiss structuring discipline."
          dark
        />

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border border-alpine-cream/10 bg-alpine-navy/50 p-9 transition-colors hover:border-alpine-gold/40"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-7 font-display text-xl text-alpine-cream">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-alpine-cream/60">
                  {pillar.description}
                </p>
                <ul className="mt-6 space-y-3 border-t border-alpine-cream/10 pt-6">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-alpine-cream/70"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-alpine-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
