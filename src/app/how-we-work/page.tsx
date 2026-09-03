import type { Metadata } from "next";
import { MessageSquare, FileSignature, PenTool, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Work | VisideaX",
  description:
    "The four-step process behind every VisideaX engagement — from confidential introduction to delivery.",
};

const steps = [
  {
    icon: MessageSquare,
    title: "1. Confidential Introduction",
    description:
      "You describe the project. We ask enough questions to understand whether we can genuinely help, and whether the scope fits a consulting engagement rather than something requiring a full advisory mandate.",
  },
  {
    icon: FileSignature,
    title: "2. Scoping & Fee Agreement",
    description:
      "Before any work begins, we agree in writing on the deliverable, the timeline, and the fee — priced individually for each project, based on scope and complexity. No open-ended billing.",
  },
  {
    icon: PenTool,
    title: "3. Analysis & Drafting",
    description:
      "We research the territory, model the numbers, and draft the document — a business plan, a financial model, a partnership presentation, or a combination of the three.",
  },
  {
    icon: PackageCheck,
    title: "4. Delivery & Presentation",
    description:
      "You receive the finished document. What happens next — the negotiation, the execution, the capital — is between you and your counterparties. Our role ends at delivery, except in St. Moritz.",
  },
];

export default function HowWeWorkPage() {
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
          <span className="eyebrow text-alpine-gold">How We Work</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            A Deliberately Narrow Process
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            Four steps, agreed in writing before we start, ending at a
            defined deliverable — not an open-ended relationship.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.title}
                className="border border-alpine-slate/10 bg-white/60 p-9"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                  <step.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-lg text-alpine-slate">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-alpine-slate/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-5 border border-alpine-gold/40 bg-alpine-slate px-8 py-10 text-center sm:px-14">
            <span className="eyebrow text-alpine-gold">The One Exception</span>
            <p className="text-balance text-sm leading-relaxed text-alpine-cream/75 sm:text-base">
              In St. Moritz, where our founder has genuine on-the-ground
              standing, we can credibly stay involved beyond delivery — as a
              local counterpart, not just a document preparer. Everywhere
              else, the deliverable is the engagement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
