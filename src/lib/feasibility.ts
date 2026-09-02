export interface Hub {
  id: string;
  name: string;
  canton: string;
  x: number; // 0-100, position on the stylized map
  y: number; // 0-100
  valuePerSqm: number; // CHF, indicative achievable sale/rental value
  sourced: boolean; // whether valuePerSqm comes from a cited external benchmark
}

// Value-per-sqm benchmarks: St. Moritz, Verbier/Gstaad, Cologny (Geneva lake),
// Küsnacht (Zurich lake), Zürich city and Geneva city are sourced from
// published 2026 luxury market data (UBS Global Real Estate / Global Property
// Guide). Lugano, Basel, Bern, and Lucerne have no equally current published
// benchmark on hand, so they are marked as broad planning estimates.
export const HUBS: Hub[] = [
  { id: "st-moritz", name: "St. Moritz", canton: "Graubünden", x: 76, y: 62, valuePerSqm: 52000, sourced: true },
  { id: "verbier", name: "Verbier", canton: "Valais", x: 28, y: 76, valuePerSqm: 45000, sourced: true },
  { id: "gstaad", name: "Gstaad", canton: "Bern", x: 42, y: 62, valuePerSqm: 45000, sourced: true },
  { id: "geneva-lake", name: "Cologny / Lake Geneva", canton: "Genève", x: 8, y: 84, valuePerSqm: 43000, sourced: true },
  { id: "zurich-lake", name: "Küsnacht / Lake Zürich", canton: "Zürich", x: 64, y: 27, valuePerSqm: 37000, sourced: true },
  { id: "zurich-city", name: "Zürich (city)", canton: "Zürich", x: 59, y: 30, valuePerSqm: 23350, sourced: true },
  { id: "geneva-city", name: "Genève (city)", canton: "Genève", x: 10, y: 82, valuePerSqm: 21640, sourced: true },
  { id: "lugano", name: "Lugano", canton: "Ticino", x: 58, y: 90, valuePerSqm: 15000, sourced: false },
  { id: "lucerne", name: "Lucerne", canton: "Luzern", x: 50, y: 41, valuePerSqm: 12500, sourced: false },
  { id: "bern", name: "Bern", canton: "Bern", x: 36, y: 46, valuePerSqm: 11500, sourced: false },
  { id: "basel", name: "Basel", canton: "Basel-Stadt", x: 28, y: 9, valuePerSqm: 13000, sourced: false },
];

// VisideaX's own physical presence — shown on the map distinctly from the
// selectable project-location hubs above.
export interface OfficeMarker {
  id: string;
  name: string;
  x: number;
  y: number;
}

export const OFFICES: OfficeMarker[] = [
  { id: "office-st-moritz", name: "VisideaX — St. Moritz", x: 76, y: 62 },
  { id: "office-zurich", name: "VisideaX — Zürich", x: 59, y: 30 },
];

export type ProjectCategory = "real-estate" | "event" | "value-based";

export type ProjectType =
  | "new-development"
  | "acquisition-reposition"
  | "hospitality"
  | "private-club"
  | "signature-event"
  | "joint-venture"
  | "exit-succession";

export const PROJECT_TYPES: { value: ProjectType; label: string; category: ProjectCategory }[] = [
  { value: "new-development", label: "New Development / Ground-Up", category: "real-estate" },
  { value: "acquisition-reposition", label: "Acquisition & Reposition", category: "real-estate" },
  { value: "hospitality", label: "Hospitality (Hotel / Branded Residences)", category: "real-estate" },
  { value: "private-club", label: "Private Club / Membership Concept", category: "real-estate" },
  { value: "signature-event", label: "Signature Event / Cultural Partnership (e.g. THE ICE)", category: "event" },
  { value: "joint-venture", label: "Joint Venture / Territorial Partnership", category: "value-based" },
  { value: "exit-succession", label: "Exit & Succession", category: "value-based" },
];

export function categoryOf(t: ProjectType): ProjectCategory {
  return PROJECT_TYPES.find((p) => p.value === t)?.category ?? "real-estate";
}

export type ProceedOption = "call" | "proposal" | "meeting" | "information";

export const PROCEED_OPTIONS: { value: ProceedOption; label: string }[] = [
  { value: "call", label: "Schedule a confidential introductory call" },
  { value: "proposal", label: "Receive a detailed written proposal" },
  { value: "meeting", label: "Arrange an in-person meeting in St. Moritz or Zürich" },
  { value: "information", label: "Not ready yet — just keep me informed" },
];

export const PROCEED_NEXT_STEP: Record<ProceedOption, string> = {
  call:
    "A member of the VisideaX founding team will reach out directly within two business days to schedule a confidential introductory call.",
  proposal:
    "VisideaX will prepare a more detailed written proposal based on this submission and share it directly, under confidentiality.",
  meeting:
    "VisideaX will coordinate a confidential in-person meeting in St. Moritz or Zürich, subject to mutual availability.",
  information:
    "No immediate action will be taken. VisideaX will keep this submission on file and may follow up periodically with relevant updates.",
};

export type ExclusivityLevel = "private" | "ticketed" | "hybrid";

export const EXCLUSIVITY_OPTIONS: { value: ExclusivityLevel; label: string }[] = [
  { value: "private", label: "Private & invite-only" },
  { value: "ticketed", label: "Ticketed to the public" },
  { value: "hybrid", label: "Hybrid — private preview + public access" },
];

export type DecisionTimeline = "immediate" | "short-term" | "medium-term" | "exploring";

export const DECISION_TIMELINE_OPTIONS: { value: DecisionTimeline; label: string }[] = [
  { value: "immediate", label: "Ready to move forward immediately" },
  { value: "short-term", label: "Within the next 1–3 months" },
  { value: "medium-term", label: "3–12 months" },
  { value: "exploring", label: "No fixed timeline — exploring for now" },
];

const COST_RATIO: Partial<Record<ProjectType, number>> = {
  "new-development": 0.55,
  "acquisition-reposition": 0.75,
  hospitality: 0.7,
  "private-club": 0.6,
};

export interface FeasibilityInput {
  projectType: ProjectType;
  hubId: string | null;
  customLocation: string;
  sizeSqm: number;
  keysOrUnits: number; // hospitality keys, or private-club member capacity
  membershipFee: number; // CHF/year, private-club only
  dealValue: number; // CHF, joint-venture / exit-succession only
  eventAttendees: number; // signature-event only
  eventBudget: number; // CHF, signature-event only
  sponsorCount: number; // signature-event only
  avgSponsorshipFee: number; // CHF, signature-event only
}

export interface FeasibilityResult {
  category: ProjectCategory;
  valuePerSqm: number | null;
  costPerSqm: number | null;
  estimatedCost: number | null;
  grossAssetValue: number | null; // sale-oriented real-estate types
  estimatedMargin: number | null;
  annualRevenue: number | null; // operating real-estate types
  estimatedAdr: number | null;
  sponsorshipRevenue: number | null; // signature-event
  dealValue: number | null; // value-based types
  advisoryFeeSuccess: number;
  advisoryFeeRetainer: number;
  advisoryFeeTotal: number;
}

const BASE_SUCCESS_FEE_PCT = 0.035;
const BASE_MONTHLY_RETAINER = 9000;
const BASE_DURATION_MONTHS = 10;
const DEFAULT_OCCUPANCY = 0.7;
// Planning assumption: average sqm allocated per key in a luxury hotel,
// including guest rooms, back-of-house, and public/amenity space.
const SQM_PER_KEY = 90;
// Planning assumption: average sqm of clubhouse/facility space per member.
const SQM_PER_MEMBER = 12;
const DEFAULT_SPONSORSHIP_FEE = 60000;

export function findHub(hubId: string | null): Hub | null {
  return HUBS.find((h) => h.id === hubId) ?? null;
}

export function computeFeasibility(input: FeasibilityInput, fallbackValuePerSqm: number): FeasibilityResult {
  const category = categoryOf(input.projectType);
  const advisoryFor = (dealSize: number) => ({
    advisoryFeeSuccess: dealSize * BASE_SUCCESS_FEE_PCT,
    advisoryFeeRetainer: BASE_MONTHLY_RETAINER * BASE_DURATION_MONTHS,
    advisoryFeeTotal: dealSize * BASE_SUCCESS_FEE_PCT + BASE_MONTHLY_RETAINER * BASE_DURATION_MONTHS,
  });

  if (category === "value-based") {
    const dealValue = Math.max(input.dealValue, 0);
    return {
      category,
      valuePerSqm: null,
      costPerSqm: null,
      estimatedCost: null,
      grossAssetValue: null,
      estimatedMargin: null,
      annualRevenue: null,
      estimatedAdr: null,
      sponsorshipRevenue: null,
      dealValue,
      ...advisoryFor(dealValue),
    };
  }

  if (category === "event") {
    const sponsors = Math.max(input.sponsorCount, 0);
    const fee = input.avgSponsorshipFee > 0 ? input.avgSponsorshipFee : DEFAULT_SPONSORSHIP_FEE;
    const sponsorshipRevenue = sponsors * fee;
    const estimatedCost = Math.max(input.eventBudget, 0);
    const dealSize = Math.max(sponsorshipRevenue, estimatedCost);
    return {
      category,
      valuePerSqm: null,
      costPerSqm: null,
      estimatedCost,
      grossAssetValue: null,
      estimatedMargin: null,
      annualRevenue: null,
      estimatedAdr: null,
      sponsorshipRevenue,
      dealValue: null,
      ...advisoryFor(dealSize),
    };
  }

  // real-estate category
  const hub = findHub(input.hubId);
  const valuePerSqm = hub?.valuePerSqm ?? fallbackValuePerSqm;
  const costRatio = COST_RATIO[input.projectType] ?? 0.6;
  const costPerSqm = valuePerSqm * costRatio;

  let size = Math.max(input.sizeSqm, 0);
  if (input.projectType === "hospitality") {
    size = Math.max(input.keysOrUnits, 0) * SQM_PER_KEY;
  } else if (input.projectType === "private-club" && size === 0) {
    size = Math.max(input.keysOrUnits, 0) * SQM_PER_MEMBER;
  }
  const estimatedCost = size * costPerSqm;

  let grossAssetValue: number | null = null;
  let estimatedMargin: number | null = null;
  let annualRevenue: number | null = null;
  let estimatedAdr: number | null = null;
  let dealSize = estimatedCost;

  if (input.projectType === "new-development" || input.projectType === "acquisition-reposition") {
    grossAssetValue = size * valuePerSqm;
    estimatedMargin = grossAssetValue - estimatedCost;
    dealSize = grossAssetValue;
  } else if (input.projectType === "hospitality") {
    estimatedAdr = valuePerSqm / 30;
    const keys = Math.max(input.keysOrUnits, 0);
    annualRevenue = keys * estimatedAdr * DEFAULT_OCCUPANCY * 365;
    dealSize = Math.max(estimatedCost, annualRevenue * 5); // rough operating-asset value proxy
  } else if (input.projectType === "private-club") {
    const members = Math.max(input.keysOrUnits, 0);
    const fee = input.membershipFee > 0 ? input.membershipFee : 25000;
    annualRevenue = members * fee;
    dealSize = Math.max(estimatedCost, annualRevenue * 3);
  }

  return {
    category,
    valuePerSqm,
    costPerSqm,
    estimatedCost,
    grossAssetValue,
    estimatedMargin,
    annualRevenue,
    estimatedAdr,
    sponsorshipRevenue: null,
    dealValue: null,
    ...advisoryFor(dealSize),
  };
}

export function fmtChf(v: number): string {
  return new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(Math.round(v));
}
