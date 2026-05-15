"use client";

import OptimizedImage from "../OptimizedImage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_AGENT_STORE_CATEGORIES } from "./data";
import type {
  AgentCategory,
  AgentSubmenuItem,
  AiAgentStoreSectionProps,
} from "./types";

const tabSpring = { type: "spring" as const, stiffness: 400, damping: 34 };

function TopTabs({
  categories,
  activeIndex,
  onSelect,
}: {
  categories: AgentCategory[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative border-b border-slate-200/90 bg-slate-50/80">
      <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain [scrollbar-color:rgba(10,89,194,0.35)_transparent] md:grid md:snap-none md:grid-cols-9 md:overflow-visible md:divide-x md:divide-slate-200/70" role="tablist" aria-label="Business domains">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const active = i === activeIndex;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(i)}
              className={`group relative flex min-w-[max-content] snap-start items-center justify-center gap-2 px-2 py-3.5 text-xs font-semibold transition-colors sm:text-sm md:min-w-0 md:px-2 md:py-4 lg:px-3 ${
                active
                  ? "text-white"
                  : "text-slate-700 hover:bg-white/60 hover:text-[#0a59c2]"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="agent-store-top-tab"
                  className="absolute inset-x-1 top-1 bottom-1 rounded-t-xl bg-[#0a59c2] shadow-[0_0_0_1px_rgba(10,89,194,0.35),0_8px_28px_-6px_rgba(10,89,194,0.45)]"
                  transition={tabSpring}
                  style={{ zIndex: 0 }}
                />
              ) : null}
              <Icon
                className={`relative z-[1] h-4 w-4 shrink-0 md:h-[18px] md:w-[18px] ${
                  active ? "text-white" : "text-slate-500 group-hover:text-[#0a59c2]"
                }`}
                strokeWidth={2}
              />
              <span className="relative z-[1] max-w-[10rem] truncate sm:max-w-none">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SideTabs({
  items,
  activeIndex,
  onHover,
  onSelect,
}: {
  items: AgentSubmenuItem[];
  activeIndex: number;
  onHover: (index: number) => void;
  onSelect: (index: number) => void;
}) {
  return (
    <nav
      className="flex flex-col border-b border-slate-200/80 bg-slate-100/70 lg:border-b-0 lg:border-r"
      aria-label="Agent capabilities"
    >
      <ul className="flex max-h-[min(52vh,520px)] flex-col gap-0 overflow-y-auto overscroll-contain py-1 lg:max-h-[min(60vh,560px)]">
        {items.map((item, i) => {
          const active = i === activeIndex;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`relative flex w-full items-start gap-2 border-l-[3px] py-2.5 pl-3 pr-2 text-left transition-colors md:py-3 md:pl-4 md:pr-3 ${
                  active
                    ? "border-[#0a59c2] bg-[rgba(10,89,194,0.08)] text-[#0a59c2] shadow-[inset_0_0_0_1px_rgba(10,89,194,0.12)]"
                    : "border-transparent text-slate-800 hover:bg-white/70 hover:border-slate-300/80"
                }`}
                onMouseEnter={() => onHover(i)}
                onFocus={() => onHover(i)}
                onClick={() => onSelect(i)}
              >
                <span
                  className={`block pr-2 text-[13px] leading-snug md:text-sm ${
                    active ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ImagePreviewPanel({
  item,
  categoryId,
  reduceMotion,
}: {
  item: AgentSubmenuItem;
  categoryId: string;
  reduceMotion: boolean | null;
}) {
  const k = `${categoryId}-${item.id}`;
  return (
    <div className="relative flex min-h-[260px] flex-1 items-center justify-center overflow-hidden bg-slate-900 px-4 py-8 md:min-h-[360px] md:px-8 md:py-10 lg:min-h-[420px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(56,189,248,0.15), transparent 55%)",
        }}
      />

      <div className="relative z-[1] w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={k}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.99 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -5, scale: 1 }
            }
            transition={{
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-800 shadow-2xl"
          >
            <div className="relative aspect-[16/10] w-full">
              <OptimizedImage
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              {/* Removed dark gradient overlay for better visibility */}
            </div>
            <div className="border-t border-white/10 bg-slate-900/90 px-4 py-3 backdrop-blur-md md:px-5 md:py-3.5">
              <p className="text-sm font-bold text-white md:text-base">
                {item.title}
              </p>
              {item.description ? (
                <p className="mt-1 text-xs leading-relaxed text-slate-300 md:text-sm">
                  {item.description}
                </p>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AiAgentStoreSection({
  eyebrow,
  title,
  titleAccent,
  subheading,
  categories: categoriesProp,
  className = "",
}: AiAgentStoreSectionProps) {
  const categories = categoriesProp ?? DEFAULT_AGENT_STORE_CATEGORIES;
  const reduceMotion = useReducedMotion();
  const [catIndex, setCatIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const activeCategory = categories[catIndex] ?? categories[0];
  const items = activeCategory?.items ?? [];

  useEffect(() => {
    setSubIndex(0);
  }, [catIndex]);

  const safeSub = Math.min(subIndex, Math.max(0, items.length - 1));
  const activeItem = items[safeSub] ?? items[0];

  const handleCategory = useCallback((i: number) => {
    setCatIndex(i);
  }, []);

  const handleSubHover = useCallback((i: number) => {
    setSubIndex(i);
  }, []);

  const handleSubSelect = useCallback((i: number) => {
    setSubIndex(i);
  }, []);

  const panelItem = useMemo(() => activeItem, [activeItem]);

  if (!activeCategory?.items?.length || !panelItem) return null;

  return (
    <section
      className={`relative py-16 md:py-20 lg:py-24 ${className}`}
      aria-labelledby="ai-agent-store-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,89,194,0.06),transparent_55%)]" />

      <div className="relative site-container">
        <header className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
          {eyebrow ? (
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 md:text-base">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id="ai-agent-store-heading"
            className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.2]"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-[#0a59c2] to-sky-500 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            {subheading}
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur-sm md:rounded-3xl"
        >
          <TopTabs
            categories={categories}
            activeIndex={catIndex}
            onSelect={handleCategory}
          />

          <motion.div
            key={activeCategory.id}
            initial={reduceMotion ? false : { opacity: 0.85 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]"
          >
            <SideTabs
              items={items}
              activeIndex={safeSub}
              onHover={handleSubHover}
              onSelect={handleSubSelect}
            />
            <ImagePreviewPanel
              item={panelItem}
              categoryId={activeCategory.id}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
