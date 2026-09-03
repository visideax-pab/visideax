import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights | VisideaX",
  description:
    "Short analytical notes from VisideaX on territory, capital, and Swiss structuring — the thinking behind the business plans we prepare.",
};

const insights = [
  {
    title: "Why Territory Is Becoming a Balance-Sheet Asset",
    date: "September 2026",
    excerpt:
      "Luxury brands increasingly need a territory, not just a partner with capital. A brand attached to the right valley or city block compounds in a way a generic retail lease never will — which means territorial access itself is starting to be underwritten like an asset, not treated as a formality.",
  },
  {
    title: "The Off-Season Problem in Alpine Hospitality",
    date: "September 2026",
    excerpt:
      "Most Alpine luxury venues operate on a roughly 130-day season. The businesses that convert that into a 365-day model rarely do it by adding headcount from scratch — they do it by rotating an existing brigade from a sister property in a different hemisphere or season, which solves recruitment, training, and quality risk in one move.",
  },
  {
    title: "What Lex Koller Actually Blocks (and What It Doesn't)",
    date: "September 2026",
    excerpt:
      "Lex Koller is routinely cited as the reason foreign capital can't touch Swiss real estate — which overstates it. The restriction is narrower and more specific than its reputation, and the structures that work around it legitimately look very different from the workarounds usually assumed. Every business plan we prepare accounts for this early, not as a footnote at the end.",
  },
];

export default function InsightsPage() {
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
          <span className="eyebrow text-alpine-gold">Insights</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            Notes on Territory, Capital & Structuring
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            Short, occasional notes from the VisideaX team — the kind of
            thinking that goes into every business plan and financial model
            we prepare, shared here in general form.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8">
            {insights.map((item) => (
              <div
                key={item.title}
                className="group border border-alpine-slate/10 bg-white/60 p-8 transition-colors hover:border-alpine-gold/40 sm:p-10"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-alpine-gold/70">
                  {item.date}
                </span>
                <h2 className="mt-3 font-display text-xl text-alpine-slate sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-alpine-slate/60">
                  {item.excerpt}
                </p>
                <a
                  href="mailto:visideax@etik.com?subject=Insights%20—%20Ask%20a%20Question"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-alpine-gold/80 transition-colors group-hover:text-alpine-gold"
                >
                  Discuss This With Us
                  <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-xl text-center text-xs leading-relaxed text-alpine-slate/40">
            These notes are general commentary, not advice on any specific
            transaction, and do not reflect confidential client work.
          </p>
        </div>
      </section>
    </main>
  );
}
