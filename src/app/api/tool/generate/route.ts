import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { PROJECT_TYPES, fmtChf, type ProjectType, type FeasibilityResult } from "@/lib/feasibility";

const WEB3FORMS_ACCESS_KEY = "e667efc9-bc88-4b01-b39a-3d6fa43ae448";

const NAVY = rgb(0x0b / 255, 0x2e / 255, 0x4e / 255);
const BLUE = rgb(0x38 / 255, 0xb6 / 255, 0xff / 255);
const MUTED = rgb(0x4a / 255, 0x5c / 255, 0x6b / 255);
const WHITE = rgb(1, 1, 1);
const LINE = rgb(0xdc / 255, 0xe6 / 255, 0xee / 255);

interface GenerateBody {
  presentation: string;
  description: string;
  projectType: ProjectType;
  location: string;
  eventAttendees: number;
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

async function notifyVisideaX(body: GenerateBody) {
  const typeLabel = PROJECT_TYPES.find((t) => t.value === body.projectType)?.label ?? body.projectType;
  const r = body.result;
  const estimateLines = [
    r.estimatedCost !== null ? `Estimated Cost: CHF ${fmtChf(r.estimatedCost)}` : null,
    r.grossAssetValue !== null ? `Estimated Gross Asset Value: CHF ${fmtChf(r.grossAssetValue)}` : null,
    r.annualRevenue !== null ? `Estimated Annual Revenue: CHF ${fmtChf(r.annualRevenue)}` : null,
    r.sponsorshipRevenue !== null ? `Estimated Sponsorship Revenue: CHF ${fmtChf(r.sponsorshipRevenue)}` : null,
    r.dealValue !== null ? `Partnership / Transaction Value: CHF ${fmtChf(r.dealValue)}` : null,
    `Illustrative Advisory Fee: CHF ${fmtChf(r.advisoryFeeTotal)}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New feasibility tool submission — ${body.contactName || "Unknown"}`,
        "Full Name": body.contactName,
        "Entity / Family Office": body.contactEntity || "—",
        email: body.contactEmail,
        "Project Type": typeLabel,
        Location: body.location,
        "About the Client": body.presentation,
        "Project Description": body.description,
        "Illustrative Estimate": estimateLines,
      }),
    });
  } catch {
    // Do not block the client's PDF download if the notification fails.
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenerateBody;
  await notifyVisideaX(body);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageW = 595.28; // A4 points
  const pageH = 841.89;
  const margin = 56;
  const contentW = pageW - margin * 2;

  let page = pdfDoc.addPage([pageW, pageH]);
  let y = pageH - 40;

  const drawHeader = () => {
    page.drawRectangle({ x: 0, y: pageH - 70, width: pageW, height: 70, color: NAVY });
    page.drawText("VisideaX", { x: margin + 38, y: pageH - 46, size: 16, font: fontBold, color: WHITE });
    page.drawText("Feasibility & Partnership Estimate — Prepared Confidentially", {
      x: margin + 38,
      y: pageH - 62,
      size: 9,
      font,
      color: BLUE,
    });
  };

  let logoImg: any = null;
  try {
    const logoPath = path.join(process.cwd(), "public", "logo-mark-square.png");
    const logoBytes = await fs.readFile(logoPath);
    logoImg = await pdfDoc.embedPng(logoBytes);
  } catch {
    // logo optional
  }

  drawHeader();
  if (logoImg) page.drawImage(logoImg, { x: margin, y: pageH - 56, width: 28, height: 28 });

  y = pageH - 100;

  const heading = (text: string) => {
    if (y < 110) {
      page = pdfDoc.addPage([pageW, pageH]);
      drawHeader();
      if (logoImg) page.drawImage(logoImg, { x: margin, y: pageH - 56, width: 28, height: 28 });
      y = pageH - 100;
    }
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
    if (y < 60) {
      page = pdfDoc.addPage([pageW, pageH]);
      y = pageH - 60;
    }
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
  label("Consent to share this information with VisideaX: confirmed");
  y -= 10;

  heading("About the Client");
  bodyText(body.presentation || "No presentation provided.");

  heading("Project Summary");
  const typeLabel = PROJECT_TYPES.find((t) => t.value === body.projectType)?.label ?? body.projectType;
  const r = body.result;
  label(`Project type: ${typeLabel}`);
  if (r.category === "real-estate") label(`Location: ${body.location || "—"}`);
  if (r.category === "event" && body.eventAttendees > 0) label(`Expected attendees: ${fmtChf(body.eventAttendees)}`);
  y -= 6;
  bodyText(body.description || "No description provided.");

  heading("Illustrative Feasibility Estimate");
  if (r.valuePerSqm !== null) row("Indicative value / sqm", `CHF ${fmtChf(r.valuePerSqm)}`);
  if (r.costPerSqm !== null) row("Indicative cost / sqm", `CHF ${fmtChf(r.costPerSqm)}`);
  if (r.estimatedCost !== null) row("Estimated Cost", `CHF ${fmtChf(r.estimatedCost)}`, true);
  if (r.grossAssetValue !== null) {
    row("Estimated Gross Asset Value", `CHF ${fmtChf(r.grossAssetValue)}`, true);
    row("Estimated Development Margin", `CHF ${fmtChf(r.estimatedMargin ?? 0)}`, true);
  }
  if (r.annualRevenue !== null) {
    if (r.estimatedAdr !== null) row("Estimated ADR", `CHF ${fmtChf(r.estimatedAdr)} / night`);
    row("Estimated Annual Revenue", `CHF ${fmtChf(r.annualRevenue)}`, true);
  }
  if (r.sponsorshipRevenue !== null) row("Estimated Sponsorship Revenue", `CHF ${fmtChf(r.sponsorshipRevenue)}`, true);
  if (r.dealValue !== null) row("Partnership / Transaction Value", `CHF ${fmtChf(r.dealValue)}`, true);
  row("Illustrative VisideaX Advisory Fee", `CHF ${fmtChf(r.advisoryFeeTotal)}`, true);

  y -= 14;
  heading("Important Notice");
  bodyText(
    "This document is an illustrative, order-of-magnitude planning estimate generated from indicative " +
      "benchmarks and standard assumptions. It is not a valuation, appraisal, feasibility study, or offer, " +
      "and does not constitute investment, legal, or tax advice. Real feasibility depends on the specific " +
      "asset or event, permits, partners, financing terms, and execution. VisideaX has no operating history " +
      "and this estimate does not reflect a completed transaction. Prepared confidentially for the named " +
      "recipient only — not for further distribution.",
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
