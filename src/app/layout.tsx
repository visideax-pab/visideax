import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";

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
  metadataBase: new URL("https://visideax.com"),
  title: "VisideaX | Events & Strategic Partnerships Across Europe",
  description:
    "VisideaX is a newly formed, privately held advisory practice on high-network events and large-scale partnerships across Europe, with presence in St. Moritz, Lugano and Bratislava.",
  keywords: [
    "VisideaX",
    "high-network events",
    "event consulting Europe",
    "strategic partnerships",
    "government and destination partnerships",
    "sponsorship structuring",
    "Joint Venture structuring",
    "St. Moritz",
    "Lugano",
    "Bratislava",
  ],
  authors: [{ name: "VisideaX" }],
  openGraph: {
    title: "VisideaX | Events & Strategic Partnerships Across Europe",
    description:
      "A newly formed, privately held advisory practice on high-network events and large-scale partnerships across Europe.",
    type: "website",
    locale: "en_CH",
    images: ["/logo-mark-square.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VisideaX",
  url: "https://visideax.com",
  logo: "https://visideax.com/logo-mark-square.png",
  description:
    "A newly formed, privately held advisory practice on high-network events and large-scale partnerships across Europe.",
  address: [
    { "@type": "PostalAddress", addressLocality: "St. Moritz", addressCountry: "CH" },
    { "@type": "PostalAddress", addressLocality: "Lugano", addressCountry: "CH" },
    { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
  ],
  sameAs: ["https://www.linkedin.com/company/visideax-/about/"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
