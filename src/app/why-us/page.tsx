import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why VisideaX | For Entrepreneurs",
  description:
    "If you're an entrepreneur with a real estate project, a signature event, or a partnership to structure, VisideaX prepares everything you need to bring it to the table.",
};

const categories = [
  {
    title: "Signature Events",
    image: "/images/st-moritz.jpg",
    description:
      "An invitation-led summit, a private winter gathering, a flagship cultural moment — we work out who needs to be in the room, the format that earns their time, and the commercial model that pays for it.",
    points: [
      "Concept, format and guest strategy",
      "Venue logic and operator selection",
      "A commercial model built around your objectives",
    ],
  },
  {
    title: "Government & Destination Partnerships",
    image: "/images/zurich.jpg",
    description:
      "Tourism authorities, cities and regions increasingly partner with private organisers to bring flagship events to a territory. We structure those arrangements so each side knows its role, its risk and its return.",
    points: [
      "Public–private partnership frameworks",
      "Proposals built for institutional decision-makers",
      "Permitting and licensing groundwork by jurisdiction",
    ],
  },
  {
    title: "Sponsorship & Cross-Border Structuring",
    image: "/images/london.jpg",
    description:
      "Whether the counterparty is a brand, a family office or a ministry, the structure behind the event has to read as rigorous on first pass. We prepare the sponsor, host and JV architecture across European borders.",
    points: [
      "Sponsor, host and co-organiser agreements framework",
      "Cross-border considerations flagged early, for your counsel",
      "One point of contact, start to finish",
    ],
  },
];

export default function WhyUsPage() {
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
          <span className="eyebrow text-alpine-gold">For Entrepreneurs</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            One Partner for Events and Partnerships That Have to Be Done Properly
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            If you&apos;re a government body, a destination, a family office or an
            entrepreneur with an event or partnership in mind, you shouldn&apos;t
            need four different advisers to get it in front of the right
            people. That&apos;s what VisideaX is built to replace.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container space-y-20">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-alpine-slate/15" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-alpine-slate sm:text-3xl">
                  {cat.title}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-alpine-slate/60 sm:text-base">
                  {cat.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {cat.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-alpine-slate/70"
                    >
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-alpine-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-alpine-slate py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <span className="eyebrow text-alpine-gold">One Team, Not Four Vendors</span>
            <p className="text-balance text-base leading-relaxed text-alpine-cream/70 sm:text-lg">
              An event producer doesn&apos;t always understand partnership structuring. A
              lawyer doesn&apos;t always know what a destination or a sponsor actually needs
              in the room. VisideaX exists so you have one accountable point of
              contact — not a chain of specialists who have never spoken to each other.
            </p>
            <Button variant="gold" size="lg" asChild className="mt-4">
              <Link href="/#contact">Introduce Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
