import { MapPin, Mail, Linkedin } from "lucide-react";
import { footprint } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-alpine-cream/10 bg-alpine-slate py-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            <img
              src="/logo-mark-light.svg"
              alt="VisideaX"
              className="h-9 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-alpine-cream/50">
              Partnership Advisory Boutique. Architecting durable alliances
              between capital, luxury brands, and the European territories
              that anchor them.
            </p>
          </div>

          <div>
            <span className="eyebrow text-alpine-gold">Footprint</span>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {footprint.map((place, i) => (
                <span key={place} className="flex items-center gap-2 text-sm text-alpine-cream/60">
                  <MapPin size={14} className="text-alpine-gold" />
                  {place}
                  {i < footprint.length - 1 && (
                    <span className="ml-6 hidden h-1 w-1 rounded-full bg-alpine-cream/20 sm:inline-block" />
                  )}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-alpine-cream/30">
              Switzerland · United Kingdom
            </p>
          </div>

          <div>
            <span className="eyebrow text-alpine-gold">Navigate</span>
            <div className="mt-5 flex flex-col gap-3">
              <a href="/#overview" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Executive Overview
              </a>
              <a href="/#advisory" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Advisory Services
              </a>
              <a href="/team" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Team
              </a>
              <a href="/careers" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Careers
              </a>
              <a href="/annual-report" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Annual Report
              </a>
              <a href="/#contact" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Confidential Mandate
              </a>
              <a href="/tool" className="text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors">
                Client Feasibility Tool
              </a>
            </div>
          </div>

          <div>
            <span className="eyebrow text-alpine-gold">Connect</span>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:visideax@etik.com"
                className="flex items-center gap-2 text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors"
              >
                <Mail size={14} className="text-alpine-gold" />
                visideax@etik.com
              </a>
              <a
                href="https://www.linkedin.com/company/visideax-/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-alpine-cream/60 hover:text-alpine-gold transition-colors"
              >
                <Linkedin size={14} className="text-alpine-gold" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-alpine-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-alpine-cream/30">
            © {new Date().getFullYear()} VisideaX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-xs text-alpine-cream/30 hover:text-alpine-gold transition-colors"
            >
              Privacy Policy
            </a>
            <p className="text-xs text-alpine-cream/30">
              Partnership Advisory Boutique — St. Moritz · Zürich · London
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
