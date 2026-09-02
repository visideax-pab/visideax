"use client";

import * as React from "react";
import { HUBS, OFFICES } from "@/lib/feasibility";

// A stylized, simplified silhouette of Switzerland — deliberately faceted
// rather than survey-accurate, but walked as a single clean clockwise loop
// (Basel → Lake Constance → Graubünden/Engadin → Ticino tip → Geneva tail →
// Jura arc → back to Basel) so it renders as one complete, non-overlapping
// shape at any size.
const SWITZERLAND_OUTLINE =
  "M 25,8 L 48,3 L 72,10 L 88,22 L 95,38 L 90,55 L 82,62 " +
  "L 72,78 L 60,95 L 48,86 L 34,82 L 22,88 L 4,90 " +
  "L 10,68 L 6,48 L 2,28 L 14,12 Z";

interface SwissMapProps {
  selectedHub: string | null;
  onSelectHub: (hubId: string) => void;
}

export function SwissMap({ selectedHub, onSelectHub }: SwissMapProps) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <div className="relative w-full">
      <svg viewBox="-4 -4 108 108" className="w-full overflow-visible" style={{ aspectRatio: "1 / 1" }}>
        <path
          d={SWITZERLAND_OUTLINE}
          fill="#F4F9FC"
          stroke="#B8C4D0"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />

        {OFFICES.map((office) => (
          <g key={office.id} className="pointer-events-none">
            <rect
              x={office.x - 2.2}
              y={office.y - 2.2}
              width={4.4}
              height={4.4}
              transform={`rotate(45 ${office.x} ${office.y})`}
              fill="#0B2E4E"
              stroke="#38B6FF"
              strokeWidth={0.6}
            />
            <text
              x={office.x}
              y={office.y + 7.5}
              textAnchor="middle"
              fontSize={2.9}
              fontWeight={700}
              fill="#0B2E4E"
              className="select-none"
            >
              {office.name}
            </text>
          </g>
        ))}

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
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-alpine-slate/35">
          Switzerland — available now · more territories coming
        </p>
        <p className="flex items-center gap-1.5 text-[0.65rem] font-medium text-alpine-slate/45">
          <span className="inline-block h-2 w-2 rotate-45 bg-alpine-slate" />
          VisideaX offices — St. Moritz &amp; Zürich
        </p>
      </div>
    </div>
  );
}
