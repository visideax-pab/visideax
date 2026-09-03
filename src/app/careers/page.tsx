import type { Metadata } from "next";
import { GraduationCap, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Collaborate | VisideaX",
  description:
    "VisideaX is a young, student-led consulting practice. We don't post fixed job openings — applications from high-level students who want to collaborate with us are always open.",
};

const lookingFor = [
  "Currently enrolled at a leading university",
  "Strong analytical and financial-modeling ability",
  "Fluency in English; French, German, or Italian a strong advantage",
  "Discretion — every collaborator works on live client engagements",
];

const whatYouWorkOn = [
  "Real business plans, financial models, and partnership presentations",
  "Direct client deliverables — not a rotation, not busywork",
  "Close collaboration with the founding team, not a layer of management",
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
          <span className="eyebrow text-alpine-gold">Collaborate</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            Applications Are Always Open
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            VisideaX is a young, student-led team, and we&apos;re always looking to
            hear from other high-level students who want to work with us.
            There are no fixed positions or hiring cycles — just an open door
            for the right people.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-alpine-gold">Rolling Applications</span>
            <h2 className="mt-4 font-display text-2xl text-alpine-slate sm:text-3xl">
              No Job Postings, No Fixed Intake
            </h2>
            <p className="mt-5 text-balance text-base leading-relaxed text-alpine-slate/60">
              We are not a large firm hiring on a cycle — we are a small, growing
              group of students who take on real client work. If you think you
              would add something, reach out. We review every message.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-alpine-slate/10 bg-white/60 p-9">
              <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                <GraduationCap size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-lg text-alpine-slate">
                Who We&apos;re Looking For
              </h3>
              <ul className="mt-5 space-y-3">
                {lookingFor.map((item) => (
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
                <FileText size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-lg text-alpine-slate">
                What You&apos;ll Work On
              </h3>
              <ul className="mt-5 space-y-3">
                {whatYouWorkOn.map((item) => (
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
                How It Works
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-alpine-slate/65">
                No application deadlines and no fixed cohorts. Send a short
                note and your CV whenever you see this — we reply directly,
                and the earliest conversations are informal.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-6 border border-alpine-slate/10 bg-white/60 px-8 py-12 text-center">
            <h3 className="font-display text-xl text-alpine-slate">
              Get in Touch
            </h3>
            <p className="text-sm leading-relaxed text-alpine-slate/60">
              Send your CV and a short note on why VisideaX — applications are
              reviewed on a rolling basis, with no fixed deadline.
            </p>
            <Button variant="default" size="lg" asChild>
              <a href="mailto:visideax@etik.com?subject=Collaborator%20Application">
                Apply via Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
