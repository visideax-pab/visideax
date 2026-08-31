"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { footprint } from "@/lib/data";

const SCENES = [
  { key: "mark", duration: 3400 },
  { key: "thesis", duration: 3800 },
  { key: "territories", duration: 4200 },
  { key: "close", duration: 4600 },
];

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function ProgressBar({ scene }: { scene: number }) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex gap-1.5 p-4">
      {SCENES.map((s, i) => (
        <div key={s.key} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/20">
          {i < scene && <div className="h-full w-full bg-alpine-gold" />}
          {i === scene && (
            <motion.div
              key={`${scene}-${s.key}`}
              className="h-full bg-alpine-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: s.duration / 1000, ease: "linear" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FilmScene({ scene }: { scene: number }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-alpine-gradient px-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-alpine-gold/10 blur-[110px]"
      />

      <AnimatePresence mode="wait">
        {scene === 0 && (
          <motion.div key="s0" {...fade} className="relative">
            <img src="/logo-mark-light.svg" alt="VisideaX" className="mx-auto h-14 w-auto sm:h-20" />
            <h2 className="mt-6 font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
              VisideaX
            </h2>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-alpine-gold sm:text-sm">
              Partnership Advisory Boutique
            </p>
          </motion.div>
        )}

        {scene === 1 && (
          <motion.div key="s1" {...fade} className="relative max-w-xl">
            <p className="font-display text-2xl italic leading-snug text-alpine-cream sm:text-4xl">
              &ldquo;Capital is abundant.
              <br />
              Trustworthy origination is scarce.&rdquo;
            </p>
          </motion.div>
        )}

        {scene === 2 && (
          <motion.div key="s2" {...fade} className="relative flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            {footprint.map((city, i) => (
              <React.Fragment key={city}>
                {i > 0 && <span className="hidden h-px w-10 bg-alpine-gold/40 sm:block" />}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.35, duration: 0.6 }}
                  className="font-display text-xl text-alpine-cream sm:text-3xl"
                >
                  {city}
                </motion.span>
              </React.Fragment>
            ))}
          </motion.div>
        )}

        {scene === 3 && (
          <motion.div key="s3" {...fade} className="relative">
            <p className="font-display text-2xl font-medium text-alpine-cream sm:text-4xl">
              Multi-Million Mandates,
              <br />
              Built to Last
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-alpine-gold">
              Our ambition for every partnership
            </p>
            <div className="mt-8 inline-flex items-center gap-2 border border-alpine-gold/50 px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-alpine-cream/85">
              Request Confidential Mandate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BrandFilm() {
  const [open, setOpen] = React.useState(false);
  const [scene, setScene] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setScene((s) => (s + 1) % SCENES.length), SCENES[scene].duration);
    return () => clearTimeout(t);
  }, [open, scene]);

  React.useEffect(() => {
    if (open) setScene(0);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <section className="border-y border-alpine-slate/10 bg-alpine-cream py-10">
        <div className="container flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <span className="eyebrow text-alpine-gold">The Film</span>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-alpine-slate/60">
              A short visual introduction to VisideaX — the thesis, the territories, the ambition.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-3 border border-alpine-gold/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-alpine-slate transition-colors hover:border-alpine-gold hover:bg-alpine-gold/5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-alpine-slate text-alpine-cream transition-colors group-hover:bg-alpine-gold">
              <Play size={14} fill="currentColor" />
            </span>
            Watch the Film
          </button>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-4xl overflow-hidden shadow-elevated"
            >
              <ProgressBar scene={scene} />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 text-alpine-cream/60 transition-colors hover:text-alpine-gold"
              >
                <X size={22} />
              </button>
              <FilmScene scene={scene} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
