"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import Robot from "@/components/Robot";
import { TrustedByBar } from "@/components/TrustedByBar";
import { EngineeringSuccessSection } from "@/components/EngineeringSuccessSection";
import {
  ExpandableImageShowcase,
  type ShowcaseImageItem,
} from "@/components/ExpandableImageShowcase";
import { AiAgentStoreSection } from "@/components/ai-agent-store";
import { SolutionsScrollSection } from "@/components/SolutionsScrollSection";
import { VersatileTechEcosystem } from "@/components/VersatileTechEcosystem";
import { StickyScrollTabs } from "@/components/StickyScrollTabs";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { EngagementModels } from "@/components/EngagementModels";
import { AccoladesSlider } from "@/components/AccoladesSlider";
import { ClientStories } from "@/components/ClientStories";
import { TechStorytelling } from "@/components/TechStorytelling";
import { UnbeatableBenefitsSection } from "@/components/UnbeatableBenefitsSection";
import { PremiumFaqSection } from "@/components/PremiumFaqSection";
import { IgniteVisionContactSection } from "@/components/IgniteVisionContactSection";
import { ExpertInsightsSection } from "@/components/ExpertInsightsSection";
import { WorldwideLegacySection } from "@/components/WorldwideLegacySection";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const smoothEase = [0.42, 0, 0.58, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const marketShowcaseImages: ShowcaseImageItem[] = [
  {
    src: "/assets/images/unsplash-1677442136019-21780ecad995.webp",
    alt: "Neural network visualization representing artificial intelligence",
    title: "Artificial Intelligence",
    description: "Create AI & ML-powered apps and intelligent software experiences.",
  },
  {
    src: "/assets/images/unsplash-1639762681485-074b7f938ba0.webp",
    alt: "Blockchain technology and digital finance concept",
    title: "Blockchain Development",
    description: "Build secure on-chain products, wallets, and decentralized workflows.",
  },
  {
    src: "/assets/images/unsplash-1518770660439-4636190af475.webp",
    alt: "Connected devices and IoT technology",
    title: "IoT Development",
    description: "Connect devices to deliver smarter IoT solutions at scale.",
  },
  {
    src: "/assets/images/unsplash-1460925895917-afdab827c52f.webp",
    alt: "Web analytics dashboard on a laptop",
    title: "Web App Development",
    description: "Develop future-ready web apps with crisp UX and performance.",
  },
  {
    src: "/assets/images/unsplash-1555066931-4365d14bab8c.webp",
    alt: "Software development and programming code",
    title: "Custom Software",
    description: "Engineer reliable platforms tailored to your operations.",
  },
  {
    src: "/assets/images/unsplash-1551288049-bebda4e38f71.webp",
    alt: "Data visualization charts and analytics",
    title: "Data Science",
    description: "Turn complex data into models, dashboards, and decisions.",
  },
  {
    src: "/assets/images/unsplash-1576091160399-112ba8d25d1d.webp",
    alt: "Healthcare professional with digital medical interface",
    title: "Healthcare Analytics",
    description: "Adopt data-driven AI tools for medical decisions and operations.",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -26]);
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.32, 0.5, 0.24]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-page pb-8 text-(--color-text) selection:bg-[rgba(10,89,194,0.16)] selection:text-(--color-surface) sm:pb-10">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(10,89,194,0.14),transparent_44%),radial-gradient(circle_at_88%_6%,rgba(3,80,214,0.12),transparent_38%),linear-gradient(180deg,#fdfdff_0%,#f1f3f7_52%,#ffffff_100%)]" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(10,89,194,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,89,194,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: [0, 180, 0], y: [0, -120, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: smoothEase }}
          className="absolute -left-44 top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-[120px]"
        />
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: [0, -160, 0], y: [0, 120, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: smoothEase }}
          className="absolute -right-40 bottom-16 h-[22rem] w-[22rem] rounded-full bg-sky-300/25 blur-[120px]"
        />
      </div>

      <section
        ref={heroRef}
        className="relative site-container grid min-h-0 items-center gap-10 py-14 sm:gap-12 sm:py-16 lg:min-h-[min(100dvh,56rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.88fr)] lg:items-center lg:gap-x-12 lg:gap-y-10 lg:py-24 xl:min-h-[min(92dvh,60rem)] xl:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] xl:gap-x-16"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ y: heroTextY }}
          className="flex max-w-none flex-col lg:max-w-[min(100%,40rem)] xl:max-w-[44rem] xl:pr-2"
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/ai-agents"
              className="mb-7 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-[rgba(0,17,141,0.18)] bg-surface px-4 py-2.5 text-sm font-semibold text-primary-strong shadow-sm shadow-[rgba(10,89,194,0.15)] transition hover:bg-[#ecf2ff] sm:mb-8 sm:min-h-0 sm:px-5 sm:text-[0.9375rem]"
            >
              <Bot className="h-4 w-4 shrink-0" aria-hidden /> Meet the AI Agent Store
            </Link>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(1.875rem,5.5vw,2.35rem)] font-black leading-[1.05] tracking-tight text-(--color-text) sm:text-5xl sm:leading-[0.99] md:text-6xl lg:text-[clamp(2.75rem,4.2vw,4.5rem)] lg:leading-[0.98] xl:text-[clamp(3.25rem,4.6vw,5rem)]"
          >
            Next-Gen Custom{" "}
            <span className="bg-gradient-to-r from-primary-strong via-primary to-[#5c9dff] bg-clip-text text-transparent">
              AI & Tech Solutions
            </span>{" "}
            for Startups, SMEs & Enterprises.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:mt-8 sm:max-w-2xl sm:text-lg sm:leading-8 md:mt-9 md:text-xl md:leading-9"
          >
            Build AI products, agentic workflows, blockchain ecosystems, IoT platforms, CRM automation, and high-performing
            apps with a future-ready engineering partner.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex min-h-[3rem] items-center justify-center rounded-full px-7 py-3.5 text-center text-base font-bold text-surface shadow-lg shadow-[rgba(10,89,194,0.25)] transition hover:opacity-95 sm:min-h-[3.25rem] sm:px-9 sm:py-4 sm:text-[1.05rem] bg-button-primary"
            >
              Discuss Your Goals{" "}
              <ArrowRight className="ml-2 inline h-5 w-5 shrink-0 transition group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#case-studies"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[rgba(0,17,141,0.18)] bg-surface px-7 py-3.5 text-center text-base font-semibold text-primary-strong transition hover:bg-[#ecf2ff] sm:min-h-[3.25rem] sm:px-9 sm:py-4 sm:text-[1.05rem]"
            >
              View Case Studies
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto flex h-[min(380px,82vw)] w-full max-w-[min(100%,26rem)] items-center justify-center sm:h-[min(460px,72vw)] sm:max-w-xl lg:mx-0 lg:h-[min(560px,58vh)] lg:max-w-none xl:h-[min(620px,90vh)]"
        >
          <motion.div
            style={{ opacity: heroGlowOpacity }}
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
            transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: smoothEase }}
            className="absolute -left-6 -top-8 h-40 w-40 rounded-full bg-sky-300/25 blur-3xl"
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1.04, 0.98, 1.04], rotate: [0, 8, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: smoothEase }}
            className="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"
          />
          <div className="relative h-full w-full min-h-0">
            <Robot />
          </div>
        </motion.div>
      </section>

      <TrustedByBar />
      <EngineeringSuccessSection />
      <SolutionsScrollSection />
      <ExpandableImageShowcase
        heading="Elevating Global Markets with Future-Focused AI Tech Solutions"
        subheading="Explore how we combine intelligent systems, cloud-native delivery, and product craft across the domains that move modern enterprises forward."
        images={marketShowcaseImages}
      />
      <AiAgentStoreSection
        title="75AI Agent Store:"
        titleAccent="Intelligent AI Agents for Enterprise Transformation"
        subheading="Deploy AI-powered agents to optimize workflows, process data at scale, and automate operational decisions across sales, legal, finance, HR, and more—with governance built in."
      />
      <VersatileTechEcosystem />

      <StickyScrollTabs />

      <IndustrySolutions />
      <EngagementModels />
      <AccoladesSlider />
      <ClientStories />

      <TechStorytelling />

      <UnbeatableBenefitsSection />

      <WorldwideLegacySection />

      <ExpertInsightsSection />

      <PremiumFaqSection />

      <IgniteVisionContactSection />
    </main>
  );
}
