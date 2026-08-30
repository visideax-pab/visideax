"use client";

import { motion } from "framer-motion";
import { EyeOff } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { thesisPoints } from "@/lib/data";

export function ExecutiveOverview() {
  return (
    <section id="overview" className="relative bg-alpine-cream py-28 lg:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Executive Overview"
          title="A Market Thesis Built for Discretion, Not Volume"
          description="VisideaX does not run auctions. We architect structured partnerships between capital, brand, and territory — engineered to survive decades, not just a closing date."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 border border-alpine-gold/40 bg-alpine-slate px-8 py-10 text-center sm:px-14"
        >
          <div className="flex h-11 w-11 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
            <EyeOff size={20} strokeWidth={1.5} />
          </div>
          <span className="eyebrow text-alpine-gold">A Boutique, By Design</span>
          <p className="text-balance text-sm leading-relaxed text-alpine-cream/75 sm:text-base">
            VisideaX is not built for recognition. We work for a small circle of
            trusted principals, not for public visibility — most of what we
            structure is never announced, and many of our closed mandates stay
            private long after they close. If you know of us, it is because
            someone we already trust introduced you.
          </p>
        </motion.div>

        <div className="mt-24">
          <h3 className="text-center font-display text-2xl text-alpine-slate">
            Core Thesis
          </h3>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-alpine-slate/10 bg-alpine-slate/10 sm:grid-cols-2 lg:grid-cols-4">
            {thesisPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4 bg-alpine-cream p-8"
              >
                <span className="font-display text-3xl text-alpine-gold/60">
                  0{i + 1}
                </span>
                <p className="text-sm leading-relaxed text-alpine-slate/75">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
