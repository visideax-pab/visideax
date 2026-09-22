"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/Magnetic";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#overview", label: "Overview" },
  { href: "/#advisory", label: "Advisory" },
  { href: "/how-we-work", label: "Process" },
  { href: "/why-us", label: "For Entrepreneurs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-alpine-slate/95 backdrop-blur-md shadow-elevated py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between lg:grid lg:grid-cols-3">
        <Link href="/#top" className="flex items-center group lg:justify-self-start">
          <Image src="/logo-mark-light.svg" alt="VisideaX" width={220} height={47} priority className="h-7 w-auto sm:h-8" />
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:justify-self-center lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-alpine-cream/70 transition-colors hover:text-alpine-gold"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-alpine-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block lg:justify-self-end">
          <Magnetic strength={10}>
            <Button variant="gold" size="sm" asChild>
              <Link href="/#contact">Request Mandate</Link>
            </Button>
          </Magnetic>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-alpine-cream"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-alpine-slate/98 backdrop-blur-md"
          >
            <div className="container flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-semibold uppercase tracking-[0.2em] text-alpine-cream/80 hover:text-alpine-gold transition-colors border-b border-alpine-cream/10"
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="gold" size="default" className="mt-5 w-full" asChild>
                <Link href="/#contact" onClick={() => setOpen(false)}>
                  Request Mandate
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
