import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VisideaX",
  description:
    "How VisideaX collects, uses, and protects the information you share with us.",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="relative bg-alpine-slate pb-16 pt-40 sm:pb-20 sm:pt-48">
        <div className="container relative flex flex-col items-center text-center">
          <span className="eyebrow text-alpine-gold">Privacy</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="bg-alpine-cream py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl space-y-10 text-sm leading-relaxed text-alpine-slate/70">
            <div>
              <h2 className="font-display text-xl text-alpine-slate">
                Who We Are
              </h2>
              <p className="mt-3">
                VisideaX is a private Swiss boutique advisory operating
                across St. Moritz, Zürich, and London. This policy explains
                what information we collect through this website and how we
                use it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-alpine-slate">
                Cookies
              </h2>
              <p className="mt-3">
                This site uses only the essential cookies required for it to
                function correctly (for example, remembering that you have
                dismissed the cookie notice). We do not use advertising or
                third-party tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-alpine-slate">
                Information You Submit
              </h2>
              <p className="mt-3">
                When you use our Confidential Mandate Request, Annual Report
                Request, or internship application, we collect the
                information you choose to provide — such as your name, email
                address, entity name, and message. This information is used
                solely by VisideaX to respond to your inquiry.
              </p>
              <p className="mt-3">
                We do not sell, rent, or share this information with third
                parties. It is retained only for as long as needed to handle
                your request and is not used for marketing without your
                separate consent.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-alpine-slate">
                Your Rights
              </h2>
              <p className="mt-3">
                You may ask us at any time what information we hold about
                you, request its correction, or request its deletion, by
                writing to{" "}
                <a
                  href="mailto:visideax@etik.com"
                  className="text-alpine-gold hover:underline"
                >
                  visideax@etik.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-alpine-slate">
                Contact
              </h2>
              <p className="mt-3">
                Questions about this policy can be sent to{" "}
                <a
                  href="mailto:visideax@etik.com"
                  className="text-alpine-gold hover:underline"
                >
                  visideax@etik.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
