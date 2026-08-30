"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span
        className={cn(
          "eyebrow mb-4",
          dark ? "text-alpine-gold" : "text-alpine-gold"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-display text-3xl font-medium leading-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-alpine-cream" : "text-alpine-slate",
          align === "center" && "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-balance text-base leading-relaxed",
            dark ? "text-alpine-cream/65" : "text-alpine-slate/60"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
