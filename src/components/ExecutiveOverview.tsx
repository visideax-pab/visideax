"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FlowField } from "@/components/FlowField";
import { thesisPoints } from "@/lib/data";

export function ExecutiveOverview() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-alpine-cream py-28 lg:py-36"
    >
      <FlowField className="pointer-events-auto absolute inset-0" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Executive Overview"
          title="Events and Partnerships, Built on Discretion"
          description="We advise on the gatherings and alliances where the right people meet the right counterparties — designed around relationship, not attendance."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 border border-alpine-gold/40 bg-alpine-slate px-8 py-10 text-center sm:px-14"
        >
          <div className="flex h-11 w-11 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
            <Users size={20} strokeWidth={1.5} />
          </div>
          <span className="eyebrow text-alpine-gold">Selective By Design</span>
          <p className="text-balance text-sm leading-relaxed text-alpine-cream/75 sm:text-base">
            We take on a deliberately limited number of engagements at a
            time, and each one is handled personally by the founding team.
            Confidentiality is the default: what we work on stays between us
            and the client. Governments, destinations, family offices and
            private entrepreneurs are all welcome to introduce a project.
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
                animate={{ opacity: 1, y: 0 }}
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
