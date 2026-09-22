"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, CheckCircle2, Mail, Linkedin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const mandateSchema = z.object({
  entityName: z.string().optional(),
  contactName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  territory: z
    .string()
    .min(2, "Please describe your project or territory."),
  message: z.string().min(10, "Please provide some context for your request."),
  nda: z.literal(true, {
    errorMap: () => ({ message: "Please confirm before submitting." }),
  }),
});

type MandateFormValues = z.infer<typeof mandateSchema>;

const WEB3FORMS_ACCESS_KEY = "e667efc9-bc88-4b01-b39a-3d6fa43ae448";

function ServicePrefill({ onService }: { onService: (service: string) => void }) {
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const service = searchParams.get("service");
    if (service) onService(service);
  }, [searchParams, onService]);
  return null;
}

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MandateFormValues>({
    resolver: zodResolver(mandateSchema),
    defaultValues: {
      entityName: "",
      contactName: "",
      email: "",
      territory: "",
      message: "",
      nda: undefined,
    },
  });

  const handleService = React.useCallback(
    (service: string) => setValue("territory", service),
    [setValue]
  );

  const onSubmit = async (data: MandateFormValues) => {
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
          subject: `New project inquiry — ${data.contactName}`,
          "Full Name": data.contactName,
          "Company / Project Name": data.entityName || "—",
          email: data.email,
          "Project Type / Territory": data.territory,
          "Project Details": data.message,
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
    <section id="contact" className="relative bg-alpine-slate py-28 lg:py-36">
      <React.Suspense fallback={null}>
        <ServicePrefill onService={handleService} />
      </React.Suspense>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-alpine-gold/10 blur-[140px]"
      />
      <div className="container relative">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Tell Us About Your Project"
          description="Share a few details and we'll respond directly, personally, within two business days."
          dark
        />

        <div className="mx-auto mt-16 max-w-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center border border-alpine-gold/40 bg-alpine-navy/50 p-14 text-center"
              >
                <CheckCircle2 size={40} className="text-alpine-gold" />
                <h3 className="mt-6 font-display text-2xl text-alpine-cream">
                  Request Received
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-alpine-cream/60">
                  Thank you. We&apos;ve received your project details and will
                  reach out directly within two business days.
                </p>
                <Button
                  variant="outlineLight"
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
                className="space-y-8 border border-alpine-cream/10 bg-alpine-navy/40 p-8 sm:p-12"
                noValidate
              >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="entityName" className="text-alpine-cream/60">
                      Company / Project Name
                    </Label>
                    <Input
                      id="entityName"
                      placeholder="e.g. your company, or leave blank"
                      className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
                      {...register("entityName")}
                    />
                    {errors.entityName && (
                      <p className="text-xs text-red-400">{errors.entityName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-alpine-cream/60">
                      Full Name <span className="text-alpine-gold">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      placeholder="Your full name"
                      className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
                      {...register("contactName")}
                    />
                    {errors.contactName && (
                      <p className="text-xs text-red-400">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-alpine-cream/60">
                    Email <span className="text-alpine-gold">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="territory" className="text-alpine-cream/60">
                    Project Type / Territory <span className="text-alpine-gold">*</span>
                  </Label>
                  <Input
                    id="territory"
                    placeholder="e.g. Invitation-only summit, Northern Italy"
                    className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
                    {...register("territory")}
                  />
                  {errors.territory && (
                    <p className="text-xs text-red-400">{errors.territory.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-alpine-cream/60">
                    Project Details <span className="text-alpine-gold">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Briefly describe your project and what you need help with."
                    className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <Controller
                  name="nda"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-start gap-4 border-t border-alpine-cream/10 pt-8">
                      <Checkbox
                        id="nda"
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        className="border-alpine-cream/30 data-[state=checked]:bg-alpine-gold data-[state=checked]:border-alpine-gold mt-0.5"
                      />
                      <div>
                        <Label htmlFor="nda" className="text-alpine-cream/70 font-normal normal-case tracking-normal text-sm leading-relaxed">
                          I understand this inquiry is treated confidentially
                          by VisideaX and used only to respond to my request.
                        </Label>
                        {errors.nda && (
                          <p className="mt-2 text-xs text-red-400">{errors.nda.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                />

                {submitError && (
                  <p className="text-center text-sm text-red-400">{submitError}</p>
                )}

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <span className="inline-flex items-center gap-3">
                    {isSubmitting ? "Submitting..." : "Request Confidential Mandate"}
                    {!isSubmitting && <ArrowRight size={16} />}
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-alpine-cream/40">
                  <ShieldCheck size={14} />
                  Treated confidentially, always
                </div>
                <p className="text-center text-xs text-alpine-cream/35">
                  Your information is used solely by VisideaX to respond to
                  your request and is never shared with third parties.{" "}
                  <Link href="/privacy" className="underline hover:text-alpine-gold">
                    Privacy Policy
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-alpine-cream/10 pt-10 sm:flex-row sm:justify-center sm:gap-10">
            <a
              href="mailto:visideax@etik.com"
              className="flex items-center gap-2 text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors"
            >
              <Mail size={15} className="text-alpine-gold" />
              visideax@etik.com
            </a>
            <a
              href="https://www.linkedin.com/company/visideax-/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors"
            >
              <Linkedin size={15} className="text-alpine-gold" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
