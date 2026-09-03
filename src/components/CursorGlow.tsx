"use client";

import * as React from "react";

export function CursorGlow() {
  const glowRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        ringRef.current?.classList.add("cursor-ring-active");
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('a, button, [role="button"], input, select, textarea')) {
        ringRef.current?.classList.remove("cursor-ring-active");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-[600px] w-[600px] rounded-full opacity-[0.10] mix-blend-screen transition-opacity duration-500 lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(56,182,255,0.9) 0%, rgba(56,182,255,0) 70%)",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed z-[250] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-alpine-gold/70 transition-[width,height] duration-200 ease-out lg:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
