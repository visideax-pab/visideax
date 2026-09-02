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
  { id: "st-moritz", name: "St. Moritz", canton: "Graubünden", x: 76, y: 66, valuePerSqm: 52000, sourced: true },
  { id: "verbier", name: "Verbier", canton: "Valais", x: 30, y: 74, valuePerSqm: 45000, sourced: true },
  { id: "gstaad", name: "Gstaad", canton: "Bern", x: 40, y: 60, valuePerSqm: 45000, sourced: true },
  { id: "geneva-lake", name: "Cologny / Lake Geneva", canton: "Genève", x: 9, y: 84, valuePerSqm: 43000, sourced: true },
  { id: "zurich-lake", name: "Küsnacht / Lake Zürich", canton: "Zürich", x: 65, y: 26, valuePerSqm: 37000, sourced: true },
  { id: "zurich-city", name: "Zürich (city)", canton: "Zürich", x: 60, y: 30, valuePerSqm: 23350, sourced: true },
  { id: "geneva-city", name: "Genève (city)", canton: "Genève", x: 11, y: 82, valuePerSqm: 21640, sourced: true },
  { id: "lugano", name: "Lugano", canton: "Ticino", x: 56, y: 92, valuePerSqm: 15000, sourced: false },
  { id: "lucerne", name: "Lucerne", canton: "Luzern", x: 51, y: 40, valuePerSqm: 12500, sourced: false },
  { id: "bern", name: "Bern", canton: "Bern", x: 37, y: 44, valuePerSqm: 11500, sourced: false },
  { id: "basel", name: "Basel", canton: "Basel-Stadt", x: 30, y: 10, valuePerSqm: 13000, sourced: false },
];

export type ProjectType =
  | "new-development"
  | "acquisition-reposition"
  | "hospitality"
  | "private-club";

export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "new-development", label: "New Development / Ground-Up" },
  { value: "acquisition-reposition", label: "Acquisition & Reposition" },
  { value: "hospitality", label: "Hospitality (Hotel / Branded Residences)" },
  { value: "private-club", label: "Private Club / Membership Concept" },
];

const COST_RATIO: Record<ProjectType, number> = {
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
  keysOrUnits: number; // used for hospitality (keys) and private club (member capacity)
  membershipFee: number; // CHF/year, only used for private-club
}

export interface FeasibilityResult {
  valuePerSqm: number;
  costPerSqm: number;
  estimatedCost: number;
  grossAssetValue: number | null; // sale-oriented types
  estimatedMargin: number | null;
  annualRevenue: number | null; // operating types
  estimatedAdr: number | null;
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

export function findHub(hubId: string | null): Hub | null {
  return HUBS.find((h) => h.id === hubId) ?? null;
}

export function computeFeasibility(input: FeasibilityInput, fallbackValuePerSqm: number): FeasibilityResult {
  const hub = findHub(input.hubId);
  const valuePerSqm = hub?.valuePerSqm ?? fallbackValuePerSqm;
  const costRatio = COST_RATIO[input.projectType];
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

  const advisoryFeeSuccess = dealSize * BASE_SUCCESS_FEE_PCT;
  const advisoryFeeRetainer = BASE_MONTHLY_RETAINER * BASE_DURATION_MONTHS;
  const advisoryFeeTotal = advisoryFeeSuccess + advisoryFeeRetainer;

  return {
    valuePerSqm,
    costPerSqm,
    estimatedCost,
    grossAssetValue,
    estimatedMargin,
    annualRevenue,
    estimatedAdr,
    advisoryFeeSuccess,
    advisoryFeeRetainer,
    advisoryFeeTotal,
  };
}

export function fmtChf(v: number): string {
  return new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(Math.round(v));
}
