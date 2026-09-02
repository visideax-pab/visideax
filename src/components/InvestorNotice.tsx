"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const markers = [
  { label: "Founding Phase", detail: "No mandate closed yet — building from zero" },
  { label: "Seed Round Open", detail: "Actively raising to fund launch" },
  { label: "By Introduction Only", detail: "Qualified investors, reviewed individually" },
];

export function InvestorNotice() {
  return (
    <section className="relative overflow-hidden bg-alpine-slate py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-alpine-gold/10 blur-[140px]"
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-alpine-gold/40 bg-alpine-gold/5 px-5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alpine-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-alpine-gold" />
            </span>
            <span className="eyebrow text-alpine-gold">Actively Raising — Seed Round Open</span>
          </div>

          <h2 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.1] text-alpine-cream sm:text-5xl lg:text-6xl">
            VisideaX Doesn&rsquo;t Exist Yet.
            <br />
            We Need Capital to Build It.
          </h2>

          <p className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-alpine-cream/70 sm:text-lg">
            No mandate has closed. No fee has been earned. What exists is the
            thesis, the model, and the founding team — and a private seed
            round, open now, to fund the launch. This is not a public offer
            of securities, and it is not open to the general public.
          </p>

          <motion.a
            href="mailto:visideax@etik.com?subject=Investor%20Enquiry%20%E2%80%94%20VisideaX%20Seed%20Round"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative mt-10 inline-flex items-center gap-3 border border-alpine-gold bg-alpine-gold px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-alpine-slate shadow-gold transition-colors hover:bg-alpine-gold/90"
          >
            Investor Enquiries, By Introduction Only
            <ArrowRight size={16} />
          </motion.a>

          <div className="mt-16 grid w-full grid-cols-1 gap-8 border-t border-alpine-cream/10 pt-10 sm:grid-cols-3">
            {markers.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="font-display text-lg text-alpine-gold sm:text-xl">
                  {m.label}
                </span>
                <span className="mt-2 max-w-[220px] text-center text-xs leading-relaxed text-alpine-cream/50">
                  {m.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
