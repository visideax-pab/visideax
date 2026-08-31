"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "visideax-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-alpine-cream/10 bg-alpine-slate px-6 py-6 sm:px-10"
        >
          <div className="container flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <p className="max-w-2xl text-center text-sm leading-relaxed text-alpine-cream/70 sm:text-left">
              This site uses only essential cookies required for it to
              function. Any information you submit through our forms is used
              solely by VisideaX to respond to your inquiry — it is never
              sold or shared with third parties.{" "}
              <a href="/privacy" className="underline hover:text-alpine-gold">
                Learn more
              </a>
              .
            </p>
            <Button variant="gold" size="sm" onClick={accept} className="shrink-0">
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
