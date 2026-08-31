import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VisideaX | Partnership Advisory Boutique",
  description:
    "VisideaX architects durable alliances between capital, luxury brands, and the European territories that anchor them. A private Swiss boutique advisory operating by introduction only, across St. Moritz, Zürich, and London.",
  keywords: [
    "VisideaX",
    "Partnership Advisory Boutique",
    "Swiss boutique advisory",
    "St. Moritz",
    "Zürich",
    "London",
    "Lex Koller",
    "Joint Venture structuring",
    "private luxury advisory",
  ],
  authors: [{ name: "VisideaX" }],
  openGraph: {
    title: "VisideaX | Partnership Advisory Boutique",
    description:
      "Architects of durable alliances between capital, luxury brands, and the European territories that anchor them.",
    type: "website",
    locale: "en_CH",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-alpine-cream text-alpine-slate antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
