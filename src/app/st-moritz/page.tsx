import type { Metadata } from "next";
import Image from "next/image";
import { Mountain, Landmark, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "St. Moritz | VisideaX",
  description:
    "VisideaX's origination base in St. Moritz — where off-market Alpine luxury assets and cantonal relationships are built quietly, over years, not deals.",
};

const highlights = [
  {
    icon: Mountain,
    title: "Alpine Origination",
    description:
      "Our founding territory and the source of the firm's proprietary map of off-market luxury and hospitality assets across the Engadin valley.",
  },
  {
    icon: Landmark,
    title: "Cantonal Relationships",
    description:
      "Direct, long-standing relationships with communal and cantonal authorities — the access that makes Lex Koller and licensing hurdles navigable rather than blocking.",
  },
  {
    icon: Lock,
    title: "Reserved by Design",
    description:
      "Most of what moves through St. Moritz never reaches an open market. Origination here happens through introduction, not advertisement.",
  },
];

export default function StMoritzPage() {
  return (
    <main>
      <section className="relative flex h-[70vh] min-h-[520px] items-center overflow-hidden">
        <Image
          src="/images/st-moritz.jpg"
          alt="St. Moritz"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-alpine-gradient opacity-[0.88]" />
        <div className="container relative flex flex-col items-center pt-24 text-center">
          <span className="eyebrow text-alpine-gold">Territory</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-medium text-alpine-cream sm:text-6xl">
            St. Moritz
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/70 sm:text-lg">
            The Engadin valley is where VisideaX was founded, and where its
            deepest, quietest relationships still live.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-balance text-base leading-relaxed text-alpine-slate/65">
              St. Moritz is not a market VisideaX enters and exits — it is
              the ground the firm is built on. Every off-market hospitality
              asset, every private club concept, every conversation with a
              cantonal authority begins with a network assembled here over
              years of physical presence, not a database of listings.
              This is why our Institutional Moat pillar exists: access in
              the Engadin cannot be bought from a desk in London or Geneva.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="border border-alpine-slate/10 bg-white/60 p-9"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-lg text-alpine-slate">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-alpine-slate/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="text-sm leading-relaxed text-alpine-slate/60">
              If your mandate touches St. Moritz or the wider Engadin, it is
              reviewed by the people who are actually there.
            </p>
            <Button variant="default" size="lg" asChild>
              <a href="/#contact">Request Confidential Mandate</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
