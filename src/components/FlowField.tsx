"use client";

import * as React from "react";

interface FlowFieldProps {
  className?: string;
  color?: string;
  spacing?: number;
  dashLength?: number;
}

export function FlowField({
  className,
  color = "56,182,255",
  spacing = 34,
  dashLength = 7,
}: FlowFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: { x: number; y: number; phase: number }[] = [];
    let animationFrame: number;

    const setup = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({
            x: c * spacing,
            y: r * spacing,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.00035;

      for (const p of points) {
        let angle: number;
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 260;

        if (mouse.current.active && dist < influenceRadius) {
          const targetAngle = Math.atan2(dy, dx);
          const strength = 1 - dist / influenceRadius;
          const idleAngle =
            Math.sin(t + p.phase) * 0.6 + Math.cos(t * 0.7 + p.x * 0.01);
          angle = targetAngle * strength + idleAngle * (1 - strength);
        } else {
          angle = Math.sin(t + p.phase) * 0.6 + Math.cos(t * 0.7 + p.x * 0.01);
        }

        const dxL = Math.cos(angle) * dashLength;
        const dyL = Math.sin(angle) * dashLength;

        ctx.beginPath();
        ctx.moveTo(p.x - dxL, p.y - dyL);
        ctx.lineTo(p.x + dxL, p.y + dyL);
        ctx.strokeStyle = `rgba(${color},0.35)`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    setup();

    if (prefersReducedMotion) {
      draw(0);
    } else {
      animationFrame = requestAnimationFrame(draw);
    }

    const handleResize = () => setup();
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handlePointerLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [color, spacing, dashLength]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
