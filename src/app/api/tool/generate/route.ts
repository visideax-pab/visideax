import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { PROJECT_TYPES, fmtChf, type ProjectType, type FeasibilityResult } from "@/lib/feasibility";

const NAVY = rgb(0x0b / 255, 0x2e / 255, 0x4e / 255);
const BLUE = rgb(0x38 / 255, 0xb6 / 255, 0xff / 255);
const MUTED = rgb(0x4a / 255, 0x5c / 255, 0x6b / 255);
const WHITE = rgb(1, 1, 1);
const LINE = rgb(0xdc / 255, 0xe6 / 255, 0xee / 255);

interface GenerateBody {
  description: string;
  projectType: ProjectType;
  location: string;
  sizeSqm: number;
  keysOrUnits: number;
  membershipFee: number;
  contactName: string;
  contactEmail: string;
  contactEntity: string;
  result: FeasibilityResult;
}

function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenerateBody;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageW = 595.28; // A4 points
  const pageH = 841.89;
  const margin = 56;
  const contentW = pageW - margin * 2;

  let page = pdfDoc.addPage([pageW, pageH]);
  let y = pageH - 40;

  // Header band
  page.drawRectangle({ x: 0, y: pageH - 70, width: pageW, height: 70, color: NAVY });
  try {
    const logoPath = path.join(process.cwd(), "public", "logo-mark-square.png");
    const logoBytes = await fs.readFile(logoPath);
    const logoImg = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImg, { x: margin, y: pageH - 56, width: 28, height: 28 });
  } catch {
    // logo optional
  }
  page.drawText("VisideaX", {
    x: margin + 38,
    y: pageH - 46,
    size: 16,
    font: fontBold,
    color: WHITE,
  });
  page.drawText("Real Estate Feasibility Estimate — Prepared Confidentially", {
    x: margin + 38,
    y: pageH - 62,
    size: 9,
    font,
    color: BLUE,
  });

  y = pageH - 100;

  const heading = (text: string) => {
    page.drawText(text, { x: margin, y, size: 13, font: fontBold, color: NAVY });
    y -= 20;
  };

  const label = (text: string) => {
    page.drawText(text, { x: margin, y, size: 9, font, color: MUTED });
    y -= 13;
  };

  const bodyText = (text: string, size = 10) => {
    const lines = wrapText(text, font, size, contentW);
    for (const line of lines) {
      if (y < 90) {
        page = pdfDoc.addPage([pageW, pageH]);
        y = pageH - 60;
      }
      page.drawText(line, { x: margin, y, size, font, color: rgb(0.1, 0.16, 0.22) });
      y -= size + 5;
    }
    y -= 6;
  };

  const row = (l: string, v: string, boldValue = false) => {
    page.drawText(l, { x: margin, y, size: 10, font, color: MUTED });
    const valFont = boldValue ? fontBold : font;
    const valColor = boldValue ? NAVY : rgb(0.15, 0.2, 0.26);
    const w = valFont.widthOfTextAtSize(v, 10.5);
    page.drawText(v, { x: pageW - margin - w, y, size: 10.5, font: valFont, color: valColor });
    y -= 18;
    page.drawLine({
      start: { x: margin, y: y + 8 },
      end: { x: pageW - margin, y: y + 8 },
      thickness: 0.5,
      color: LINE,
    });
  };

  const date = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  heading("Prepared For");
  label(`${body.contactName || "—"}${body.contactEntity ? " · " + body.contactEntity : ""}`);
  label(body.contactEmail || "—");
  label(`Date: ${date}`);
  y -= 10;

  heading("Project Summary");
  const typeLabel = PROJECT_TYPES.find((t) => t.value === body.projectType)?.label ?? body.projectType;
  label(`Location: ${body.location || "—"}`);
  label(`Project type: ${typeLabel}`);
  if (body.sizeSqm > 0) label(`Approx. size: ${fmtChf(body.sizeSqm)} sqm`);
  if (body.keysOrUnits > 0) label(`Approx. keys / capacity: ${fmtChf(body.keysOrUnits)}`);
  y -= 6;
  bodyText(body.description || "No description provided.");

  heading("Illustrative Feasibility Estimate");
  const r = body.result;
  row("Indicative value / sqm", `CHF ${fmtChf(r.valuePerSqm)}`);
  row("Indicative cost / sqm", `CHF ${fmtChf(r.costPerSqm)}`);
  row("Estimated Cost", `CHF ${fmtChf(r.estimatedCost)}`, true);
  if (r.grossAssetValue !== null) {
    row("Estimated Gross Asset Value", `CHF ${fmtChf(r.grossAssetValue)}`, true);
    row("Estimated Development Margin", `CHF ${fmtChf(r.estimatedMargin ?? 0)}`, true);
  }
  if (r.annualRevenue !== null) {
    if (r.estimatedAdr !== null) row("Estimated ADR", `CHF ${fmtChf(r.estimatedAdr)} / night`);
    row("Estimated Annual Revenue", `CHF ${fmtChf(r.annualRevenue)}`, true);
  }
  row("Illustrative VisideaX Advisory Fee", `CHF ${fmtChf(r.advisoryFeeTotal)}`, true);

  y -= 14;
  heading("Important Notice");
  bodyText(
    "This document is an illustrative, order-of-magnitude planning estimate generated from indicative " +
      "location benchmarks and standard cost ratios. It is not a valuation, appraisal, feasibility study, " +
      "or offer, and does not constitute investment, legal, or tax advice. Real feasibility depends on the " +
      "specific asset, zoning and permitting, financing terms, and execution. VisideaX has no operating " +
      "history and this estimate does not reflect a completed transaction. Prepared confidentially for the " +
      "named recipient only — not for further distribution.",
    9
  );

  const pdfBytes = await pdfDoc.save();
  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="VisideaX-Feasibility-Estimate.pdf"`,
    },
  });
}
