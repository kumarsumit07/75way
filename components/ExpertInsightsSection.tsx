"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type InsightCard = {
  id: string;
  overlay: string;
  title: string;
  author: string;
  /** CSS background for the image strip (blue-forward gradients). */
  imageGradient: string;
};

const INSIGHT_CARDS: InsightCard[] = [
  {
    id: "ai-dev-beginner",
    overlay: "WHAT IS AI DEVELOPMENT? COMPLETE BEGINNER GUIDE",
    title: "What is AI Development? Complete Beginner Guide",
    author: "by Salony Gupta",
    imageGradient:
      "linear-gradient(135deg, #001a5c 0%, #0a59c2 45%, #003484 100%), radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,255,255,0.18), transparent)",
  },
  {
    id: "ai-agents-usa",
    overlay: "HOW AI AGENTS AUTOMATE SALES, SUPPORT & OPERATIONS IN USA COMPANIES",
    title: "How AI Agents Automate Sales, Support & Operations in US Companies",
    author: "by Salony Gupta",
    imageGradient:
      "linear-gradient(145deg, #000f4a 0%, #0848cf 50%, #00118d 100%), radial-gradient(ellipse 70% 50% at 10% 80%, rgba(120,180,255,0.25), transparent)",
  },
  {
    id: "ai-scale-usa",
    overlay: "HOW AI DEVELOPMENT HELPS US COMPANIES SCALE FASTER COMPLETE GUIDE",
    title: "How AI Development Helps US Companies Scale Faster: A Complete Guide",
    author: "by Salony Gupta",
    imageGradient:
      "linear-gradient(125deg, #003484 0%, #0a59c2 40%, #000650 100%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2), transparent 55%)",
  },
];

const CARD_SPRING = { type: "spring" as const, stiffness: 420, damping: 32 };

export function ExpertInsightsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-x-clip site-section-y"
      style={{
        background:
          "linear-gradient(165deg, #000650 0%, #001bcf 38%, #0a59c2 72%, #001a5c 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_10%_-10%,rgba(255,255,255,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_100%,rgba(0,20,80,0.45),transparent)]" />

      <div className="relative site-container">
        <h2 className="max-w-4xl text-left text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
          Expert-led Insights Crafted for Digital-First Businesses
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-7 lg:mt-14 lg:grid-cols-3">
          {INSIGHT_CARDS.map((card, index) => (
            <motion.article
              key={card.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.08,
                duration: 0.45,
                ease: [0.33, 1, 0.68, 1],
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.015,
                      transition: CARD_SPRING,
                    }
              }
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm will-change-transform sm:rounded-[1.1rem] lg:rounded-[1.15rem]"
              style={{ transform: "translateZ(0)" }}
            >
              <Link href="/resources" className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#00145a]">
                <div
                  className="relative isolate min-h-[200px] overflow-hidden px-5 pb-14 pt-5 sm:min-h-[220px] sm:px-6 sm:pb-16 sm:pt-6"
                  style={{ backgroundImage: card.imageGradient, backgroundBlendMode: "normal, screen" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,10,50,0.75)_100%)]" />

                  <p className="relative z-10 text-right text-[0.65rem] font-black tracking-[0.2em] text-white/95 sm:text-xs">
                    75WAY
                  </p>

                  <p className="relative z-10 mt-6 text-[0.8125rem] font-black uppercase leading-snug tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:mt-8 sm:text-sm sm:leading-snug lg:text-[0.9375rem]">
                    {card.overlay}
                  </p>

                  <span className="absolute bottom-4 left-5 z-10 inline-flex rounded-md border border-white/25 bg-white px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-wider text-primary sm:left-6 sm:px-3 sm:text-[0.65rem]">
                    Artificial Intelligence
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 border-t border-white/10 bg-gradient-to-b from-[rgba(10,89,194,0.35)] to-[rgba(0,20,90,0.92)] px-5 py-6 sm:px-6 sm:py-7">
                  <h3 className="text-base font-bold leading-snug text-white sm:text-lg">{card.title}</h3>
                  <p className="text-sm font-medium text-white/70">{card.author}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12 lg:mt-14">
          <motion.div whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} transition={CARD_SPRING}>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-(--color-text) shadow-lg shadow-black/15 transition hover:bg-[#f0f5ff] sm:px-8 sm:py-4 sm:text-[0.9375rem]"
            >
              Read Full Article
              <ArrowRight className="h-4 w-4 shrink-0 sm:h-[1.05rem] sm:w-[1.05rem]" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
