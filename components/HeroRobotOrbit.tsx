"use client";

import { motion } from "framer-motion";

/** Tech labels orbiting the robot (clock-style). Swap for programming languages if you prefer. */
const ORBIT_LABELS = ["AI", "CRM", "IoT", "Web3", "Apps", "Cloud"] as const;

const orbitDuration = 36;
const robotTurnDuration = 48;
const ballSpinDuration = 10;

type Props = {
  reduceMotion: boolean | null;
};

export function HeroRobotOrbit({ reduceMotion }: Props) {
  const reduce = Boolean(reduceMotion);

  return (
    <div
      className="relative mx-auto flex min-h-[420px] w-full max-w-[min(100%,440px)] items-center justify-center sm:min-h-[480px]"
      style={{ perspective: "900px" }}
    >
      {/* soft floor glow */}
      <div className="pointer-events-none absolute inset-x-6 bottom-8 h-24 rounded-[100%] bg-gradient-to-t from-blue-200/35 via-blue-100/15 to-transparent blur-md" />

      {/* clock-style orbit ring */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[52%] h-[min(78vw,320px)] w-[min(78vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-200/70 bg-blue-50/20 sm:h-[340px] sm:w-[340px]"
        animate={reduce ? undefined : { opacity: [0.55, 0.95, 0.55] }}
        transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* orbiting labeled spheres — parent rotation = clock hands */}
      <motion.div
        className="absolute left-1/2 top-[52%] h-[min(78vw,320px)] w-[min(78vw,320px)] -translate-x-1/2 -translate-y-1/2 sm:h-[340px] sm:w-[340px]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: orbitDuration, repeat: Infinity, ease: "linear" }}
      >
        {ORBIT_LABELS.map((label, i) => {
          const n = ORBIT_LABELS.length;
          const angle = (360 / n) * i;
          const alt = i % 2 === 0;
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{
                transform: `rotate(${angle}deg) translateY(calc(-1 * clamp(118px, 36vw, 172px)))`,
              }}
            >
              {/* counter-rotate so text stays upright while orbiting */}
              <motion.div
                className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={reduce ? undefined : { duration: orbitDuration, repeat: Infinity, ease: "linear" }}
              >
                {/* sphere self-spin */}
                <motion.div
                  animate={reduce ? undefined : { rotateZ: 360 }}
                  transition={reduce ? undefined : { duration: ballSpinDuration, repeat: Infinity, ease: "linear" }}
                  className={
                    alt
                      ? "flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-blue-200 bg-white text-[0.7rem] font-black tracking-wide text-blue-700 shadow-[0_8px_24px_rgba(37,99,235,0.18)] sm:h-[58px] sm:w-[58px] sm:text-xs"
                      : "flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-blue-700 bg-blue-600 text-[0.7rem] font-black tracking-wide text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] sm:h-[58px] sm:w-[58px] sm:text-xs"
                  }
                  style={{
                    boxShadow: alt
                      ? "inset 0 -6px 12px rgba(37,99,235,0.08), 0 8px 24px rgba(37,99,235,0.12)"
                      : "inset 0 -8px 16px rgba(15,23,42,0.2), 0 8px 24px rgba(37,99,235,0.35)",
                  }}
                >
                  {label}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* robot — slow body turn (like reference rotating in place) */}
      <motion.div
        className="relative z-10 w-[46%] max-w-[200px] translate-y-4 sm:max-w-[220px] sm:translate-y-6"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { rotateY: [0, 360] }}
        transition={reduce ? undefined : { duration: robotTurnDuration, repeat: Infinity, ease: "linear" }}
      >
        <RobotSvg />
      </motion.div>
    </div>
  );
}

function RobotSvg() {
  return (
    <svg viewBox="0 0 200 280" className="w-full drop-shadow-[0_20px_40px_rgba(37,99,235,0.2)]" aria-hidden>
      <defs>
        <linearGradient id="robotMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="robotHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* subtle aura */}
      <ellipse cx="100" cy="255" rx="72" ry="14" fill="url(#robotMetal)" opacity="0.12" />
      {/* legs */}
      <path
        d="M78 200 L78 248 Q78 258 88 258 L92 258 Q102 258 102 248 L102 200"
        fill="url(#robotMetal)"
        stroke="#1e3a8a"
        strokeWidth="1.2"
      />
      <path
        d="M98 200 L98 248 Q98 258 108 258 L112 258 Q122 258 122 248 L122 200"
        fill="url(#robotMetal)"
        stroke="#1e3a8a"
        strokeWidth="1.2"
      />
      {/* torso */}
      <path
        d="M64 118 Q60 200 100 210 Q140 200 136 118 Q138 88 100 82 Q62 88 64 118"
        fill="url(#robotMetal)"
        stroke="#1e3a8a"
        strokeWidth="1.5"
      />
      <path d="M64 118 Q100 128 136 118" fill="none" stroke="#3b82f6" strokeOpacity="0.35" strokeWidth="2" />
      {/* shoulders */}
      <circle cx="58" cy="112" r="14" fill="url(#robotMetal)" stroke="#1e3a8a" strokeWidth="1.2" />
      <circle cx="142" cy="112" r="14" fill="url(#robotMetal)" stroke="#1e3a8a" strokeWidth="1.2" />
      {/* arms — “hands” zone where orbit reads visually */}
      <path
        d="M48 118 L32 168 Q28 182 40 188 L48 184"
        fill="url(#robotMetal)"
        stroke="#1e3a8a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M152 118 L168 168 Q172 182 160 188 L152 184"
        fill="url(#robotMetal)"
        stroke="#1e3a8a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* hands open (reference pose) */}
      <ellipse cx="34" cy="192" rx="10" ry="8" fill="#1e40af" stroke="#60a5fa" strokeWidth="1" opacity="0.95" />
      <ellipse cx="166" cy="192" rx="10" ry="8" fill="#1e40af" stroke="#60a5fa" strokeWidth="1" opacity="0.95" />
      {/* neck */}
      <rect x="88" y="74" width="24" height="16" rx="6" fill="url(#robotMetal)" stroke="#1e3a8a" strokeWidth="1" />
      {/* head */}
      <ellipse cx="100" cy="52" rx="38" ry="44" fill="url(#robotMetal)" stroke="#1e3a8a" strokeWidth="1.5" />
      <ellipse cx="100" cy="52" rx="38" ry="44" fill="url(#robotHighlight)" />
      {/* eyes */}
      <ellipse cx="86" cy="48" rx="8" ry="5" fill="url(#eyeGlow)" />
      <ellipse cx="114" cy="48" rx="8" ry="5" fill="url(#eyeGlow)" />
      <ellipse cx="86" cy="48" rx="3" ry="2" fill="#bfdbfe" opacity="0.9" />
      <ellipse cx="114" cy="48" rx="3" ry="2" fill="#bfdbfe" opacity="0.9" />
      {/* highlight strip */}
      <path d="M72 36 Q100 22 128 36" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
