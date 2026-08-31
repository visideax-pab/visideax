import type { Metadata } from "next";
import { GraduationCap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers | VisideaX",
  description:
    "VisideaX does not maintain open professional positions — senior relationships are built by direct introduction. Our internship programme is the firm's only structured entry point.",
};

const internshipTypes = [
  "Work Experience placements",
  "Summer Internship programme",
  "Off-cycle & semester internships",
  "Thesis / academic-partnership internships",
];

const requirements = [
  "Top-tier academic record at a leading university",
  "Fluency in English; French, German, or Italian a strong advantage",
  "Genuine interest in Swiss structuring, M&A, or hospitality investment",
  "Discretion — every intern works on live, confidential mandates",
];

export default function CareersPage() {
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
          <span className="eyebrow text-alpine-gold">Careers</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            We Don&apos;t Hire Through Job Postings
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            Senior relationships at VisideaX are built by direct introduction,
            not by open recruitment — we approach the professionals we want
            to work with. The one structured exception is our internship
            programme.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-alpine-gold">Internship Programme</span>
            <h2 className="mt-4 font-display text-2xl text-alpine-slate sm:text-3xl">
              Our Only Open Door
            </h2>
            <p className="mt-5 text-balance text-base leading-relaxed text-alpine-slate/60">
              Every professional role at VisideaX is filled by introduction.
              Internships are the exception — a small number of places each
              year for candidates who meet a very high bar, across every
              internship format used in finance.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-alpine-slate/10 bg-white/60 p-9">
              <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                <GraduationCap size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-lg text-alpine-slate">
                Internship Formats
              </h3>
              <ul className="mt-5 space-y-3">
                {internshipTypes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-alpine-slate/65"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-alpine-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-alpine-slate/10 bg-white/60 p-9">
              <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                <Award size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-lg text-alpine-slate">
                Entry Requirements
              </h3>
              <ul className="mt-5 space-y-3">
                {requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-alpine-slate/65"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-alpine-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-alpine-slate/10 bg-white/60 p-9">
              <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                <Users size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-lg text-alpine-slate">
                What We Provide
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-alpine-slate/65">
                Accommodation support for placements based in St. Moritz or
                Zürich, direct exposure to live mandates, and close mentorship
                from the founding partners — not a rotation through busywork.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-6 border border-alpine-slate/10 bg-white/60 px-8 py-12 text-center">
            <h3 className="font-display text-xl text-alpine-slate">
              Apply for the Internship Programme
            </h3>
            <p className="text-sm leading-relaxed text-alpine-slate/60">
              Send your CV and a short note on why VisideaX, along with the
              format and period you are applying for.
            </p>
            <Button variant="default" size="lg" asChild>
              <a href="mailto:visideax@etik.com?subject=Internship%20Application">
                Apply via Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
