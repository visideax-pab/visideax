import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why VisideaX | For Entrepreneurs",
  description:
    "If you're an entrepreneur with a real estate project, a signature event, or a partnership to structure, VisideaX prepares everything you need to bring it to the table.",
};

const categories = [
  {
    title: "Real Estate & Signature Events",
    image: "/images/st-moritz.jpg",
    description:
      "A hospitality concept, a redevelopment, a signature winter event — we build the business plan, the day-in-the-life revenue model, and the CapEx breakdown that a serious operator or capital partner expects to see before saying yes.",
    points: [
      "Business plan and commercial logic",
      "Revenue and cost modeling, built around your assumptions",
      "The presentation you actually take into the room",
    ],
  },
  {
    title: "Regulatory & Financial Structuring",
    image: "/images/zurich.jpg",
    description:
      "Swiss regulatory complexity — Lex Koller, cantonal licensing, fiscal structure — shapes what a project can look like long before a lawyer gets involved. We build that awareness into the model from the start, so your own counsel isn't starting from zero.",
    points: [
      "Financial models that reflect realistic regulatory assumptions",
      "Early flagging of structural constraints, not surprises later",
      "Documentation built to withstand real scrutiny",
    ],
  },
  {
    title: "Capital & International Partnerships",
    image: "/images/london.jpg",
    description:
      "Whether the counterparty is a family office, an operator, or an institutional partner, the document that reaches them needs to read as rigorous on first pass. We prepare partnership presentations built for exactly that audience.",
    points: [
      "Partnership presentations for institutional and family-office audiences",
      "Feasibility estimates using a consistent, benchmarked methodology",
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
            One Partner for Everything You Need to Bring a Project to the Table
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            If you&apos;re an entrepreneur with a real project — real estate,
            an event, a partnership — you shouldn&apos;t need four different
            vendors to get it in front of the right people. That&apos;s what
            VisideaX is built to replace.
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
            <span className="eyebrow text-alpine-gold">Why One Team, Not Four Vendors</span>
            <p className="text-balance text-base leading-relaxed text-alpine-cream/70 sm:text-lg">
              A business-plan writer doesn&apos;t always understand Swiss structuring. A
              financial modeler doesn&apos;t always know what a family office actually asks in
              the room. VisideaX exists so an entrepreneur has one accountable point of
              contact — not a chain of specialists who have never spoken to each other.
            </p>
            <Button variant="gold" size="lg" asChild className="mt-4">
              <a href="/#contact">Bring Us Your Project</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
