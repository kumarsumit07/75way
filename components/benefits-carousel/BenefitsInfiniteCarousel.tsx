"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BenefitCardData } from "./types";
import { BENEFITS_CAROUSEL_CARD_COUNT } from "./types";

const BLUE = "#0a59c2";
const BLUE_DEEP = "#003484";
const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;
/** Premium horizontal glide — slow end, no “snap” feel (ease-out heavy). */
const TRACK_EASE = [0.22, 1, 0.36, 1] as const;

/** Horizontal step — long tween + smooth deceleration. */
const TRACK_DURATION_SEC = 0.98;
const TRACK_TWEEN = {
  type: "tween" as const,
  duration: TRACK_DURATION_SEC,
  ease: TRACK_EASE,
};
/** Card rise/settle — tween only; shadow handled by CSS to avoid expensive shadow interpolation. */
const CARD_FOCUS_TWEEN = { type: "tween" as const, duration: 0.58, ease: EASE_IN_OUT };
const CARD_FOCUS_MS = Math.ceil(CARD_FOCUS_TWEEN.duration * 1000) + 50;

/** Fixed column height: inactive visual baseline; active “growth” is transform-only above this line. */
const SLOT_H =
  "h-[clamp(10.75rem,29vw,12.75rem)] min-h-[clamp(10.75rem,29vw,12.75rem)] max-h-[clamp(10.75rem,29vw,12.75rem)]";

export type BenefitsInfiniteCarouselProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Must contain exactly six entries for the intended layout. */
  cards: readonly BenefitCardData[];
  /** Delay between automatic steps (ms). One card advances per interval. */
  autoPlayIntervalMs?: number;
  /** Used for reduced-motion vertical rise/settle (ease-in-out tween duration, seconds). */
  slideDurationSec?: number;
  className?: string;
  showNav?: boolean;
};

type Dims = { vw: number; cardW: number; slot: number };

function xForCenteredIndex(i: number, d: Dims): number {
  const raw = d.vw / 2 - d.cardW / 2 - i * d.slot;
  return Math.round(raw);
}

function useVisibleCount(): number {
  const [n, setN] = useState(6);
  useEffect(() => {
    const read = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1280;
      if (w < 640) setN(2);
      else if (w < 1024) setN(4);
      else setN(6);
    };
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);
  return n;
}

function useGapPx(): number {
  const [g, setG] = useState(24);
  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      if (w < 640) setG(14);
      else if (w < 1024) setG(20);
      else setG(28);
    };
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);
  return g;
}

/** Middle copy starts at index 6; forward loop uses 6…12 then snaps back to 6. */
const LOOP_START: number = BENEFITS_CAROUSEL_CARD_COUNT;

export function BenefitsInfiniteCarousel({
  title,
  subtitle,
  cards,
  autoPlayIntervalMs = 1880,
  slideDurationSec = 0.62,
  className = "",
  showNav = true,
}: BenefitsInfiniteCarouselProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const visibleCount = useVisibleCount();
  const gapPx = useGapPx();

  const items = useMemo(() => {
    if (cards.length !== BENEFITS_CAROUSEL_CARD_COUNT) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[BenefitsInfiniteCarousel] Expected ${BENEFITS_CAROUSEL_CARD_COUNT} cards, got ${cards.length}.`,
        );
      }
    }
    return cards.slice(0, BENEFITS_CAROUSEL_CARD_COUNT);
  }, [cards]);

  const triple = useMemo(() => [...items, ...items, ...items], [items]);

  const x = useMotionValue(0);
  const [dims, setDims] = useState<Dims>({ vw: 0, cardW: 0, slot: 0 });
  const dimsRef = useRef(dims);
  useLayoutEffect(() => {
    dimsRef.current = dims;
  }, [dims]);

  const [centeredIdx, setCenteredIdx] = useState<number>(LOOP_START);
  const centeredIdxRef = useRef<number>(LOOP_START);
  useLayoutEffect(() => {
    centeredIdxRef.current = centeredIdx;
  }, [centeredIdx]);

  const pausedRef = useRef(false);
  const animatingRef = useRef(false);

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = Math.max(0, rect.width);
    const g = gapPx;
    const vc = Math.min(BENEFITS_CAROUSEL_CARD_COUNT, Math.max(1, visibleCount));
    const cardW = vc > 0 ? (vw - g * (vc - 1)) / vc : vw;
    const slot = cardW + g;
    setDims({ vw, cardW, slot });
  }, [gapPx, visibleCount]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  /** Snap track to current index without motion (resize / init). */
  useLayoutEffect(() => {
    const d = dimsRef.current;
    if (d.vw <= 0 || d.slot <= 0) return;
    x.set(xForCenteredIndex(centeredIdxRef.current, d));
  }, [dims.vw, dims.slot, dims.cardW, x]);

  const goDir = useCallback(
    async (dir: -1 | 1) => {
      if (animatingRef.current || reduceMotion) return;
      const d = dimsRef.current;
      if (d.vw <= 0 || d.slot <= 0) return;

      const cur = centeredIdxRef.current;

      if (dir === -1 && cur === 0) {
        const target = BENEFITS_CAROUSEL_CARD_COUNT * 2 - 1;
        x.set(xForCenteredIndex(target, d));
        centeredIdxRef.current = target;
        setCenteredIdx(target);
        return;
      }

      animatingRef.current = true;
      let target = cur + dir;

      try {
        await animate(x, xForCenteredIndex(target, d), TRACK_TWEEN);

        if (target === BENEFITS_CAROUSEL_CARD_COUNT * 2) {
          x.set(xForCenteredIndex(LOOP_START, d));
          target = LOOP_START;
        }

        centeredIdxRef.current = target;
        setCenteredIdx(target);

        if (!reduceMotion) {
          await new Promise<void>((resolve) => {
            window.setTimeout(resolve, CARD_FOCUS_MS);
          });
        }
      } finally {
        animatingRef.current = false;
      }
    },
    [reduceMotion, x],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || animatingRef.current) return;
      void goDir(1);
    }, autoPlayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoPlayIntervalMs, goDir, reduceMotion]);

  const rowMinHeight =
    "min-h-[calc(clamp(10.75rem,29vw,12.75rem)+3.5rem)] sm:min-h-[calc(clamp(10.75rem,29vw,12.75rem)+3.75rem)]";

  return (
    <section
      className={`relative overflow-x-clip overflow-y-visible site-section-y ${className}`}
      style={{
        background:
          "linear-gradient(180deg, #f0f5ff 0%, #ffffff 52%, #fafdff 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(10,89,194,0.09),transparent)]" />

      <div className="relative site-container">
        <header className="max-w-3xl text-left">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </header>
      </div>

      <div
        className="site-container-wide relative mt-10 sm:mt-12 lg:mt-14"
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onPointerLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div className={`relative ${rowMinHeight} select-none`}>
          {showNav ? (
            <>
              <button
                type="button"
                aria-label="Previous benefit"
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#003484] to-[#0a59c2] text-white shadow-[0_10px_28px_rgba(10,89,194,0.35)] transition hover:brightness-110 active:scale-95 sm:h-11 sm:w-11 lg:left-1"
                onClick={() => void goDir(-1)}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Next benefit"
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#003484] to-[#0a59c2] text-white shadow-[0_10px_28px_rgba(10,89,194,0.35)] transition hover:brightness-110 active:scale-95 sm:h-11 sm:w-11 lg:right-1"
                onClick={() => void goDir(1)}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </>
          ) : null}

          <div
            ref={viewportRef}
            className="no-scrollbar relative h-full overflow-x-hidden overflow-y-visible px-6 pb-3 pt-10 sm:px-10 sm:pb-4 sm:pt-11 lg:px-12 lg:pt-12"
            style={{ touchAction: "pan-y" }}
          >
            {reduceMotion ? (
              <div
                className="no-scrollbar flex h-full items-end justify-start gap-3 overflow-x-auto sm:justify-center sm:gap-4 lg:gap-6"
                style={{ willChange: "auto" }}
              >
                {items.map((c, i) => (
                  <div
                    key={c.id}
                    className={`relative shrink-0 overflow-visible ${SLOT_H}`}
                    style={{
                      width: dims.cardW > 0 ? `${dims.cardW}px` : "min(42vw, 11rem)",
                      transform: "translate3d(0,0,0)",
                    }}
                  >
                    <BenefitCard
                      data={c}
                      isActive={i === 0}
                      motionDurationSec={slideDurationSec}
                      prefersReducedMotion={!!reduceMotion}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="flex h-full transform-gpu items-end"
                style={{
                  x,
                  gap: gapPx,
                  willChange: "transform",
                  transform: "translate3d(0,0,0)",
                }}
              >
                {triple.map((c, i) => (
                  <div
                    key={`${c.id}-${i}`}
                    className={`relative shrink-0 overflow-visible ${SLOT_H}`}
                    style={{
                      width: dims.cardW > 0 ? `${dims.cardW}px` : "min(42vw, 11rem)",
                      transform: "translate3d(0,0,0)",
                    }}
                  >
                    <BenefitCard
                      data={c}
                      isActive={i === centeredIdx}
                      motionDurationSec={slideDurationSec}
                      prefersReducedMotion={!!reduceMotion}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  data,
  isActive,
  motionDurationSec,
  prefersReducedMotion,
}: {
  data: BenefitCardData;
  isActive: boolean;
  motionDurationSec: number;
  prefersReducedMotion: boolean;
}) {
  const tween = { type: "tween" as const, duration: motionDurationSec, ease: EASE_IN_OUT };
  const transition = prefersReducedMotion ? tween : CARD_FOCUS_TWEEN;

  const cardBg =
    "linear-gradient(180deg, rgba(228,238,255,0.92) 0%, #ffffff 55%, #ffffff 100%)";

  return (
    <article className="relative h-full w-full overflow-visible">
      <motion.div
        layout={false}
        className={`absolute inset-0 box-border flex flex-col justify-between overflow-hidden rounded-[1.25rem] border border-[rgba(10,89,194,0.12)] transition-shadow duration-[580ms] ease-in-out sm:rounded-[1.45rem] lg:rounded-[1.65rem] ${
          isActive
            ? "z-[3] shadow-[0_28px_56px_rgba(10,89,194,0.22)] ring-1 ring-[rgba(10,89,194,0.16)]"
            : "z-0 shadow-[0_8px_22px_rgba(10,89,194,0.08)] ring-0 ring-transparent"
        }`}
        style={{
          transformOrigin: "50% 100%",
          backfaceVisibility: "hidden",
          background: cardBg,
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
        initial={false}
        animate={{
          y: isActive ? -24 : 0,
          scale: isActive ? 1.055 : 1,
          opacity: isActive ? 1 : 0.9,
        }}
        transition={transition}
      >
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-10 pt-7 text-center sm:px-4 sm:pb-11 sm:pt-8 lg:px-5 lg:pb-12 lg:pt-9">
          <span className="inline-block max-w-[95%] text-[clamp(0.92rem,2.35vw,1.2rem)] font-black leading-snug tracking-tight text-neutral-950">
            <span style={{ color: isActive ? BLUE_DEEP : BLUE }}>{data.titleLead}</span>
            <span className="text-neutral-900">{data.titleRest}</span>
          </span>
        </div>

        <p className="absolute inset-x-0 bottom-0 px-3 pb-3.5 text-center text-[0.72rem] font-semibold leading-snug text-neutral-900 sm:px-4 sm:pb-4 sm:text-xs lg:text-[0.8125rem]">
          {data.caption}
        </p>
      </motion.div>
    </article>
  );
}
