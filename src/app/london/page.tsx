import type { Metadata } from "next";
import Image from "next/image";
import { Globe2, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "London | VisideaX",
  description:
    "VisideaX's international capital desk in London — connecting global principals and family offices to vetted opportunities across the Swiss network.",
};

const highlights = [
  {
    icon: Globe2,
    title: "International Capital",
    description:
      "London is where VisideaX meets the wider world — the desk responsible for UK and global principals seeking access to the Swiss and European network.",
  },
  {
    icon: Users,
    title: "Family Office Relationships",
    description:
      "Our Director of Investor Relations manages a small, trusted book of family offices and institutional principals from here, not a broad distribution list.",
  },
  {
    icon: Building2,
    title: "English-Law Structuring",
    description:
      "Some partnerships between entrepreneurs and territory are better anchored under English jurisdiction — that structuring work is led from London.",
  },
];

export default function LondonPage() {
  return (
    <main>
      <section className="relative flex h-[70vh] min-h-[520px] items-center overflow-hidden">
        <Image
          src="/images/london.jpg"
          alt="London"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-alpine-gradient opacity-[0.88]" />
        <div className="container relative flex flex-col items-center pt-24 text-center">
          <span className="eyebrow text-alpine-gold">Territory</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-medium text-alpine-cream sm:text-6xl">
            London
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/70 sm:text-lg">
            The firm's window onto international capital — and the desk that
            brings it, quietly, into the Swiss network.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-balance text-base leading-relaxed text-alpine-slate/65">
              Not every principal we work with is Swiss, and not every
              partnership needs to be. London gives VisideaX a direct line
              to global family offices and institutional capital, and to
              English law where it serves a mandate better than Swiss
              structuring alone. It is the same discipline, applied to a
              wider map.
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
              For principals based in the UK or further afield, London is
              your first point of contact.
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
