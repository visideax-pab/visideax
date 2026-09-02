"use client";

import * as React from "react";
import { HUBS } from "@/lib/feasibility";
import { cn } from "@/lib/utils";

// A stylized, simplified silhouette of Switzerland — not survey-accurate,
// but recognizable and correctly proportioned enough to place the hub
// markers below in roughly the right relative positions.
const SWITZERLAND_OUTLINE =
  "M 30,4 L 45,2 L 58,8 L 70,6 L 84,14 L 92,22 L 96,32 L 90,40 L 94,48 " +
  "L 88,56 L 92,64 L 82,72 L 84,82 L 72,90 L 62,96 L 50,94 L 44,86 " +
  "L 32,88 L 20,84 L 8,88 L 2,78 L 10,68 L 4,58 L 12,48 L 6,38 " +
  "L 14,28 L 10,18 L 20,10 Z";

interface SwissMapProps {
  selectedHub: string | null;
  onSelectHub: (hubId: string) => void;
}

export function SwissMap({ selectedHub, onSelectHub }: SwissMapProps) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 100 100" className="w-full" style={{ aspectRatio: "1 / 1" }}>
        <path
          d={SWITZERLAND_OUTLINE}
          fill="#F4F9FC"
          stroke="#B8C4D0"
          strokeWidth={0.6}
        />
        {HUBS.map((hub) => {
          const isActive = selectedHub === hub.id;
          const isHovered = hovered === hub.id;
          return (
            <g
              key={hub.id}
              onMouseEnter={() => setHovered(hub.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectHub(hub.id)}
              className="cursor-pointer"
            >
              {isActive && (
                <circle cx={hub.x} cy={hub.y} r={4.5} fill="#38B6FF" opacity={0.25}>
                  <animate attributeName="r" values="4.5;7;4.5" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={isActive || isHovered ? 2.6 : 2}
                fill={isActive ? "#38B6FF" : "#0B2E4E"}
                stroke="#F4F9FC"
                strokeWidth={0.5}
                className="transition-all duration-200"
              />
              <text
                x={hub.x}
                y={hub.y - 4}
                textAnchor="middle"
                fontSize={3.4}
                fontWeight={isActive || isHovered ? 700 : 500}
                fill={isActive ? "#0B2E4E" : "#4A5C6B"}
                className="pointer-events-none select-none transition-all duration-200"
                style={{ opacity: isActive || isHovered ? 1 : 0.75 }}
              >
                {hub.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-center text-[0.65rem] font-medium uppercase tracking-[0.15em] text-alpine-slate/35">
        Switzerland — available now · more territories coming
      </p>
    </div>
  );
}
