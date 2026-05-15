"use client";

import Link from "next/link";
import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const PARTNER_LOGOS = [
  "StreetSmart",
  "ADAMX",
  "Katha",
  "OverTV",
  "Cliqk",
  "Unusual Flow",
  "cSigma",
  "Confirmed",
  "FANBUCS",
] as const;

type MapPinConfig = {
  id: string;
  label: string;
  left: string;
  top: string;
};

const MAP_PINS: MapPinConfig[] = [
  { id: "ca", label: "Canada", left: "22%", top: "32%" },
  { id: "us", label: "USA", left: "30%", top: "44%" },
  { id: "eu", label: "Europe", left: "49%", top: "36%" },
  { id: "mena", label: "MENA", left: "54%", top: "48%" },
  { id: "ru", label: "Russia", left: "66%", top: "32%" },
  { id: "au", label: "Australia", left: "78%", top: "64%" },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as const },
  },
};

function GlobeMapSvg({ clipId }: { clipId: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="500" cy="305" rx="465" ry="248" />
        </clipPath>
        <linearGradient id={`${clipId}-ocean`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f0f4fb" />
          <stop offset="100%" stopColor="#e2eaf5" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect width="1000" height="500" fill={`url(#${clipId}-ocean)`} />

        {/* Continents — light grey base (reference 2) */}
        <g fill="#c8d2e0" opacity={0.92}>
          <path d="M55,135 L115,108 L195,118 L285,148 L308,198 L292,268 L215,285 L135,275 L78,228 L52,175 Z" />
          <path d="M218,278 L278,268 L298,318 L288,398 L258,418 L238,378 L222,318 Z" />
          <path d="M418,152 L498,142 L518,188 L498,228 L458,228 L432,198 Z" />
          <path d="M438,218 L518,208 L538,278 L518,388 L478,398 L432,348 L422,278 Z" />
          <path d="M518,118 L748,98 L788,188 L738,268 L618,248 L528,188 Z" />
          <path d="M758,318 L858,308 L882,358 L848,402 L788,398 L762,358 Z" />
        </g>

        {/* Highlighted regions — stronger blue (was red in ref) */}
        <g fill="var(--color-primary)" opacity={0.82}>
          <path d="M88,125 L268,128 L288,205 L228,252 L128,248 L78,188 Z" />
          <path d="M432,158 L512,150 L508,218 L458,222 L428,198 Z" />
          <path d="M478,228 L548,222 L562,288 L498,298 L472,268 Z" />
          <path d="M528,108 L752,102 L728,188 L588,208 L528,168 Z" />
          <path d="M768,322 L868,315 L872,368 L808,388 L772,358 Z" />
        </g>

        {/* Radar / latitude rings (reference) */}
        <g fill="none" stroke="rgba(10,89,194,0.14)" strokeWidth="1">
          {[0.22, 0.34, 0.46, 0.58, 0.7].map((t, i) => (
            <ellipse key={i} cx="500" cy={305} rx={320 + i * 52} ry={165 + i * 34} />
          ))}
        </g>
      </g>
    </svg>
  );
}

function RegionPin({
  pin,
  index,
  reduceMotion,
}: {
  pin: MapPinConfig;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5"
      style={{ left: pin.left, top: pin.top }}
      initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: reduceMotion ? 0 : 0.08 + index * 0.05,
        type: "spring",
        stiffness: 400,
        damping: 24,
      }}
    >
      <motion.div
        className="relative"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 2.4 + index * 0.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <MapPin
          className="relative z-10 h-11 w-11 drop-shadow-[0_4px_14px_rgba(10,89,194,0.45)] sm:h-12 sm:w-12"
          fill="var(--color-primary)"
          stroke="white"
          strokeWidth={2}
          aria-hidden
        />
        <span className="pointer-events-none absolute left-1/2 top-[38%] z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm sm:top-[36%] sm:h-2.5 sm:w-2.5" />
      </motion.div>
      <span className="mt-0.5 whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-[0.7rem]">
        {pin.label}
      </span>
    </motion.div>
  );
}

export function WorldwideLegacySection() {
  const reduceMotion = useReducedMotion();
  const clipId = useId().replace(/:/g, "");

  return (
    <section className="relative overflow-x-clip bg-[#050a1f] text-white">
      {/* Deep navy (blue theme instead of flag photo) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 70% 0%, rgba(10,89,194,0.2), transparent 55%), linear-gradient(180deg, #050a1f 0%, #070f24 40%, #040814 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_30%,rgba(10,89,194,0.12),transparent)]" />

      <div className="relative z-10 site-container pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          variants={container}
          className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16"
        >
          <motion.div variants={itemFade} className="max-w-xl">
            <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.4rem]">
              Our Worldwide Legacy
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Our global footprint helps startups, SMEs, and enterprises access our specialized talent and modern IT
              solutions anywhere they operate.
            </p>
            <motion.div
              className="mt-9 inline-block"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-(--color-text) shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition hover:bg-[#f0f5ff] sm:py-4 sm:text-[0.9375rem]"
              >
                Book Strategy Call
                <ArrowRight className="h-4 w-4 shrink-0 sm:h-[1.05rem] sm:w-[1.05rem]" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column: large “USA” behind grid (2nd reference) */}
          <motion.div variants={itemFade} className="relative flex min-h-[240px] items-center lg:min-h-[280px]">
            <p
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none text-[clamp(5.5rem,28vw,16rem)] font-black leading-none tracking-tighter text-white/[0.07] lg:justify-end lg:pr-4"
              aria-hidden
            >
              USA
            </p>
            <div className="relative z-10 grid w-full grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-9 lg:gap-x-8 lg:gap-y-10">
              {PARTNER_LOGOS.map((name) => (
                <motion.div
                  key={name}
                  className="flex min-h-[2.75rem] items-center justify-center border-b border-white/[0.1] pb-2 text-center transition hover:border-white/20 hover:text-white sm:min-h-[3rem] sm:pb-2.5"
                  whileHover={reduceMotion ? undefined : { opacity: 0.92, y: -2 }}
                >
                  <span className="text-[0.58rem] font-bold uppercase leading-snug tracking-[0.14em] text-white sm:text-[0.65rem] md:text-[0.72rem]">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Organic wave → light section (reference) */}
      <div className="relative z-20 -mt-12 w-full sm:-mt-16 lg:-mt-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="relative z-10 block h-14 w-full text-white sm:h-20 lg:h-24"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,100V78C180,42 360,18 540,28C720,38 900,62 1080,68C1260,74 1380,70 1440,64V100H0Z"
          />
        </svg>

        <div className="relative -mt-px bg-white pb-12 pt-1 sm:pb-16 sm:pt-2 lg:pb-20 lg:pt-4">
          <div className="site-container">
            <div
              className="relative mx-auto overflow-hidden rounded-[1.75rem] border border-[rgba(10,89,194,0.1)] bg-white/70 shadow-[0_24px_80px_rgba(10,89,194,0.12)] backdrop-blur-md sm:rounded-[2rem] lg:rounded-[2.25rem]"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative min-h-[260px] w-full overflow-hidden sm:min-h-[320px] lg:min-h-[380px]"
                style={{
                  transform: "rotateX(5deg) scale(1.02) translateZ(0)",
                  transformOrigin: "50% 0%",
                  transformStyle: "preserve-3d",
                }}
              >
                <GlobeMapSvg clipId={clipId} />

                <p
                  className="pointer-events-none absolute left-1/2 top-[22%] z-[1] -translate-x-1/2 select-none text-[clamp(3.5rem,22vw,11rem)] font-black leading-none tracking-tighter text-[rgba(10,89,194,0.08)]"
                  aria-hidden
                >
                  USA
                </p>

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_15%,rgba(255,255,255,0.65),transparent_60%)]" />

                {MAP_PINS.map((pin, i) => (
                  <RegionPin key={pin.id} pin={pin} index={i} reduceMotion={!!reduceMotion} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
