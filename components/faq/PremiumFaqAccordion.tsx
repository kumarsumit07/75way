"use client";

import React, { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "./types";

const PANEL_SPRING = { type: "spring" as const, stiffness: 280, damping: 38, mass: 0.95 };
const ICON_TWEEN = { duration: 0.22, ease: [0.33, 1, 0.68, 1] as const };

export type PremiumFaqAccordionProps = {
  title?: React.ReactNode;
  items: readonly FaqItem[];
  className?: string;
};

function splitColumns(items: readonly FaqItem[]): [FaqItem[], FaqItem[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid) as FaqItem[], items.slice(mid) as FaqItem[]];
}

export function PremiumFaqAccordion({ title = "Frequently Asked Questions", items, className = "" }: PremiumFaqAccordionProps) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [leftCol, rightCol] = useMemo(() => splitColumns(items), [items]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`relative overflow-x-clip site-section-y ${className}`}
      style={{
        background: "linear-gradient(180deg, #f3f7ff 0%, #fafdff 45%, #ffffff 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(10,89,194,0.08),transparent)]" />

      <div className="relative site-container">
        <h2 className="text-center text-3xl font-black tracking-tight text-(--color-text) sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
          {title}
        </h2>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          <div className="flex flex-col gap-4 sm:gap-5">
            {leftCol.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={handleToggle}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {rightCol.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={handleToggle}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  reduceMotion,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
  reduceMotion: boolean;
}) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const headerId = `${baseId}-header`;

  const heightTransition = reduceMotion ? { duration: 0.2 } : PANEL_SPRING;
  const opacityTransition = reduceMotion ? { duration: 0.15 } : { duration: 0.35, ease: [0.33, 1, 0.68, 1] as const };

  return (
    <motion.article
      layout={false}
      className="overflow-hidden rounded-2xl border border-[rgba(10,89,194,0.12)] bg-white/85 shadow-[0_8px_32px_rgba(10,89,194,0.07)] backdrop-blur-[2px] transition-[box-shadow,border-color] duration-300 ease-out hover:border-[rgba(10,89,194,0.22)] hover:shadow-[0_12px_40px_rgba(10,89,194,0.1)] sm:rounded-[1.15rem] lg:rounded-[1.25rem]"
      style={{ transform: "translateZ(0)" }}
    >
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(item.id)}
        className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors sm:gap-5 sm:px-6 sm:py-5 lg:px-7 lg:py-6"
      >
        <span className="min-w-0 flex-1 text-[0.95rem] font-bold leading-snug text-(--color-text) sm:text-base lg:text-[1.05rem]">
          {item.question}
        </span>
        <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(10,89,194,0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#f0f5ff_100%)] text-primary shadow-sm transition hover:border-primary/35 hover:bg-[#ecf2ff] sm:h-10 sm:w-10">
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.span
                key="minus"
                role="presentation"
                initial={{ opacity: 0, rotate: -90, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.85 }}
                transition={ICON_TWEEN}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Minus className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={2.25} aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                role="presentation"
                initial={{ opacity: 0, rotate: 90, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.85 }}
                transition={ICON_TWEEN}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Plus className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={2.25} aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: heightTransition,
          opacity: opacityTransition,
        }}
        style={{ overflow: "hidden", willChange: isOpen ? "height, opacity" : "auto" }}
      >
        <div
          className="border-t border-[rgba(10,89,194,0.08)] px-5 pb-6 pt-1 text-[0.9rem] leading-relaxed text-muted sm:px-6 sm:pb-7 sm:text-[0.9375rem] sm:leading-[1.65] lg:px-7 lg:pb-8"
          aria-hidden={!isOpen}
        >
          {item.answer}
        </div>
      </motion.div>
    </motion.article>
  );
}
