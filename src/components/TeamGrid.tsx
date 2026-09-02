"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

interface Member {
  name: string;
  role: string;
  location: string;
  bio: string;
  photo?: string;
  linkedin?: string;
}

function Avatar({ member, size }: { member: Member; size: number }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={member.name}
        width={size}
        height={size}
        className="rounded-full border border-alpine-gold/40 object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center border border-alpine-gold/40 font-display text-alpine-gold"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {member.name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </div>
  );
}

function LinkedinButton({ href, className }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label="LinkedIn profile"
      className={className}
    >
      <Linkedin size={16} />
    </a>
  );
}

export function TeamGrid({ team }: { team: Member[] }) {
  const [active, setActive] = React.useState<Member | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="group h-full overflow-hidden border border-alpine-slate/10 bg-alpine-slate transition-colors hover:border-alpine-gold/50">
              <button
                onClick={() => setActive(member)}
                className="flex h-full w-full flex-col items-stretch text-left"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-alpine-navy">
                      <Avatar member={member} size={88} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-alpine-slate via-alpine-slate/10 to-transparent" />
                  {member.linkedin && (
                    <LinkedinButton
                      href={member.linkedin}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-alpine-cream/30 bg-alpine-slate/60 text-alpine-cream backdrop-blur-sm transition-colors hover:border-alpine-gold hover:bg-alpine-gold hover:text-alpine-slate"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col items-start p-7">
                  <h3 className="font-display text-xl text-alpine-cream">{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-alpine-gold">
                    {member.role}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-alpine-cream/40">
                    {member.location}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-alpine-cream/60 line-clamp-3">
                    {member.bio}
                  </p>
                  <span className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-alpine-gold/70">
                    View Profile →
                  </span>
                </div>
              </button>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-alpine-slate/70 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md border border-alpine-gold/30 bg-white p-10"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 text-alpine-slate/40 transition-colors hover:text-alpine-gold"
              >
                <X size={20} />
              </button>
              <Avatar member={active} size={72} />
              <h3 className="mt-6 font-display text-2xl text-alpine-slate">
                {active.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-alpine-gold">
                {active.role}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-alpine-slate/40">
                {active.location}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-alpine-slate/65">
                {active.bio}
              </p>
              {active.linkedin && (
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-alpine-gold hover:underline"
                >
                  <Linkedin size={15} />
                  View LinkedIn Profile
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
