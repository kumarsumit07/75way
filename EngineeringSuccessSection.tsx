"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const DONUT_SEGMENTS = [
  { label: "4+", color: "#e3f4ff", darkColor: "#0d6efd", sideColor: "#0b5ed7", cardIndex: 0 },
  { label: "10+", color: "#d6ecff", darkColor: "#0a59c2", sideColor: "#084ba3", cardIndex: 1 },
  { label: "150+", color: "#c7e3ff", darkColor: "#0848cf", sideColor: "#063baa", cardIndex: 2 },
  { label: "4+", color: "#b3daff", darkColor: "#003484", sideColor: "#002a6b", cardIndex: 3 },
  { label: "350+", color: "#8dc4ff", darkColor: "#0350d6", sideColor: "#0242b3", cardIndex: 4 },
  { label: "750+", color: "#72b5ff", darkColor: "#00118d", sideColor: "#000e74", cardIndex: 5 },
] as const;

const STAT_CARDS = [
  { num: "4+", label: "Strategic Government Endeavors" },
  { num: "10+", label: "Years of Engineering Brilliance" },
  { num: "150+", label: "Next-Gen Tech Innovators" },
  { num: "4+", label: "Fortune 500 Strategic Partnerships" },
  { num: "350+", label: "Business Ventures Empowered" },
  { num: "750+", label: "Tech Products Crafted & Delivered" },
] as const;

/** Stable floats for SVG attrs — avoids SSR/client hydration drift from cos/sin. */
function svgCoord(n: number): number {
  return Math.round(n * 100) / 100;
}

function polar(cx: number, cy: number, r: number, angleDeg: number, squashY: number = 0.55) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { 
    x: svgCoord(cx + r * Math.cos(rad)), 
    y: svgCoord(cy + (r * squashY) * Math.sin(rad)) 
  };
}

function donutSlicePath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number,
  squashY: number = 0.55
): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = polar(cx, cy, rOuter, startAngle, squashY);
  const p2 = polar(cx, cy, rOuter, endAngle, squashY);
  const p3 = polar(cx, cy, rInner, endAngle, squashY);
  const p4 = polar(cx, cy, rInner, startAngle, squashY);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter * squashY} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner * squashY} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

/**
 * Build the outer side-face path for a 3D donut slice.
 */
function outerSideFacePath(
  cx: number,
  cy: number,
  rOuter: number,
  startAngle: number,
  endAngle: number,
  depthY: number,
  squashY: number = 0.55
): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = polar(cx, cy, rOuter, startAngle, squashY);
  const p2 = polar(cx, cy, rOuter, endAngle, squashY);
  const p3 = { x: p2.x, y: p2.y + depthY };
  const p4 = { x: p1.x, y: p1.y + depthY };
  
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter * squashY} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rOuter} ${rOuter * squashY} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z"
  ].join(" ");
}

/**
 * Build the inner side-face path for a 3D donut slice.
 */
function innerSideFacePath(
  cx: number,
  cy: number,
  rInner: number,
  startAngle: number,
  endAngle: number,
  depthY: number,
  squashY: number = 0.55
): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = polar(cx, cy, rInner, startAngle, squashY);
  const p2 = polar(cx, cy, rInner, endAngle, squashY);
  const p3 = { x: p2.x, y: p2.y + depthY };
  const p4 = { x: p1.x, y: p1.y + depthY };
  
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rInner} ${rInner * squashY} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner * squashY} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z"
  ].join(" ");
}

/**
 * Build the left or right vertical edge face of a donut slice.
 */
function edgeFacePath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  angle: number,
  depthY: number,
  squashY: number = 0.55
): string {
  const pOuter = polar(cx, cy, rOuter, angle, squashY);
  const pInner = polar(cx, cy, rInner, angle, squashY);
  return [
    `M ${pOuter.x} ${pOuter.y}`,
    `L ${pInner.x} ${pInner.y}`,
    `L ${pInner.x} ${svgCoord(pInner.y + depthY)}`,
    `L ${pOuter.x} ${svgCoord(pOuter.y + depthY)}`,
    "Z",
  ].join(" ");
}

function SuccessDonutChart({
  activeIndex,
  onSegmentHover,
}: {
  activeIndex: number | null;
  onSegmentHover: (index: number | null) => void;
}) {
  const squashY = 0.58; // Gives the 3D isometric elliptical perspective
  const cx = 220;
  const cy = 180; // Shifted slightly up to balance the depth
  const rOuter = 150;
  const rInner = 75;
  const slice = 360 / DONUT_SEGMENTS.length;
  const depthY = 50; // Total 3D thickness of the donut
  const liftAmount = 20; // How far the active slice lifts vertically

  const segments = DONUT_SEGMENTS.map((seg, i) => {
    const start = i * slice;
    const end = (i + 1) * slice - 0.4; // tiny gap between slices
    const mid = start + slice / 2;
    return {
      ...seg,
      start,
      end,
      mid,
      topPath: donutSlicePath(cx, cy, rInner, rOuter, start, end, squashY),
      bottomPath: donutSlicePath(cx, cy + depthY, rInner, rOuter, start, end, squashY),
      outerSide: outerSideFacePath(cx, cy, rOuter, start, end, depthY, squashY),
      innerSide: innerSideFacePath(cx, cy, rInner, start, end, depthY, squashY),
      leftEdge: edgeFacePath(cx, cy, rInner, rOuter, start, depthY, squashY),
      rightEdge: edgeFacePath(cx, cy, rInner, rOuter, end, depthY, squashY),
      labelPos: polar(cx, cy, (rInner + rOuter) / 2, mid, squashY),
    };
  });

  const shouldShowOuterSide = (startAngle: number, endAngle: number): boolean => {
    // Show outer side if any part of the arc is in the bottom half (facing viewer)
    return endAngle > 90 && startAngle < 270;
  };

  const shouldShowInnerSide = (startAngle: number, endAngle: number): boolean => {
    // Show inner side if any part of the arc is in the top half
    return startAngle < 90 || endAngle > 270;
  };

  const shouldShowLeftEdge = (angle: number): boolean => {
    // leftEdge is the 'start' edge. Normal points counter-clockwise (angle - 90)
    // Visible if normal points down (between 90 and 270) -> 180 < angle < 360
    const a = (angle % 360 + 360) % 360;
    return a > 180 && a < 360;
  };

  const shouldShowRightEdge = (angle: number): boolean => {
    // rightEdge is the 'end' edge. Normal points clockwise (angle + 90)
    // Visible if normal points down (between 90 and 270) -> 0 < angle < 180
    const a = (angle % 360 + 360) % 360;
    return a > 0 && a < 180;
  };

  // Sort segments for proper rendering order: back segments first, front segments last
  const sortedIndices = segments
    .map((_, i) => i)
    .sort((a, b) => {
      const midA = segments[a].mid;
      const midB = segments[b].mid;
      // Depth corresponds to Y coordinate in the squashed perspective
      const depthValA = Math.sin(((midA - 90) * Math.PI) / 180);
      const depthValB = Math.sin(((midB - 90) * Math.PI) / 180);
      return depthValA - depthValB;
    });

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,clamp(18rem,92vmin,48rem))]">
      <svg
        viewBox="0 0 440 460"
        className="h-auto w-full max-h-[min(88vh,920px)]"
        aria-hidden
      >
        <defs>
          {segments.map((seg, idx) => (
            <linearGradient key={`grad-${idx}`} id={`segmentGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor={seg.color} stopOpacity="1" />
            </linearGradient>
          ))}
          <radialGradient id="innerHoleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8f0fe" stopOpacity="0.8" />
          </radialGradient>
          <filter id="donutBaseShadow" x="-30%" y="-20%" width="160%" height="170%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#0a59c2" floodOpacity="0.12" />
          </filter>
          <filter id="liftedSliceShadow" x="-40%" y="-40%" width="180%" height="200%">
            <feDropShadow dx="0" dy="20" stdDeviation="14" floodColor="#003484" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Base shadow layer */}
        <g filter="url(#donutBaseShadow)">
          {segments.map((seg, i) => (
            <path
              key={`base-bottom-${i}`}
              d={seg.bottomPath}
              fill={seg.darkColor}
              opacity="0.25"
            />
          ))}
        </g>

        {/* Render segments in depth order */}
        {sortedIndices.map((i) => {
          const seg = segments[i];
          const isActive = activeIndex === i;
          const lift = isActive ? -liftAmount : 0;

          const showOuter = shouldShowOuterSide(seg.start, seg.end);
          const showInner = shouldShowInnerSide(seg.start, seg.end);
          const showLeft = shouldShowLeftEdge(seg.start);
          const showRight = shouldShowRightEdge(seg.end);

          return (
            <g
              key={`segment-group-${i}`}
              style={{
                transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                transform: `translateY(${lift}px)`,
              }}
              filter={isActive ? "url(#liftedSliceShadow)" : undefined}
              onMouseEnter={() => onSegmentHover(i)}
              onMouseLeave={() => onSegmentHover(null)}
              pointerEvents="all"
              className="cursor-pointer"
            >
              {/* Outer side face */}
              {showOuter && (
                <path
                  d={seg.outerSide}
                  fill={seg.sideColor}
                  opacity={isActive ? 0.9 : 0.75}
                  style={{ transition: "opacity 0.3s ease" }}
                />
              )}

              {/* Inner side face */}
              {showInner && (
                <path
                  d={seg.innerSide}
                  fill={seg.darkColor}
                  opacity={isActive ? 0.8 : 0.6}
                  style={{ transition: "opacity 0.3s ease" }}
                />
              )}

              {/* Left edge face */}
              {showLeft && (
                <path
                  d={seg.leftEdge}
                  fill={seg.darkColor}
                  opacity={isActive ? 0.8 : 0.65}
                  style={{ transition: "opacity 0.3s ease" }}
                />
              )}

              {/* Right edge face */}
              {showRight && (
                <path
                  d={seg.rightEdge}
                  fill={seg.darkColor}
                  opacity={isActive ? 0.8 : 0.65}
                  style={{ transition: "opacity 0.3s ease" }}
                />
              )}

              {/* Top face */}
              <path
                d={seg.topPath}
                fill={`url(#segmentGrad-${i})`}
                stroke="rgba(255,255,255,0.95)"
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: "stroke-width 0.3s ease" }}
              />

              {/* Label */}
              <text
                x={seg.labelPos.x}
                y={seg.labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                style={{
                  fontSize: 18,
                  fill: "#062a7a",
                  fontWeight: 900,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {seg.label}
              </text>
            </g>
          );
        })}

        {/* Inner hole overlay - to mask inner shadows and give clean look */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rInner - 3}
          ry={(rInner - 3) * squashY}
          fill="url(#innerHoleGrad)"
          stroke="#d5e3f7"
          strokeWidth="1.5"
          opacity="0.7"
          className="pointer-events-none"
        />
      </svg>
    </div>
  );
}

export function EngineeringSuccessSection() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[rgba(10,89,194,0.14)] bg-gradient-to-b from-[#fdfdff] to-white py-16 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(8rem,28vw,18rem)] font-black leading-none text-[rgba(10,89,194,0.06)] select-none"
        aria-hidden
      >
        2000+
      </div>

      <div className="relative mx-auto grid max-w-7xl min-h-[clamp(360px,50vmin,30rem)] items-stretch gap-10 px-5 md:grid-cols-2 md:gap-12 lg:min-h-[clamp(420px,54vmin,38rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-14 xl:min-h-[clamp(460px,56vmin,42rem)] lg:px-8">
        {/* Donut Chart */}
        <motion.div
          className="order-2 flex h-full min-h-[min(72vw,380px)] w-full items-center justify-center self-center md:min-h-0 lg:order-1"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <SuccessDonutChart activeIndex={hoveredCardIndex} onSegmentHover={setHoveredCardIndex} />
        </motion.div>

        {/* Right side content */}
        <div className="order-1 flex h-full min-h-0 flex-col justify-center space-y-8 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl font-black tracking-tight text-(--color-text) md:text-4xl lg:text-[2.35rem] lg:leading-tight">
              Engineering Digital Success For{" "}
              <span className="bg-gradient-to-r from-primary-strong via-primary to-[#0d7dff] bg-clip-text text-transparent">2000+ Visions</span>{" "}
              With AI Across Geographies
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Being a trusted AI-led IT partner, we turn business challenges into transformative outcomes backed by proven
              engineering depth, modern cloud platforms, and Web3-ready innovation.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAT_CARDS.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.04 }}
                onHoverStart={() => setHoveredCardIndex(idx)}
                onHoverEnd={() => setHoveredCardIndex(null)}
                className={`rounded-3xl bg-gradient-to-br from-primary to-primary-strong p-6 shadow-lg cursor-pointer
                  ${hoveredCardIndex === idx
                    ? "shadow-[0_12px_40px_rgba(10,89,194,0.38)] ring-2 ring-white/30"
                    : "shadow-[0_6px_24px_rgba(10,89,194,0.18)]"
                  }`}
                style={{
                  transition: "box-shadow 0.35s ease, ring 0.35s ease",
                }}
              >
                <p className="text-4xl font-black text-surface md:text-5xl">{card.num}</p>
                <p className="mt-3 text-sm font-semibold leading-snug text-surface">{card.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center sm:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex rounded-full border border-[rgba(10,89,194,0.2)] bg-[rgba(10,89,194,0.08)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-strong">
              Proven delivery
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
