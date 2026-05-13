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
import { SolutionsScrollSection } from "@/components/SolutionsScrollSection";
import { VersatileTechEcosystem } from "@/components/VersatileTechEcosystem";

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

const industries = [
  "Healthcare",
  "Real Estate",
  "E-commerce",
  "Fintech",
  "Logistics",
  "Education",
  "Travel",
  "Entertainment",
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

      <section ref={heroRef} className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ y: heroTextY }}>
          <motion.div variants={fadeUp}>
            <Link
              href="/ai-agents"
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(0,17,141,0.18)] bg-surface px-4 py-2 text-sm font-semibold text-primary-strong shadow-sm shadow-[rgba(10,89,194,0.15)] transition hover:bg-[#ecf2ff]"
            >
              <Bot className="h-4 w-4" /> Meet the AI Agent Store
            </Link>
          </motion.div>
          <motion.h1 variants={fadeUp} className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-(--color-text) md:text-7xl">
            Next-Gen Custom <span className="bg-gradient-to-r from-primary-strong via-primary to-[#5c9dff] bg-clip-text text-transparent">AI & Tech Solutions</span> for Startups, SMEs & Enterprises.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            Build AI products, agentic workflows, blockchain ecosystems, IoT platforms, CRM automation, and high-performing apps with a future-ready engineering partner.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="group rounded-full px-7 py-4 text-center font-bold text-surface shadow-lg shadow-[rgba(10,89,194,0.25)] transition hover:opacity-95 bg-button-primary">
              Discuss Your Goals <ArrowRight className="ml-2 inline h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a href="#case-studies" className="rounded-full border border-[rgba(0,17,141,0.18)] bg-surface px-7 py-4 text-center font-semibold text-primary-strong transition hover:bg-[#ecf2ff]">
              View Case Studies
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative h-[560px]"
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
      <VersatileTechEcosystem />

      <motion.section
        id="ai-agents"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={sectionReveal}
        className="relative border-y border-[rgba(10,89,194,0.14)] bg-surface py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">BlueWay Agent Store</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-(--color-text) md:text-6xl">Intelligent AI Agents for Enterprise Transformation</h2>
            <p className="mt-6 text-lg leading-8 text-muted">Deploy AI-powered agents to handle workflows, support teams, process data, and automate operational decisions across business functions.</p>
            <Link className="mt-8 inline-flex rounded-full bg-button-primary px-7 py-4 font-bold text-surface shadow-lg shadow-[rgba(10,89,194,0.25)] transition hover:opacity-95" href="/ai-agents">
              Explore Agents
            </Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2">
            {agents.map((agent) => (
              <motion.div variants={cardReveal} whileHover={{ y: -6, scale: 1.02 }} key={agent} className="rounded-3xl border border-[rgba(10,89,194,0.14)] bg-surface p-5 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(10,89,194,0.08)] text-primary"><Bot /></div>
                <p className="font-bold text-(--color-text)">{agent}</p>
                <p className="mt-2 text-sm text-muted">Automation module for faster execution and fewer manual steps.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <SectionIntro eyebrow="Case Studies" title="Proof Through Practical Delivery" text="Selected project patterns showing measurable improvements across AI, Web3, IoT, and healthcare domains." />
      <motion.section
        id="case-studies"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
      >
        {cases.map(([cat, desc, metric, label]) => (
          <motion.article key={cat} variants={cardReveal} whileHover={{ y: -8, scale: 1.02, rotate: -1.2 }} className="group rounded-[2rem] border border-[rgba(10,89,194,0.14)] bg-surface p-6 shadow-md transition hover:border-[rgba(10,89,194,0.3)] hover:shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">{cat}</p>
            <p className="mt-8 min-h-24 text-muted">{desc}</p>
            <p className="mt-8 text-5xl font-black text-primary-strong">{metric}</p>
            <p className="mt-2 font-semibold text-primary-strong">{label}</p>
            <button type="button" className="mt-8 inline-flex items-center gap-2 font-bold text-primary-strong">
              View Case Study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </motion.article>
        ))}
      </motion.section>

      <motion.section
        id="industries"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        variants={sectionReveal}
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">Industries</p>
            <h2 className="mt-4 text-4xl font-black text-(--color-text) md:text-5xl">Tailored AI Solutions for High-Growth Markets</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((item) => (
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} whileHover={{ y: -8, scale: 1.03, rotate: 0.8 }} key={item} className="rounded-3xl border border-[rgba(10,89,194,0.14)] bg-surface p-5 shadow-sm">
                <ShieldCheck className="mb-8 h-8 w-8 text-primary" />
                <p className="font-bold text-(--color-text)">{item}</p>
                <p className="mt-2 text-sm text-muted">Smart apps, automation, analytics, and user-first digital experiences.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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

