import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { team } from "@/lib/data";
import { TeamGrid } from "@/components/TeamGrid";

export const metadata: Metadata = {
  title: "Founding Team | VisideaX",
  description:
    "The three founding partners behind VisideaX — a private Swiss boutique advisory being built across St. Moritz, Zürich, and London.",
};

export default function TeamPage() {
  return (
    <main>
      <section className="relative bg-alpine-slate pb-20 pt-40 sm:pb-28 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="container relative flex flex-col items-center text-center">
          <span className="eyebrow text-alpine-gold">Governance &amp; Leadership</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            The Founding Team
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            Three founding partners spanning origination, operational
            governance, and M&amp;A structuring — across St. Moritz and
            Zürich. Click any profile to read more.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <TeamGrid team={team} />

          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 border border-alpine-gold/40 bg-alpine-slate px-8 py-10 text-center sm:px-14">
            <div className="flex h-11 w-11 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
              <ShieldCheck size={20} strokeWidth={1.5} />
            </div>
            <span className="eyebrow text-alpine-gold">Personal Oversight</span>
            <p className="text-balance text-sm leading-relaxed text-alpine-cream/75 sm:text-base">
              Every mandate — before it is accepted, and before it is
              closed — is reviewed and approved personally by Francesco
              Rocca and Federico del Maestro. No engagement moves forward
              without passing through both of their hands.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
