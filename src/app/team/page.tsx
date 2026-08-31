import type { Metadata } from "next";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team | VisideaX",
  description:
    "The founding partners and senior team behind VisideaX — a private Swiss boutique advisory operating across St. Moritz, Zürich, and London.",
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
            The Team Behind Every Mandate
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            A small, senior team spanning origination, structuring, and
            regulatory affairs across St. Moritz, Zürich, and London.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="border border-alpine-slate/10 bg-white/60 p-9"
              >
                <div className="flex h-14 w-14 items-center justify-center border border-alpine-gold/40 font-display text-lg text-alpine-gold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-6 font-display text-xl text-alpine-slate">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-alpine-gold">
                  {member.role}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-alpine-slate/40">
                  {member.location}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-alpine-slate/60">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
