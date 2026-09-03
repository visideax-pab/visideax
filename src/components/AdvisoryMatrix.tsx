"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
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
          description="Strategic consulting — business plans, financial models, and partnership presentations, prepared for private clients on a fee basis."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advisoryServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 border border-alpine-gold/40 bg-alpine-slate px-8 py-10 text-center sm:px-14"
        >
          <div className="flex h-11 w-11 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
            <FileText size={20} strokeWidth={1.5} />
          </div>
          <span className="eyebrow text-alpine-gold">Engagement Model</span>
          <p className="text-balance text-sm leading-relaxed text-alpine-cream/75 sm:text-base">
            VisideaX is a young, student-led team — which is exactly why our scope is
            deliberately narrow. We prepare the business plan, the financial model, and the
            partnership presentation — we do not assume responsibility for the underlying
            contacts, capital, or execution of any project, with the exception of our own
            on-the-ground standing in St. Moritz. Engagements are fee-based, beginning at
            CHF 5,000 depending on scope.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
