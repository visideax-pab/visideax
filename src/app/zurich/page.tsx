import type { Metadata } from "next";
import Image from "next/image";
import { Scale, Landmark, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Zürich | VisideaX",
  description:
    "VisideaX's structuring and governance base in Zürich — where every alliance is built to be resilient under Swiss corporate, fiscal, and regulatory law.",
};

const highlights = [
  {
    icon: Scale,
    title: "Swiss Structuring",
    description:
      "NewCo formation, Joint Venture architecture, shareholder agreements, and voting structures — engineered by the team that lives inside Swiss corporate law daily.",
  },
  {
    icon: Landmark,
    title: "Financial Governance",
    description:
      "Zürich is home to the Managing Partner's office and the firm's own financial and risk governance — the same discipline we require of every mandate.",
  },
  {
    icon: Calculator,
    title: "Fiscal & Regulatory Depth",
    description:
      "Cantonal tax structuring, Lex Koller compliance, and licensing frameworks are managed by counsel based here, not outsourced to a generalist firm.",
  },
];

export default function ZurichPage() {
  return (
    <main>
      <section className="relative flex h-[70vh] min-h-[520px] items-center overflow-hidden">
        <Image
          src="/images/zurich.jpg"
          alt="Zürich"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-alpine-gradient opacity-[0.88]" />
        <div className="container relative flex flex-col items-center pt-24 text-center">
          <span className="eyebrow text-alpine-gold">Territory</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-medium text-alpine-cream sm:text-6xl">
            Zürich
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/70 sm:text-lg">
            Switzerland's financial and legal capital is where every VisideaX
            alliance is given its structural backbone.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-balance text-base leading-relaxed text-alpine-slate/65">
              Origination happens in St. Moritz; structure is built in
              Zürich. Our Managing Partner, legal counsel, and quantitative
              team are based here, translating a trusted introduction into
              a governance framework that survives decades — not just the
              closing date. Swiss regulatory complexity is treated here as
              a moat, not friction.
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
              For mandates requiring Swiss corporate, fiscal, or regulatory
              structuring, the Zürich desk is where the work happens.
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
