"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Ecosystem Data
 * Grouped into 4 rings from outermost (1) to innermost (4)
 */
const ECOSYSTEM_DATA = [
  {
    id: 1,
    title: "Software Development Services",
    description: "Build scalable apps, software, and website with innovative technologies.",
    items: ["Next.js", "PHP", "Machine Learning", "JavaScript", ".Net", "Swift", "Python", "Angular", "RoR", "React", "Node.js", "Flutter", "Hugging Face", "React Major", "OpenAI"]
  },
  {
    id: 2,
    title: "CRM Automation Tools",
    description: "We use versatile tools to craft CRMs and data analytics platforms.",
    items: ["Amazon Kinesis", "Apache Kafka Streams", "Microsoft Dynamics", "Salesforce", "Odoo", "Zoho", "Zendesk", "Azure Stream Analytics"]
  },
  {
    id: 3,
    title: "Databases / Data Storage",
    description: "Systems that securely store, manage, and organize data efficiently.",
    items: ["Hive", "Apache HBase", "Cassandra", "Docker", "PostgreSQL", "Microsoft SQL Server", "RabbitMQ", "MongoDB", "MySQL"]
  },
  {
    id: 4,
    title: "DevOps & Infrastructure",
    description: "Tools we utilized for deployment, automation, and cloud operations.",
    items: ["Google Cloud", "Kubernetes", "Azure DevOps", "AWS"]
  }
];

const RING_CONFIG = [
  { id: 1, radius: 212, width: 48 },
  { id: 2, radius: 164, width: 48 },
  { id: 3, radius: 116, width: 48 },
  { id: 4, radius: 68, width: 48 },
];

function getPositions(cx: number, cy: number, radius: number, items: string[]) {
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

const TechRing = ({ 
  cx, 
  cy, 
  config, 
  items, 
  isActive 
}: { 
  cx: number; 
  cy: number; 
  config: typeof RING_CONFIG[0]; 
  items: string[]; 
  isActive: boolean;
}) => {
  const positions = useMemo(() => getPositions(cx, cy, config.radius, items), [cx, cy, config.radius, items]);
  
  return (
    <g>
      {/* Ring Background */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={config.radius}
        fill={isActive ? "url(#activeRingGrad)" : "rgba(10, 89, 194, 0.08)"}
        stroke={isActive ? "#0a59c2" : "transparent"}
        strokeWidth={config.width}
        initial={false}
        animate={{ 
          fill: isActive ? "url(#activeRingGrad)" : "rgba(10, 89, 194, 0.08)",
          scale: isActive ? 1.01 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="transition-all"
      />
      
      {/* Active Glow */}
      <AnimatePresence>
        {isActive && (
          <motion.circle
            cx={cx}
            cy={cy}
            r={config.radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={config.width + 4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            style={{ filter: "blur(15px)" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Dividers */}
      {items.map((_, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const rIn = config.radius - config.width / 2;
        const rOut = config.radius + config.width / 2;
        return (
          <line
            key={i}
            x1={cx + rIn * Math.cos(angle)}
            y1={cy + rIn * Math.sin(angle)}
            x2={cx + rOut * Math.cos(angle)}
            y2={cy + rOut * Math.sin(angle)}
            stroke="#0a59c2"
            strokeWidth="0.75"
            strokeOpacity={isActive ? 0.4 : 0.1}
          />
        );
      })}

      {/* Labels */}
      {positions.map((pos, idx) => (
        <text
          key={idx}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isActive ? "#ffffff" : "#334155"}
          className="pointer-events-none select-none font-bold"
          style={{ 
            fontSize: items.length > 12 ? '7.5px' : '9px',
            textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
            transition: "fill 0.3s ease"
          }}
        >
          {pos.text}
        </text>
      ))}
    </g>
  );
};

export function VersatileTechEcosystem() {
  const [activeId, setActiveId] = useState(1);
  const vb = 520;
  const cx = vb / 2;
  const cy = vb / 2;

  // Concentric separator circles (white borders)
  const separators = [
    212 + 24, // Outer of ring 1
    212 - 24, // Inner of ring 1 / Outer of ring 2
    164 - 24, // Inner of ring 2 / Outer of ring 3
    116 - 24, // Inner of ring 3 / Outer of ring 4
    68 - 24   // Inner of ring 4
  ];

  return (
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        <div className="mb-16 lg:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl"
          >
            Versatile <span className="text-[#0a59c2]">Tech Ecosystem</span> Supporting Every Digital Goal
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl"
          >
            We use advanced tools and platforms to deliver reliable digital platforms.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[440px_1fr] lg:items-stretch lg:justify-between">
          
          {/* Left Side Tabs */}
          <div className="flex flex-col gap-3">
            {ECOSYSTEM_DATA.map((tab) => {
              const isActive = activeId === tab.id;
              return (
                <div
                  key={tab.id}
                  onMouseEnter={() => setActiveId(tab.id)}
                  onClick={() => setActiveId(tab.id)}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all duration-300 flex-1
                    ${isActive 
                      ? "border-[#0a59c2] bg-white shadow-xl shadow-blue-900/5" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                >
                  <div className="relative z-10 space-y-1 pr-4">
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? "text-[#0a59c2]" : "text-slate-800"}`}>
                      {tab.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-slate-600" : "text-slate-400"}`}>
                      {tab.description}
                    </p>
                  </div>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 
                    ${isActive ? "border-[#0a59c2] bg-[#0a59c2] text-white" : "border-slate-100 text-slate-300"}`}>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="tab-highlight"
                      className="absolute inset-0 rounded-2xl bg-blue-50/20 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Circle */}
          <div className="relative flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[580px] aspect-square"
            >
              <svg viewBox={`0 0 ${vb} ${vb}`} className="h-auto w-full drop-shadow-[0_20px_60px_rgba(10,89,194,0.1)]">
                <defs>
                  <linearGradient id="activeRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0a59c2" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                {/* Base Rings */}
                {RING_CONFIG.map((ring) => (
                  <TechRing
                    key={ring.id}
                    cx={cx}
                    cy={cy}
                    config={ring}
                    items={ECOSYSTEM_DATA.find(d => d.id === ring.id)?.items || []}
                    isActive={activeId === ring.id}
                  />
                ))}

                {/* Concentric White Separators */}
                {separators.map((r, i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeOpacity="1"
                  />
                ))}

                {/* Center Circle */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={46}
                  fill="#0a59c2"
                  initial={false}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Center Logo */}
                <g transform={`translate(${cx - 20}, ${cy - 20})`} className="pointer-events-none">
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
