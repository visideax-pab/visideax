"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const requestSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  entity: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  reason: z
    .string()
    .min(10, "Please briefly tell us what you're working on."),
});

type RequestValues = z.infer<typeof requestSchema>;

const WEB3FORMS_ACCESS_KEY = "e667efc9-bc88-4b01-b39a-3d6fa43ae448";

export default function AnnualReportPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", entity: "", email: "", reason: "" },
  });

  const onSubmit = async (data: RequestValues) => {
    setSubmitError(null);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Market briefing request — ${data.name}`,
          "Full Name": data.name,
          "Company / Project": data.entity || "—",
          email: data.email,
          "What They're Working On": data.reason,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        setSubmitError(
          "Something went wrong sending your request. Please try again or email us directly."
        );
      }
    } catch {
      setSubmitError(
        "Something went wrong sending your request. Please try again or email us directly."
      );
    }
  };

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
          <span className="eyebrow text-alpine-gold">Market Briefing</span>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-alpine-cream sm:text-5xl">
            Request Our St. Moritz Market Briefing
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-alpine-cream/65">
            A short briefing on the St. Moritz hospitality and real estate
            landscape — regulatory context, market dynamics, and where we see
            opportunity. Shared directly by email, at no cost.
          </p>
        </div>
      </section>

      <section className="bg-alpine-cream py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-xl">
            <div className="mb-10 flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
                <Lock size={20} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-alpine-slate/60">
                We share this directly with entrepreneurs and investors
                evaluating a project in the region — tell us briefly about
                yours and we&apos;ll send it over.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center border border-alpine-slate/10 bg-white/60 p-14 text-center"
                >
                  <CheckCircle2 size={40} className="text-alpine-gold" />
                  <h3 className="mt-6 font-display text-2xl text-alpine-slate">
                    Request Received
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-alpine-slate/60">
                    Thank you. We&apos;ll send the briefing directly to the
                    email address you provided, shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8 border border-alpine-slate/10 bg-white/60 p-8 sm:p-12"
                  noValidate
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-alpine-slate/60">
                      Full Name <span className="text-alpine-gold">*</span>
                    </Label>
                    <Input id="name" placeholder="Your full name" {...register("name")} />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entity" className="text-alpine-slate/60">
                      Company / Project
                    </Label>
                    <Input
                      id="entity"
                      placeholder="e.g. your company, or leave blank"
                      {...register("entity")}
                    />
                    {errors.entity && (
                      <p className="text-xs text-red-500">{errors.entity.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-alpine-slate/60">
                      Email <span className="text-alpine-gold">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@entity.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-alpine-slate/60">
                      What Are You Working On? <span className="text-alpine-gold">*</span>
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your project or interest in St. Moritz."
                      {...register("reason")}
                    />
                    {errors.reason && (
                      <p className="text-xs text-red-500">{errors.reason.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-center text-sm text-red-500">{submitError}</p>
                  )}

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <span className="inline-flex items-center gap-3">
                      {isSubmitting ? "Submitting..." : "Request the Briefing"}
                      {!isSubmitting && <ArrowRight size={16} />}
                    </span>
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-alpine-slate/40">
                    <FileText size={14} />
                    Shared directly by email
                  </div>
                  <p className="text-center text-xs text-alpine-slate/35">
                    Your information is used solely by VisideaX to respond to
                    your request and is never shared with third parties.{" "}
                    <Link href="/privacy" className="underline hover:text-alpine-slate">
                      Privacy Policy
                    </Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
