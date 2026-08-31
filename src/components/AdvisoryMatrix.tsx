"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";
import { advisoryServices } from "@/lib/data";

export function AdvisoryMatrix() {
  return (
    <section id="advisory" className="relative bg-alpine-cream py-28 lg:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Advisory Services"
          title="A Disciplined, Narrow Service Matrix"
          description="Every engagement draws from the same disciplined scope — no generic M&A coverage, only what a Swiss-rooted, pan-European partnership actually requires."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advisoryServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="border border-alpine-slate/10 bg-white/60 p-8 transition-colors hover:border-alpine-gold/40">
                <h3 className="font-display text-lg text-alpine-slate">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-alpine-slate/55">
                  {service.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
