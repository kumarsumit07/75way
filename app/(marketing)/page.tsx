"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { 
  BrainCircuit, 
  Blocks, 
  Code2, 
  Globe2, 
  Database,
  Cpu,
  LineChart,
  Layers,
  Smartphone,
  ShieldCheck,
  Zap,
  Bot,
  ArrowRight,
  Cloud,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
// import { HeroRobotOrbit } from "@/components/HeroRobotOrbit";
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


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const smoothEase = [0.42, 0, 0.58, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const sectionReveal = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
};


const agents = [
  "Lead Management",
  "Sales Management",
  "Opportunity Management",
  "Proposal Automation",
  "Pricing Intelligence",
  "Contract Compliance",
  "Customer Support",
  "Account Retention",
];

const cases = [
  ["AI Solutions", "AI-enabled platform for turning customer interactions into testimonials.", "+35%", "Deal Conversions"],
  ["Blockchain", "DeFi web app for secure lending and real-world credit workflows.", "+60%", "Smoother Operations"],
  ["IoT Solutions", "IoT app to control training hardware and automate sports sessions.", "1200+", "Completed Sessions"],
  ["Healthcare", "Unified healthcare web and app system for better patient engagement.", "+62%", "Workflow Optimization"],
];

const tech = [
  "Artificial Intelligence",
  "Generative AI",
  "Machine Learning",
  "Blockchain",
  "Internet of Things",
  "Data Science",
  "Business Intelligence",
];

const marketShowcaseImages: ShowcaseImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2400&q=88",
    alt: "Neural network visualization representing artificial intelligence",
    title: "Artificial Intelligence",
    description: "Create AI & ML-powered apps and intelligent software experiences.",
  },
  {
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2400&q=88",
    alt: "Blockchain technology and digital finance concept",
    title: "Blockchain Development",
    description: "Build secure on-chain products, wallets, and decentralized workflows.",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=88",
    alt: "Connected devices and IoT technology",
    title: "IoT Development",
    description: "Connect devices to deliver smarter IoT solutions at scale.",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=88",
    alt: "Web analytics dashboard on a laptop",
    title: "Web App Development",
    description: "Develop future-ready web apps with crisp UX and performance.",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2400&q=88",
    alt: "Software development and programming code",
    title: "Custom Software",
    description: "Engineer reliable platforms tailored to your operations.",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=88",
    alt: "Data visualization charts and analytics",
    title: "Data Science",
    description: "Turn complex data into models, dashboards, and decisions.",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2400&q=88",
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
    <main className="relative min-h-screen bg-page text-(--color-text) selection:bg-[rgba(10,89,194,0.16)] selection:text-(--color-surface)">
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
        className="relative mx-auto grid max-w-7xl min-h-0 items-center gap-12 px-5 py-16 sm:gap-14 sm:py-20 lg:min-h-[min(100dvh,56rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.88fr)] lg:items-center lg:gap-x-12 lg:gap-y-10 lg:px-8 lg:py-24 xl:min-h-[min(92dvh,60rem)] xl:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] xl:gap-x-16"
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
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(0,17,141,0.18)] bg-surface px-4 py-2.5 text-sm font-semibold text-primary-strong shadow-sm shadow-[rgba(10,89,194,0.15)] transition hover:bg-[#ecf2ff] sm:text-[0.9375rem]"
            >
              <Bot className="h-4 w-4 shrink-0" /> Meet the AI Agent Store
            </Link>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-[2.35rem] font-black leading-[1.02] tracking-tight text-(--color-text) sm:text-5xl sm:leading-[0.99] md:text-6xl lg:text-[clamp(2.75rem,4.2vw,4.5rem)] lg:leading-[0.98] xl:text-[clamp(3.25rem,4.6vw,5rem)]"
          >
            Next-Gen Custom <span className="bg-gradient-to-r from-primary-strong via-primary to-[#5c9dff] bg-clip-text text-transparent">AI & Tech Solutions</span> for Startups, SMEs & Enterprises.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:mt-9 sm:max-w-2xl sm:text-lg sm:leading-8 md:text-xl md:leading-9"
          >
            Build AI products, agentic workflows, blockchain ecosystems, IoT platforms, CRM automation, and high-performing apps with a future-ready engineering partner.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
            <a
              href="#contact"
              className="group inline-flex min-h-[3.25rem] items-center justify-center rounded-full px-8 py-4 text-center text-base font-bold text-surface shadow-lg shadow-[rgba(10,89,194,0.25)] transition hover:opacity-95 sm:min-h-0 sm:px-9 sm:py-4 sm:text-[1.05rem] bg-button-primary"
            >
              Discuss Your Goals <ArrowRight className="ml-2 inline h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#case-studies"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-[rgba(0,17,141,0.18)] bg-surface px-8 py-4 text-center text-base font-semibold text-primary-strong transition hover:bg-[#ecf2ff] sm:min-h-0 sm:px-9 sm:py-4 sm:text-[1.05rem]"
            >
              View Case Studies
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto flex h-[min(420px,78vw)] w-full max-w-[min(100%,28rem)] items-center justify-center sm:h-[min(480px,70vw)] sm:max-w-xl lg:mx-0 lg:h-[min(560px,58vh)] lg:max-w-none xl:h-[min(620px,62vh)]"
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

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
        className="border-y border-[rgba(10,89,194,0.14)] bg-surface py-20"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">Tech Ecosystem</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black text-(--color-text) md:text-5xl">Next-Level Technologies That Drive Real Business Impact</h2>
            </div>
            <a href="#contact" className="rounded-full border border-[rgba(10,89,194,0.3)] bg-[rgba(10,89,194,0.08)] px-6 py-3 font-bold text-primary-strong transition hover:bg-[rgba(10,89,194,0.12)]">
              Discuss Project Now
            </a>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tech.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.06 }} whileHover={{ y: -8, scale: 1.02 }} className="rounded-[2rem] border border-[rgba(10,89,194,0.14)] bg-gradient-to-b from-surface to-[rgba(10,89,194,0.04)] p-6 shadow-sm">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(10,89,194,0.08)] text-primary"><Zap /></div>
                <h3 className="text-2xl font-black text-(--color-text)">{item}</h3>
                <p className="mt-4 text-muted">Strategic implementation, scalable architecture, clean UX, and production-ready delivery.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <motion.div whileHover={{ scale: 1.01 }} className="relative overflow-hidden rounded-[3rem] border border-[rgba(10,89,194,0.3)] bg-gradient-to-br from-primary via-primary-strong to-[rgba(10,89,194,0.8)] p-8 text-surface shadow-[0_24px_80px_rgba(10,89,194,0.35)] md:p-14">
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: [0, -26, 0], y: [0, 20, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: smoothEase }}
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[rgba(255,255,255,0.25)] blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[rgba(255,255,255,0.9)]">Launch With Confidence</p>
              <h2 className="mt-4 text-4xl font-black md:text-6xl">Ready to engineer your next digital product?</h2>
              <p className="mt-5 max-w-2xl text-lg text-[rgba(255,255,255,0.8)]">Share your goals, choose the right engagement model, and move from idea to execution with a dedicated product engineering team.</p>
            </div>
            <form className="grid gap-4 rounded-[2rem] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.95)] p-5 text-(--color-text) shadow-xl backdrop-blur-xl">
              <input className="rounded-2xl border border-[rgba(10,89,194,0.14)] bg-surface px-5 py-4 outline-none ring-[rgba(10,89,194,0.2)] focus:ring-2" placeholder="Your name" />
              <input className="rounded-2xl border border-[rgba(10,89,194,0.14)] bg-surface px-5 py-4 outline-none ring-[rgba(10,89,194,0.2)] focus:ring-2" placeholder="Email address" />
              <textarea className="min-h-28 rounded-2xl border border-[rgba(10,89,194,0.14)] bg-surface px-5 py-4 outline-none ring-[rgba(10,89,194,0.2)] focus:ring-2" placeholder="Tell us about your project" />
              <button type="button" className="rounded-2xl bg-primary px-6 py-4 font-black text-surface transition hover:bg-primary-strong">
                Submit Request
              </button>
            </form>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight text-(--color-text) md:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">{text}</p>
      </motion.div>
    </section>
  );
}

