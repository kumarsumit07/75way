"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
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
  Cloud
} from "lucide-react";

const SOLUTIONS = [
  {
    id: "ai-driven",
    tabTitle: "AI-Driven Apps",
    tabSubtitle: "Architect Smart Digital Products",
    icon: BrainCircuit,
    title: "Your Partner in AI Engineering",
    description: "Our creative professionals design and craft custom AI solutions and ML platforms using advanced AI models.",
    expertise: [
      { name: "AI Consulting", icon: BrainCircuit },
      { name: "AI Development", icon: Cpu },
      { name: "Generative AI", icon: Zap },
      { name: "AI Agent & Chatbot", icon: Bot },
      { name: "Machine Learning", icon: LineChart }
    ],
    suite: ["StreetSmart", "ADAMx"]
  },
  {
    id: "blockchain",
    tabTitle: "Blockchain Realm",
    tabSubtitle: "Architecting Web 3.0 World",
    icon: Blocks,
    title: "Pioneering Decentralized Web3 Ecosystems",
    description: "We create and deliver custom blockchain ecosystems that enhance security and drive digital transformation.",
    expertise: [
      { name: "Blockchain Dev", icon: Blocks },
      { name: "Consulting", icon: ShieldCheck },
      { name: "Smart Contracts", icon: Layers },
      { name: "NFT Dev", icon: Zap },
      { name: "DeFi Dev", icon: LineChart }
    ],
    suite: ["StreetSmart", "cSIGMA"]
  },
  {
    id: "tech-studio",
    tabTitle: "Exclusive Tech Studio",
    tabSubtitle: "Your On-Demand App Powerhouse",
    icon: Code2,
    title: "Architecting Smart Apps and Software",
    description: "Our app and software development services transform your ideas into high-performing digital solutions.",
    expertise: [
      { name: "Mobile App", icon: Smartphone },
      { name: "Hybrid App", icon: Smartphone },
      { name: "Consulting", icon: ShieldCheck },
      { name: "Software Dev", icon: Code2 },
      { name: "SAAS Dev", icon: Globe2 }
    ],
    suite: ["EverTV", "LEVA"]
  },
  {
    id: "iot-web",
    tabTitle: "IOT & Web Sphere",
    tabSubtitle: "Build Engaging User Interfaces",
    icon: Globe2,
    title: "Your Certified Partner For Web & IOT Excellence",
    description: "75way provides end-to-end website and UI/UX development solutions for higher ROI.",
    expertise: [
      { name: "IT Consulting", icon: ShieldCheck },
      { name: "IOT Development", icon: Cpu },
      { name: "MVP Development", icon: Zap },
      { name: "Website Dev", icon: Globe2 },
      { name: "UI/UX Design", icon: Layers }
    ],
    suite: ["Tageto", "StreetSmart"]
  },
  {
    id: "crm-bi",
    tabTitle: "Smart CRM & BI Solutions",
    tabSubtitle: "Next-Gen CRM & Data Analytics Hub",
    icon: Database,
    title: "Unified CRM & Data Intelligence Stack",
    description: "Our scalable CRM and AI-driven data analytics solutions turn raw data into strategic business intelligence.",
    expertise: [
      { name: "CRM Development", icon: Database },
      { name: "Salesforce", icon: Cloud },
      { name: "Dynamics 365", icon: Layers },
      { name: "Power BI", icon: LineChart },
      { name: "AI Analytics", icon: BrainCircuit }
    ],
    suite: ["Lotly", "StreetSmart"]
  }
];

export function SolutionsScrollSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [leftPanelHeight, setLeftPanelHeight] = useState(0);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll progress for the whole container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Extremely smooth spring for high-FPS transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    mass: 0.8
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segment = 1 / SOLUTIONS.length;
    const index = Math.min(Math.floor(latest / segment), SOLUTIONS.length - 1);
    if (index >= 0 && index !== activeTab) {
      setActiveTab(index);
    }
  });

  useEffect(() => {
    const updateHeight = () => {
      if (leftPanelRef.current) {
        setLeftPanelHeight(leftPanelRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="solutions" 
      className="relative mx-auto max-w-7xl px-5 py-32 lg:px-8"
    >
      <div className="mb-24 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold uppercase tracking-[0.35em] text-primary"
        >
          AI-Engineered Tech Solutions
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-4xl font-black tracking-tight text-(--color-text) md:text-6xl"
        >
          75way&apos;s AI-Engineered Tech Solutions<br />
          <span className="bg-gradient-to-r from-primary-strong via-primary to-[#5c9dff] bg-clip-text text-transparent">
            Fueling Global Visionary Excellence
          </span>
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        {/* Left Side: Pinned Navigation */}
        <div className="lg:w-[32%] lg:sticky lg:top-48 z-10">
          <div 
            ref={leftPanelRef}
            className="rounded-[3rem] border border-[rgba(10,89,194,0.1)] bg-white/90 p-5 shadow-[0_40px_100px_-20px_rgba(10,89,194,0.15)] backdrop-blur-2xl"
          >
            {SOLUTIONS.map((solution, index) => (
              <div 
                key={solution.id}
                className={`group relative mb-2 last:mb-0 cursor-pointer rounded-[1.5rem] p-5 transition-all duration-500 ${
                  activeTab === index 
                    ? "bg-primary text-surface shadow-2xl shadow-primary/20" 
                    : "hover:bg-[rgba(10,89,194,0.05)]"
                }`}
                onClick={() => {
                  const element = document.getElementById(`section-${solution.id}`);
                  if (element) {
                    const rect = element.getBoundingClientRect();
                    const absoluteTop = rect.top + window.scrollY;
                    window.scrollTo({
                      top: absoluteTop - (window.innerHeight / 2 - rect.height / 2),
                      behavior: "smooth"
                    });
                  }
                }}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
                    activeTab === index 
                      ? "bg-white/20 text-white" 
                      : "bg-[rgba(10,89,194,0.08)] text-primary"
                  }`}>
                    <solution.icon className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className={`text-sm font-black transition-colors duration-500 whitespace-nowrap ${
                      activeTab === index ? "text-white" : "text-primary-strong"
                    }`}>
                      {solution.tabTitle}
                    </p>
                    <p className={`mt-0.5 text-[11px] font-bold leading-none opacity-70 transition-colors duration-500 ${
                      activeTab === index ? "text-white" : "text-muted"
                    }`}>
                      {solution.tabSubtitle}
                    </p>
                  </div>
                </div>
                {activeTab === index && (
                  <motion.div 
                    layoutId="active-highlight-box"
                    className="absolute inset-0 rounded-[1.5rem] bg-primary -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Performance Transform Scroll */}
        <div className="lg:w-[68%]">
          {SOLUTIONS.map((solution, index) => (
            <TransformContentSection 
              key={solution.id}
              solution={solution}
              index={index}
              containerProgress={smoothProgress}
              height={leftPanelHeight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformContentSection({ solution, index, containerProgress, height }: { 
  solution: typeof SOLUTIONS[0], 
  index: number, 
  containerProgress: any,
  height: number
}) {
  const segmentSize = 1 / SOLUTIONS.length;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  const mid = (start + end) / 2;

  // Use translateY for a natural "floating" parallax effect
  // GPU-accelerated: translate3d is used by framer-motion automatically for 'y'
  const yTranslate = useTransform(containerProgress, 
    [start - segmentSize, mid, end + segmentSize], 
    [40, 0, -40]
  );
  
  const scale = useTransform(containerProgress, 
    [start - segmentSize, mid, end + segmentSize], 
    [0.96, 1, 0.96]
  );

  return (
    <div 
      id={`section-${solution.id}`}
      className="flex flex-col items-center justify-center py-4"
      style={{ minHeight: height ? `${height}px` : "100vh" }}
    >
      <motion.div
        style={{ 
          y: yTranslate, 
          scale,
          height: height > 0 ? `${height}px` : "auto",
          willChange: "transform" 
        }}
        className="w-full rounded-[3.5rem] border border-[rgba(10,89,194,0.12)] bg-gradient-to-br from-primary-strong via-primary to-[#1a88ff] p-8 md:p-12 text-surface shadow-[0_32px_84px_-24px_rgba(10,89,194,0.28)] relative overflow-hidden flex flex-col justify-center"
      >
        {/* Subtle static gradient background for better performance */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-2xl font-black md:text-4xl leading-tight tracking-tight">
              {solution.title}
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80 max-w-2xl font-medium">
              {solution.description}
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Technology Stack</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {solution.expertise.map((exp, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white/95 p-3 text-center text-(--color-text) shadow-lg"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/5 text-primary">
                    <exp.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[8px] font-black leading-tight uppercase tracking-widest">{exp.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Featured Products</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {solution.suite.map((product, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-black text-white backdrop-blur-xl shadow-lg"
                >
                  <span className="text-base tracking-tight">{product}</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
