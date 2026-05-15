"use client";

import OptimizedImage from "./OptimizedImage";
import React, { useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type ShowcaseImageItem = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

export type ExpandableImageShowcaseProps = {
  /** Row of images (typically 7). */
  images: ShowcaseImageItem[];
  /** Optional section heading. */
  heading?: string;
  /** Optional supporting line under the heading. */
  subheading?: string;
  className?: string;
};

const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 38,
  mass: 0.85,
};

const springSoft: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

function buildGridColumns(
  count: number,
  hovered: number | null,
  expandedRatio: number,
  compressedRatio: number
): string {
  if (count <= 0) return "";
  if (hovered === null) {
    return Array.from({ length: count }, () => "minmax(0,1fr)").join(" ");
  }
  return Array.from({ length: count }, (_, i) =>
    i === hovered
      ? `minmax(0,${expandedRatio}fr)`
      : `minmax(0,${compressedRatio}fr)`
  ).join(" ");
}

export function ExpandableImageShowcase({
  images,
  heading,
  subheading,
  className = "",
}: ExpandableImageShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridTemplateColumns = useMemo(() => {
    if (reduceMotion) {
      return buildGridColumns(images.length, null, 1, 1);
    }
    return buildGridColumns(images.length, hoveredIndex, 3.15, 0.62);
  }, [images.length, hoveredIndex, reduceMotion]);

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 lg:py-28 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(10,89,194,0.08),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(56,189,248,0.08),transparent_45%),linear-gradient(180deg,#fdfdff_0%,#f5f7fb_45%,#ffffff_100%)]"
        aria-hidden
      />

      <div className="relative site-container">
        {(heading || subheading) && (
          <header className="mb-8 max-w-4xl md:mb-10 lg:mb-12">
            {heading ? (
              <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-[2.4rem] lg:leading-[1.15]">
                {heading}
              </h2>
            ) : null}
            {subheading ? (
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                {subheading}
              </p>
            ) : null}
          </header>
        )}

        <div
          className="flex gap-2.5 overflow-x-auto overflow-y-visible pb-3 pt-1 [scrollbar-width:thin] snap-x snap-mandatory md:grid md:snap-none md:overflow-visible md:pb-0 md:pt-0 lg:gap-3"
          style={{
            transition: reduceMotion
              ? undefined
              : "grid-template-columns 0.55s cubic-bezier(0.32, 0.72, 0, 1)",
            gridTemplateColumns,
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {images.map((item, index) => {
            const isActive = hoveredIndex === index;
            const dimOthers =
              hoveredIndex !== null && !isActive && !reduceMotion;

            return (
                <motion.article
                  key={`${item.src}-${index}`}
                  className="group relative flex min-h-0 min-w-[78vw] shrink-0 snap-center flex-col rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-[#0a59c2]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:min-w-0 lg:rounded-[2.25rem]"
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setHoveredIndex(null);
                  }
                }}
                tabIndex={0}
                initial={false}
                animate={{
                  zIndex: isActive ? 20 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="relative flex min-h-[520px] flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-slate-100 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.18)] md:min-h-[600px] lg:min-h-[760px] lg:rounded-[2.25rem]"
                  initial={false}
                  animate={{
                    scale: reduceMotion ? 1 : isActive ? 1.018 : dimOthers ? 0.985 : 1,
                    opacity: dimOthers ? 0.78 : 1,
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(10,89,194,0.45), 0 24px 60px -12px rgba(10,89,194,0.35), 0 0 80px -20px rgba(56,189,248,0.25)"
                      : "0 12px 40px -16px rgba(15,23,42,0.18)",
                  }}
                  transition={isActive ? spring : springSoft}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/45 via-slate-950/5 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(10,89,194,0.08)] via-transparent to-[rgba(56,189,248,0.06)]" />

                  <motion.div
                    className="relative h-full min-h-[inherit] w-full flex-1 [transform:translateZ(0)]"
                    initial={false}
                    animate={{
                      scale:
                        reduceMotion || !isActive ? 1 : 1.02,
                      filter: reduceMotion
                        ? "brightness(1) contrast(1)"
                        : isActive
                          ? "brightness(1.04) contrast(1.03) saturate(1.04)"
                          : dimOthers
                            ? "brightness(0.94) contrast(0.98) saturate(0.98)"
                            : "brightness(1) contrast(1) saturate(1)",
                    }}
                    transition={springSoft}
                    style={{ transformOrigin: "center center" }}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      quality={92}
                      sizes="(max-width: 768px) 96vw, (max-width: 1024px) 48vw, (max-width: 1536px) 55vw, 900px"
                      className="object-cover"
                      priority={index < 4}
                    />
                  </motion.div>

                  {isActive ? (
                    <motion.div
                      className="pointer-events-none absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a59c2] text-white shadow-lg shadow-[rgba(10,89,194,0.4)] md:right-4 md:top-4"
                      initial={{ opacity: 0, scale: 0.85, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={spring}
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </motion.div>
                  ) : null}
                </motion.div>

                <div className="mt-2.5 min-h-[3.25rem] px-0.5 md:mt-3">
                  <motion.p
                    className={`truncate text-sm font-bold tracking-tight md:text-base ${
                      isActive ? "text-[#0a59c2]" : "text-slate-900"
                    }`}
                  >
                    {item.title ?? item.alt}
                  </motion.p>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive && item.description ? "auto" : 0,
                      opacity: isActive && item.description ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    {item.description ? (
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-500 md:text-sm">
                        {item.description}
                      </p>
                    ) : null}
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
