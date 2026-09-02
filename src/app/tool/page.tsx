"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ArrowRight, Download, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SwissMap } from "@/components/SwissMap";
import {
  PROJECT_TYPES,
  findHub,
  categoryOf,
  computeFeasibility,
  fmtChf,
  type ProjectType,
  type FeasibilityResult,
} from "@/lib/feasibility";

const DEFAULT_CUSTOM_VALUE_PER_SQM = 12000;

export default function ToolPage() {
  const router = useRouter();

  const [presentation, setPresentation] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [projectType, setProjectType] = React.useState<ProjectType>("new-development");
  const [hubId, setHubId] = React.useState<string | null>(null);
  const [customLocation, setCustomLocation] = React.useState("");
  const [sizeSqm, setSizeSqm] = React.useState("");
  const [keysOrUnits, setKeysOrUnits] = React.useState("");
  const [membershipFee, setMembershipFee] = React.useState("");
  const [dealValue, setDealValue] = React.useState("");
  const [eventAttendees, setEventAttendees] = React.useState("");
  const [eventBudget, setEventBudget] = React.useState("");
  const [sponsorCount, setSponsorCount] = React.useState("");
  const [avgSponsorshipFee, setAvgSponsorshipFee] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactEntity, setContactEntity] = React.useState("");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<FeasibilityResult | null>(null);
  const [downloading, setDownloading] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);

  const category = categoryOf(projectType);
  const isRealEstate = category === "real-estate";
  const isEvent = category === "event";
  const isValueBased = category === "value-based";
  const needsSize = projectType === "new-development" || projectType === "acquisition-reposition";
  const needsKeys = projectType === "hospitality";
  const needsMembers = projectType === "private-club";

  const selectedHub = findHub(hubId);
  const locationLabel = selectedHub
    ? `${selectedHub.name}, ${selectedHub.canton}`
    : customLocation.trim();

  const validate = () => {
    const e: Record<string, string> = {};
    if (presentation.trim().length < 20) {
      e.presentation = "Please tell us a little about yourself and your background.";
    }
    if (!consent) {
      e.consent = "Please confirm you consent to sharing this information with VisideaX.";
    }
    if (description.trim().length < 30) {
      e.description = "Please describe the project in more detail (at least a few sentences).";
    }
    if (isRealEstate && !hubId && customLocation.trim().length < 2) {
      e.location = "Select a location on the map, or type one below.";
    }
    if (isRealEstate && (needsSize || projectType === "private-club") && (!sizeSqm || Number(sizeSqm) <= 0)) {
      e.sizeSqm = "Please enter an approximate size in sqm.";
    }
    if (isRealEstate && (needsKeys || needsMembers) && (!keysOrUnits || Number(keysOrUnits) <= 0)) {
      e.keysOrUnits = needsKeys
        ? "Please enter the approximate number of keys."
        : "Please enter the approximate target membership capacity.";
    }
    if (isValueBased && (!dealValue || Number(dealValue) <= 0)) {
      e.dealValue = "Please enter an approximate partnership or transaction value.";
    }
    if (isEvent) {
      if (!eventAttendees || Number(eventAttendees) <= 0) {
        e.eventAttendees = "Please enter the approximate number of attendees.";
      }
      if (!sponsorCount || Number(sponsorCount) <= 0) {
        e.sponsorCount = "Please enter the target number of sponsors or partners.";
      }
    }
    if (!contactName.trim()) e.contactName = "Please enter your full name.";
    if (!contactEmail.trim() || !contactEmail.includes("@")) e.contactEmail = "Please enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildInput = () => ({
    projectType,
    hubId,
    customLocation,
    sizeSqm: Number(sizeSqm) || 0,
    keysOrUnits: Number(keysOrUnits) || 0,
    membershipFee: Number(membershipFee) || 0,
    dealValue: Number(dealValue) || 0,
    eventAttendees: Number(eventAttendees) || 0,
    eventBudget: Number(eventBudget) || 0,
    sponsorCount: Number(sponsorCount) || 0,
    avgSponsorshipFee: Number(avgSponsorshipFee) || 0,
  });

  const onCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setResult(computeFeasibility(buildInput(), DEFAULT_CUSTOM_VALUE_PER_SQM));
  };

  const onDownload = async () => {
    if (!result) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch("/api/tool/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presentation,
          description,
          projectType,
          location: isRealEstate ? locationLabel : "—",
          eventAttendees: Number(eventAttendees) || 0,
          contactName,
          contactEmail,
          contactEntity,
          result,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `VisideaX-Feasibility-${contactName.replace(/\s+/g, "-") || "Report"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setDownloadError("Could not generate the document. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/tool/logout", { method: "POST" });
    router.push("/tool/login");
  };

  const onReset = () => {
    setResult(null);
  };

  const typeLabel = PROJECT_TYPES.find((t) => t.value === projectType)?.label;

  return (
    <main className="min-h-screen bg-alpine-cream pb-28 pt-32 sm:pt-40">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-alpine-slate/10 pb-8 text-center sm:flex-row sm:text-left">
          <div>
            <span className="eyebrow text-alpine-gold">Client Tool</span>
            <h1 className="mt-2 font-display text-2xl text-alpine-slate sm:text-3xl">
              Feasibility &amp; Partnership Estimator
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-alpine-slate/50 hover:text-alpine-gold"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.form
              key="intake"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              onSubmit={onCalculate}
              className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2"
              noValidate
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="presentation" className="text-alpine-slate/60">
                    Tell us about yourself <span className="text-alpine-gold">*</span>
                  </Label>
                  <Textarea
                    id="presentation"
                    rows={4}
                    value={presentation}
                    onChange={(e) => setPresentation(e.target.value)}
                    placeholder="Who you are, your background, and the entity or family office you represent, if any — so we understand who we're speaking with."
                  />
                  {errors.presentation && <p className="text-xs text-red-500">{errors.presentation}</p>}
                  <div className="flex items-start gap-3 pt-1">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked === true)}
                      className="mt-0.5 border-alpine-slate/30 data-[state=checked]:bg-alpine-gold data-[state=checked]:border-alpine-gold"
                    />
                    <Label htmlFor="consent" className="text-xs font-normal normal-case tracking-normal leading-relaxed text-alpine-slate/60">
                      I consent to VisideaX reviewing and retaining the information I share in this
                      tool in order to respond to my inquiry.
                    </Label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
                </div>

                <div className="space-y-2 border-t border-alpine-slate/10 pt-8">
                  <Label htmlFor="description" className="text-alpine-slate/60">
                    Describe your project in detail <span className="text-alpine-gold">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What are you trying to do? The asset or event, the ambition, the partners you already have or need, the timeline — the more detail, the more useful the estimate."
                  />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-alpine-slate/60">
                    Project Type <span className="text-alpine-gold">*</span>
                  </Label>
                  <select
                    id="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className="flex h-11 w-full border border-alpine-slate/15 bg-white px-3 text-sm text-alpine-slate focus:border-alpine-gold focus:outline-none"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {isRealEstate && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {(needsSize || projectType === "private-club") && (
                      <div className="space-y-2">
                        <Label htmlFor="sizeSqm" className="text-alpine-slate/60">
                          Approx. Size (sqm) <span className="text-alpine-gold">*</span>
                        </Label>
                        <Input
                          id="sizeSqm"
                          type="number"
                          min={0}
                          value={sizeSqm}
                          onChange={(e) => setSizeSqm(e.target.value)}
                          placeholder="e.g. 1200"
                        />
                        {errors.sizeSqm && <p className="text-xs text-red-500">{errors.sizeSqm}</p>}
                      </div>
                    )}
                    {(needsKeys || needsMembers) && (
                      <div className="space-y-2">
                        <Label htmlFor="keysOrUnits" className="text-alpine-slate/60">
                          {needsKeys ? "Approx. Keys" : "Target Members"} <span className="text-alpine-gold">*</span>
                        </Label>
                        <Input
                          id="keysOrUnits"
                          type="number"
                          min={0}
                          value={keysOrUnits}
                          onChange={(e) => setKeysOrUnits(e.target.value)}
                          placeholder={needsKeys ? "e.g. 40" : "e.g. 250"}
                        />
                        {errors.keysOrUnits && <p className="text-xs text-red-500">{errors.keysOrUnits}</p>}
                      </div>
                    )}
                    {needsMembers && (
                      <div className="space-y-2">
                        <Label htmlFor="membershipFee" className="text-alpine-slate/60">
                          Annual Membership Fee (CHF)
                        </Label>
                        <Input
                          id="membershipFee"
                          type="number"
                          min={0}
                          value={membershipFee}
                          onChange={(e) => setMembershipFee(e.target.value)}
                          placeholder="Default: 25,000"
                        />
                      </div>
                    )}
                  </div>
                )}

                {isRealEstate && !hubId && (
                  <div className="space-y-2">
                    <Label htmlFor="customLocation" className="text-alpine-slate/60">
                      Or type a specific location
                    </Label>
                    <Input
                      id="customLocation"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="e.g. Ascona, Ticino"
                    />
                  </div>
                )}
                {isRealEstate && errors.location && <p className="text-xs text-red-500">{errors.location}</p>}

                {isEvent && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="eventAttendees" className="text-alpine-slate/60">
                        Expected Attendees <span className="text-alpine-gold">*</span>
                      </Label>
                      <Input
                        id="eventAttendees"
                        type="number"
                        min={0}
                        value={eventAttendees}
                        onChange={(e) => setEventAttendees(e.target.value)}
                        placeholder="e.g. 2000"
                      />
                      {errors.eventAttendees && <p className="text-xs text-red-500">{errors.eventAttendees}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventBudget" className="text-alpine-slate/60">
                        Estimated Event Budget (CHF)
                      </Label>
                      <Input
                        id="eventBudget"
                        type="number"
                        min={0}
                        value={eventBudget}
                        onChange={(e) => setEventBudget(e.target.value)}
                        placeholder="If known"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sponsorCount" className="text-alpine-slate/60">
                        Target Number of Sponsors <span className="text-alpine-gold">*</span>
                      </Label>
                      <Input
                        id="sponsorCount"
                        type="number"
                        min={0}
                        value={sponsorCount}
                        onChange={(e) => setSponsorCount(e.target.value)}
                        placeholder="e.g. 6"
                      />
                      {errors.sponsorCount && <p className="text-xs text-red-500">{errors.sponsorCount}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avgSponsorshipFee" className="text-alpine-slate/60">
                        Avg. Sponsorship Fee (CHF)
                      </Label>
                      <Input
                        id="avgSponsorshipFee"
                        type="number"
                        min={0}
                        value={avgSponsorshipFee}
                        onChange={(e) => setAvgSponsorshipFee(e.target.value)}
                        placeholder="Default: 60,000"
                      />
                    </div>
                  </div>
                )}

                {isValueBased && (
                  <div className="space-y-2">
                    <Label htmlFor="dealValue" className="text-alpine-slate/60">
                      Approx. Partnership / Transaction Value (CHF) <span className="text-alpine-gold">*</span>
                    </Label>
                    <Input
                      id="dealValue"
                      type="number"
                      min={0}
                      value={dealValue}
                      onChange={(e) => setDealValue(e.target.value)}
                      placeholder="e.g. 20000000"
                    />
                    {errors.dealValue && <p className="text-xs text-red-500">{errors.dealValue}</p>}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 border-t border-alpine-slate/10 pt-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-alpine-slate/60">
                      Full Name <span className="text-alpine-gold">*</span>
                    </Label>
                    <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                    {errors.contactName && <p className="text-xs text-red-500">{errors.contactName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-alpine-slate/60">
                      Email <span className="text-alpine-gold">*</span>
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                    {errors.contactEmail && <p className="text-xs text-red-500">{errors.contactEmail}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="contactEntity" className="text-alpine-slate/60">
                      Entity / Family Office (optional)
                    </Label>
                    <Input id="contactEntity" value={contactEntity} onChange={(e) => setContactEntity(e.target.value)} />
                  </div>
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full">
                  <span className="inline-flex items-center gap-3">
                    Calculate Estimate
                    <ArrowRight size={16} />
                  </span>
                </Button>
              </div>

              <div className="border border-alpine-slate/10 bg-white/60 p-8">
                <SwissMap selectedHub={hubId} onSelectHub={(id) => { setHubId(id); setCustomLocation(""); }} />
                {isRealEstate && selectedHub && (
                  <p className="mt-4 text-center text-sm text-alpine-slate/60">
                    Selected: <span className="font-semibold text-alpine-slate">{selectedHub.name}, {selectedHub.canton}</span>{" "}
                    <button
                      type="button"
                      onClick={() => setHubId(null)}
                      className="ml-2 text-xs uppercase tracking-wide text-alpine-gold hover:underline"
                    >
                      Clear
                    </button>
                  </p>
                )}
                {!isRealEstate && (
                  <p className="mt-4 text-center text-xs text-alpine-slate/45">
                    Location is optional for this project type — feel free to click a territory for context.
                  </p>
                )}
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mt-12 mx-auto max-w-2xl"
            >
              <div className="border border-alpine-slate/10 bg-white/60 p-8 sm:p-12">
                <span className="eyebrow text-alpine-gold">Illustrative Estimate</span>
                <h2 className="mt-3 font-display text-2xl text-alpine-slate">
                  {isRealEstate ? `${locationLabel} — ${typeLabel}` : typeLabel}
                </h2>

                <dl className="mt-8 space-y-4">
                  {result.valuePerSqm !== null && (
                    <Row label="Indicative value / sqm" value={`CHF ${fmtChf(result.valuePerSqm)}`} />
                  )}
                  {result.costPerSqm !== null && (
                    <Row label="Indicative cost / sqm" value={`CHF ${fmtChf(result.costPerSqm)}`} />
                  )}
                  {result.estimatedCost !== null && (
                    <Row label="Estimated Cost" value={`CHF ${fmtChf(result.estimatedCost)}`} bold />
                  )}
                  {result.grossAssetValue !== null && (
                    <>
                      <Row label="Estimated Gross Asset Value" value={`CHF ${fmtChf(result.grossAssetValue)}`} bold />
                      <Row label="Estimated Development Margin" value={`CHF ${fmtChf(result.estimatedMargin!)}`} highlight />
                    </>
                  )}
                  {result.annualRevenue !== null && (
                    <>
                      {result.estimatedAdr !== null && (
                        <Row label="Estimated ADR" value={`CHF ${fmtChf(result.estimatedAdr)} / night`} />
                      )}
                      <Row label="Estimated Annual Revenue" value={`CHF ${fmtChf(result.annualRevenue)}`} highlight />
                    </>
                  )}
                  {result.sponsorshipRevenue !== null && (
                    <Row label="Estimated Sponsorship Revenue" value={`CHF ${fmtChf(result.sponsorshipRevenue)}`} highlight />
                  )}
                  {result.dealValue !== null && (
                    <Row label="Partnership / Transaction Value" value={`CHF ${fmtChf(result.dealValue)}`} bold />
                  )}
                  <div className="border-t border-alpine-slate/10 pt-4">
                    <Row label="Illustrative VisideaX Advisory Fee" value={`CHF ${fmtChf(result.advisoryFeeTotal)}`} bold />
                  </div>
                </dl>

                <p className="mt-8 text-xs leading-relaxed text-alpine-slate/45">
                  These figures are an order-of-magnitude planning estimate generated from indicative
                  benchmarks and standard assumptions — not a valuation, appraisal, or offer. Real
                  feasibility depends on the specific asset or event, permits, partners, and execution.
                </p>

                {downloadError && <p className="mt-4 text-sm text-red-500">{downloadError}</p>}

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button onClick={onDownload} disabled={downloading} className="flex-1" size="lg">
                    <span className="inline-flex items-center gap-3">
                      {downloading ? "Preparing document..." : "Download Personalized Report"}
                      {!downloading && <Download size={16} />}
                    </span>
                  </Button>
                  <Button onClick={onReset} variant="outline" size="lg">
                    <span className="inline-flex items-center gap-3">
                      <RotateCcw size={16} />
                      Start Over
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-alpine-slate/55">{label}</dt>
      <dd
        className={
          highlight
            ? "font-display text-xl text-alpine-gold"
            : bold
            ? "font-semibold text-alpine-slate"
            : "text-sm text-alpine-slate/80"
        }
      >
        {value}
      </dd>
    </div>
  );
}
