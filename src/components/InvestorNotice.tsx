"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function InvestorNotice() {
  return (
    <section className="relative overflow-hidden bg-alpine-slate py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-alpine-gold/10 blur-[130px]"
      />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-3xl flex-col items-center border border-alpine-gold/40 bg-alpine-navy/40 px-8 py-14 text-center sm:px-16 sm:py-16"
        >
          <span className="eyebrow text-alpine-gold">Founding Phase</span>
          <h2 className="mt-5 text-balance font-display text-3xl font-medium text-alpine-cream sm:text-4xl">
            VisideaX Is Currently Being Built
          </h2>
          <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-alpine-cream/70 sm:text-base">
            VisideaX has not yet closed a mandate. We are in our founding
            phase and are privately raising a seed round from a small number
            of qualified private investors and family offices to fund our
            launch. This is not a public offer of securities, and is not
            open to the general public.
          </p>
          <a
            href="mailto:visideax@etik.com?subject=Investor%20Enquiry%20%E2%80%94%20VisideaX%20Seed%20Round"
            className="mt-9 inline-flex items-center gap-3 border border-alpine-gold bg-alpine-gold/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-alpine-cream transition-colors hover:bg-alpine-gold hover:text-alpine-slate"
          >
            Investor Enquiries, By Introduction Only
            <ArrowRight size={15} />
          </a>
          <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-alpine-cream/35">
            Qualified investors and family offices only — reviewed individually, by private introduction
          </p>
        </motion.div>
      </div>
    </section>
  );
}
