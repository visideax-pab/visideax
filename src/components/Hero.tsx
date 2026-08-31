"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { heroMetrics } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden noise-overlay pt-32 pb-16"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/st-moritz.jpg)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-alpine-gradient opacity-[0.93]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] rounded-full bg-alpine-gold/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-alpine-silver/5 blur-[140px]"
      />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-alpine-gold/40 bg-alpine-gold/5 px-5 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-alpine-gold" />
          <span className="eyebrow text-alpine-gold">
            Private Swiss Boutique Advisory
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl text-balance font-display text-4xl font-medium leading-[1.12] text-alpine-cream sm:text-5xl lg:text-6xl"
        >
          VisideaX
          <span className="mx-4 text-alpine-gold">|</span>
          Partnership Advisory Boutique
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 max-w-2xl text-balance text-base font-light leading-relaxed text-alpine-cream/70 sm:text-lg"
        >
          Architects of durable alliances between capital, luxury brands, and
          the European territories that anchor them — assembled quietly,
          between Zürich and London, for those who already know where to look.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button variant="gold" size="lg" asChild>
            <a href="#contact" className="inline-flex items-center gap-3">
              Request Confidential Mandate
              <ArrowRight size={16} />
            </a>
          </Button>
          <Button variant="outlineLight" size="lg" asChild>
            <a href="#overview">Explore Advisory</a>
          </Button>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-10 border-t border-alpine-cream/10 pt-12 sm:grid-cols-3"
        >
          {heroMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center">
              <div className="font-display text-4xl text-alpine-gold sm:text-5xl">
                <AnimatedCounter
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <p className="mt-3 max-w-[220px] text-center text-xs font-medium uppercase tracking-[0.12em] text-alpine-cream/55">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#overview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-alpine-cream/40 hover:text-alpine-gold transition-colors"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={22} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
