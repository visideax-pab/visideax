"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ToolLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/tool/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/tool");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-alpine-slate px-6 py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,182,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,182,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm border border-alpine-gold/30 bg-alpine-navy/40 p-10"
      >
        <div className="flex h-11 w-11 items-center justify-center border border-alpine-gold/40 text-alpine-gold">
          <Lock size={20} strokeWidth={1.5} />
        </div>
        <span className="eyebrow mt-5 block text-alpine-gold">Feasibility Tool</span>
        <h1 className="mt-2 font-display text-2xl text-alpine-cream">Client Access</h1>
        <p className="mt-3 text-sm leading-relaxed text-alpine-cream/60">
          This tool is available only to clients with credentials issued
          directly by VisideaX.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-alpine-cream/60">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@entity.com"
              className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-alpine-cream/60">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-alpine-cream/20 text-alpine-cream placeholder:text-alpine-cream/30 focus:border-alpine-gold"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
            <span className="inline-flex items-center gap-3">
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={16} />}
            </span>
          </Button>
        </form>
      </motion.div>
    </main>
  );
}
