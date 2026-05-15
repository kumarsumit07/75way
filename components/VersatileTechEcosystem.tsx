"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Four tabs map to four rings: id 1 = outermost → id 4 = innermost.
 */
const ECOSYSTEM_DATA = [
  {
    id: 1,
    title: "Software Development Services",
    description:
      "Build scalable apps, software, and website with innovative technologies.",
    items: [
      "Next.js",
      "PHP",
      "Machine Learning",
      "JavaScript",
      ".Net",
      "Swift",
      "Python",
      "Angular",
      "RoR",
      "React",
      "Node.js",
      "Flutter",
      "Hugging Face",
      "React Major",
      "OpenAI",
    ],
  },
  {
    id: 2,
    title: "CRM Automation Tools",
    description:
      "We use versatile tools to craft CRMs and data analytics platforms.",
    items: [
      "Amazon Kinesis",
      "Apache Kafka Streams",
      "Microsoft Dynamics",
      "Salesforce",
      "Odoo",
      "Zoho",
      "Zendesk",
      "Azure Stream Analytics",
    ],
  },
  {
    id: 3,
    title: "Databases / Data Storage",
    description:
      "Systems that securely store, manage, and organize data efficiently.",
    items: [
      "Hive",
      "Apache HBase",
      "Cassandra",
      "PostgreSQL",
      "Microsoft SQL Server",
      "RabbitMQ",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    id: 4,
    title: "DevOps & Infrastructure",
    description:
      "Tools we utilized for deployment, automation, and cloud operations.",
    items: ["Google Cloud", "Kubernetes", "Azure DevOps", "AWS"],
  },
] as const;

/** Stroke-centered radius and band thickness (donut rings). */
const RING_CONFIG = [
  { id: 1, r: 212, strokeWidth: 46 },
  { id: 2, r: 164, strokeWidth: 46 },
  { id: 3, r: 116, strokeWidth: 46 },
  { id: 4, r: 72, strokeWidth: 46 },
] as const;

const VB = 520;
const CX = VB / 2;
const CY = VB / 2;
/** Inner radius of ring 4 band is 72 − 23 = 49; hub stays inside that hole. */
const HUB_R = 44;

/** White separator circles at band boundaries (center → edge). */
const SEPARATOR_RS = (() => {
  const half = 46 / 2;
  const b = RING_CONFIG.map((ring) => ({
    inner: ring.r - half,
    outer: ring.r + half,
  }));
  const lines: number[] = [];
  lines.push((HUB_R + b[3].inner) / 2);
  for (let i = 3; i >= 1; i--) {
    const gapMid = (b[i].outer + b[i - 1].inner) / 2;
    lines.push(gapMid);
  }
  lines.push(b[0].outer - 1.5);
  return lines;
})();

function getLabelPositions(
  cx: number,
  cy: number,
  radius: number,
  items: readonly string[]
) {
  const n = items.length;
  return items.map((text, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      text,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

type RingVisual = "blue-default" | "blue-spotlight" | "muted";

function TechRing({
  config,
  items,
  visual,
}: {
  config: (typeof RING_CONFIG)[number];
  items: readonly string[];
  visual: RingVisual;
}) {
  const positions = useMemo(
    () => getLabelPositions(CX, CY, config.r, items),
    [config.r, items]
  );

  const isSpotlight = visual === "blue-spotlight";
  const isMuted = visual === "muted";

  const strokePaint = isMuted
    ? "#f8fafc"
    : isSpotlight
      ? "url(#spotlightRingStroke)"
      : "url(#defaultRingStroke)";

  const strokeOpacity = isMuted ? 1 : isSpotlight ? 1 : 0.92;

  const labelFill = isMuted ? "#64748b" : "#ffffff";
  const labelShadow = isMuted
    ? "none"
    : isSpotlight
      ? "0 1px 3px rgba(0,0,0,0.35)"
      : "0 1px 2px rgba(15,23,42,0.25)";

  const dividerStroke = isMuted ? "#e2e8f0" : "rgba(255,255,255,0.55)";
  const dividerOpacity = isMuted ? 0.85 : isSpotlight ? 0.55 : 0.35;

  const half = config.strokeWidth / 2;
  const rIn = config.r - half;
  const rOut = config.r + half;

  return (
    <g transform={`translate(${CX},${CY})`}>
      <motion.g
        initial={false}
        animate={{
          scale: isSpotlight ? 1.028 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
      >
        <g transform={`translate(${-CX},${-CY})`}>
          {isSpotlight && (
            <>
              <circle
                cx={CX}
                cy={CY}
                r={config.r}
                fill="none"
                stroke="url(#spotlightGlow)"
                strokeWidth={config.strokeWidth + 22}
                opacity={0.22}
              />
              <circle
                cx={CX}
                cy={CY}
                r={config.r}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={config.strokeWidth + 10}
                opacity={0.18}
              />
            </>
          )}

          <circle
            cx={CX}
            cy={CY}
            r={config.r}
            fill="none"
            stroke={strokePaint}
            strokeWidth={config.strokeWidth}
            strokeOpacity={strokeOpacity}
            vectorEffect="non-scaling-stroke"
          />

          {isSpotlight && (
            <circle
              cx={CX}
              cy={CY}
              r={config.r}
              fill="none"
              stroke="url(#spotlightRingStroke)"
              strokeWidth={Math.max(4, config.strokeWidth * 0.12)}
              strokeOpacity={0.95}
            />
          )}

          {items.map((_, i) => {
            const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                x1={CX + rIn * Math.cos(angle)}
                y1={CY + rIn * Math.sin(angle)}
                x2={CX + rOut * Math.cos(angle)}
                y2={CY + rOut * Math.sin(angle)}
                stroke={dividerStroke}
                strokeWidth={isSpotlight ? 1.1 : 0.85}
                strokeOpacity={dividerOpacity}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {positions.map((pos, idx) => (
            <text
              key={idx}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={labelFill}
              className="pointer-events-none select-none font-semibold"
              style={{
                fontSize: items.length > 12 ? 7.25 : 8.5,
                textShadow: labelShadow,
              }}
            >
              {pos.text}
            </text>
          ))}
        </g>
      </motion.g>
    </g>
  );
}

export function VersatileTechEcosystem() {
  const [interactionRingId, setInteractionRingId] = useState<number | null>(
    null
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearBlurTimer = useCallback(() => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
      blurTimer.current = null;
    }
  }, []);

  const scheduleBlurCheck = useCallback(() => {
    clearBlurTimer();
    blurTimer.current = setTimeout(() => {
      const root = tabsRef.current;
      if (!root?.contains(document.activeElement)) {
        setInteractionRingId(null);
      }
    }, 0);
  }, [clearBlurTimer]);

  const ringVisual = useCallback(
    (ringId: number): RingVisual => {
      if (interactionRingId === null) return "blue-default";
      return interactionRingId === ringId ? "blue-spotlight" : "muted";
    },
    [interactionRingId]
  );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40 py-14 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.18) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative site-container">
        <div className="mb-10 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
          >
            Versatile{" "}
            <span className="text-[#0a59c2]">Tech Ecosystem</span> Supporting
            Every Digital Goal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            We use advanced tools and platforms to deliver reliable digital
            platforms.
          </motion.p>
        </div>

        <div className="grid min-h-[clamp(400px,54vmin,44rem)] items-stretch gap-4 sm:gap-5 lg:min-h-[clamp(480px,58vmin,52rem)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,1.05fr)] lg:gap-5 xl:min-h-[clamp(520px,60vmin,56rem)] xl:grid-cols-[minmax(420px,480px)_minmax(0,1fr)]">
          <div
            ref={tabsRef}
            className="flex h-full min-h-0 flex-col justify-center gap-2 lg:justify-center"
            onMouseLeave={() => {
              if (!tabsRef.current?.contains(document.activeElement)) {
                setInteractionRingId(null);
              }
            }}
          >
            {ECOSYSTEM_DATA.map((tab) => {
              const isHot = interactionRingId === tab.id;
              return (
                <motion.div
                  key={tab.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isHot}
                  onMouseEnter={() => setInteractionRingId(tab.id)}
                  onFocus={() => setInteractionRingId(tab.id)}
                  onBlur={scheduleBlurCheck}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setInteractionRingId(tab.id);
                    }
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 outline-none transition-[border-color,box-shadow,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-[#0a59c2]/35 focus-visible:ring-offset-2 ${
                    isHot
                      ? "border-[#0a59c2]/80 bg-white shadow-[0_0_0_1px_rgba(10,89,194,0.12),0_12px_40px_-12px_rgba(10,89,194,0.35)]"
                      : "border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/40 hover:border-[#0a59c2]/35 hover:shadow-md hover:shadow-blue-500/10"
                  }`}
                >
                  {isHot && (
                    <motion.div
                      layoutId="tabGlow"
                      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/8 via-cyan-400/6 to-transparent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <div className="relative z-10 min-w-0 flex-1 space-y-0.5 pr-3">
                    <h3
                      className={`text-[0.95rem] font-bold leading-snug tracking-tight transition-colors duration-200 md:text-base ${
                        isHot ? "text-[#0a59c2]" : "text-slate-800"
                      }`}
                    >
                      {tab.title}
                    </h3>
                    <p
                      className={`text-xs leading-snug transition-colors duration-200 md:text-[0.8125rem] ${
                        isHot ? "text-slate-600" : "text-slate-500"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                      isHot
                        ? "border-[#0a59c2] bg-[#0a59c2] text-white"
                        : "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#0a59c2]/40 group-hover:text-[#0a59c2]"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tall grid row + cq sizing: square = min(viewport slice, column box) — uniform scale, no ring stretch */}
          <div className="relative flex h-full min-h-0 w-full items-center justify-center px-0 sm:px-1 [container-type:size]">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative aspect-square h-[min(100cqh,100cqw,min(100%,56rem))] w-[min(100cqh,100cqw,min(100%,56rem))] max-h-full max-w-full shrink-0 [transform:translateZ(0)] max-md:h-[min(100%,min(92vw,78vmin))] max-md:w-[min(100%,min(92vw,78vmin))]"
            >
              <svg
                viewBox={`0 0 ${VB} ${VB}`}
                className="h-full w-full max-h-full drop-shadow-[0_16px_48px_rgba(10,89,194,0.12)] [transform:translateZ(0)]"
              >
                <defs>
                  <linearGradient
                    id="defaultRingStroke"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#075985" />
                    <stop offset="45%" stopColor="#0a59c2" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient
                    id="spotlightRingStroke"
                    gradientUnits="userSpaceOnUse"
                    x1="80"
                    y1="80"
                    x2="440"
                    y2="440"
                  >
                    <stop offset="0%" stopColor="#38bdf8">
                      <animate
                        attributeName="stop-color"
                        values="#38bdf8;#60a5fa;#38bdf8"
                        dur="2.8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#0a59c2">
                      <animate
                        attributeName="stop-color"
                        values="#0a59c2;#1d4ed8;#0a59c2"
                        dur="2.8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#2563eb">
                      <animate
                        attributeName="stop-color"
                        values="#2563eb;#0ea5e9;#2563eb"
                        dur="2.8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <animate
                      attributeName="x1"
                      values="80;120;80"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y1"
                      values="80;60;80"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                  <radialGradient id="spotlightGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0a59c2" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g style={{ transformOrigin: `${CX}px ${CY}px` }}>
                  {RING_CONFIG.map((ring) => (
                    <TechRing
                      key={ring.id}
                      config={ring}
                      items={
                        ECOSYSTEM_DATA.find((d) => d.id === ring.id)?.items ?? []
                      }
                      visual={ringVisual(ring.id)}
                    />
                  ))}
                </g>

                {SEPARATOR_RS.map((r, i) => (
                  <circle
                    key={i}
                    cx={CX}
                    cy={CY}
                    r={r}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={1.75}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                <circle
                  cx={CX}
                  cy={CY}
                  r={HUB_R}
                  fill="#0a59c2"
                  stroke="#ffffff"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />

                <g
                  transform={`translate(${CX - 20}, ${CY - 20})`}
                  className="pointer-events-none"
                >
                  <path
                    d="M10 5L5 10V25L10 30H30L35 25V10L30 5H10Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M14 15L20 21L26 15"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 24L20 30L26 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
