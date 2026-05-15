"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useMotionValueEvent, 
  AnimatePresence,
  useSpring,
} from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";

/**
 * Interface for Tab Data
 */
interface TabData {
  id: string;
  title: string;
  logo: string;
  content: string;
  metric: string;
  metricLabel: string;
  image: string;
  subtitle: string;
}

const TABS: TabData[] = [
  {
    id: "ai-solutions",
    title: "AI Solutions",
    subtitle: "Intelligent Systems",
    logo: "ADAMX",
    content: "We created an AI-enabled platform that converted customer interactions into case studies and testimonials.",
    metric: "+35%",
    metricLabel: "Deal Conversions",
    image: "/assets/images/unsplash-1551288049-bebda4e38f71.webp",
  },
  {
    id: "blockchain",
    title: "Blockchain",
    subtitle: "Web 3.0 Core",
    logo: "cSIGMA",
    content: "A decentralized finance (DeFi) web app to enable secure on-chain lending and real-world credit access.",
    metric: "+60%",
    metricLabel: "Smoother Operations",
    image: "/assets/images/unsplash-1639762681485-074b7f938ba0.webp",
  },
  {
    id: "iot-solutions",
    title: "IoT Solutions",
    subtitle: "Smart Ecosystems",
    logo: "Tageto",
    content: "75way built an IOT-based app to control paddle machines and transform training into automated sessions.",
    metric: "1200+",
    metricLabel: "Completed Sessions",
    image: "/assets/images/unsplash-1518770660439-4636190af475.webp",
  },
  {
    id: "ott-solution",
    title: "OTT Solution",
    subtitle: "Video Delivery",
    logo: "Viteo",
    content: "We crafted an OTT web app to simplify video management, analytics, and subscriptions for creators.",
    metric: "+47%",
    metricLabel: "Wider Reach",
    image: "/assets/images/unsplash-1522869635100-9f4c5e86aa37.webp",
  },
  {
    id: "fitness",
    title: "Fitness",
    subtitle: "Active Living",
    logo: "LEVA",
    content: "We crafted a custom healthcare solution with a unified web and app to transform patient engagement.",
    metric: "+62%",
    metricLabel: "Workflow Optimization",
    image: "/assets/images/unsplash-1505373877841-8d25f7d46678.webp",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "Medical Data",
    logo: "HealthPulse",
    content: "Digital health ecosystem facilitating seamless doctor-patient communication and records management.",
    metric: "99.9%",
    metricLabel: "Data Accuracy",
    image: "/assets/images/unsplash-1531297484001-80022131f5a1.webp",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "Modern Living",
    logo: "AuraEstate",
    content: "Next-gen property platform with VR tours and smart contract-based transaction processing.",
    metric: "10x",
    metricLabel: "Faster Closings",
    image: "/assets/images/unsplash-1499951360447-b19be8fe80f5.webp",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "Scale & Growth",
    logo: "OmniCorp",
    content: "Comprehensive ERP transformation for global supply chains with real-time AI forecasting.",
    metric: "-22%",
    metricLabel: "Operational Costs",
    image: "/assets/images/unsplash-1555066931-4365d14bab8c.webp",
  },
];

export function StickyScrollTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const step = 1 / TABS.length;
    const index = Math.min(Math.floor(latest / step), TABS.length - 1);
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }
  });

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 bg-white" 
      style={{ height: `${TABS.length * 150}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-16 overflow-hidden">
        
        {/* Subtle Section Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.04),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.04),transparent_50%)]" />
        </div>

        {/* 
            Premium Glassmorphic Card Container
        */}
        <motion.div 
          className="relative z-10 w-full max-w-[92rem] h-[82vh] lg:h-[78vh] max-h-[720px] rounded-[2.5rem] lg:rounded-[3.5rem] border border-white/60 bg-white/40 backdrop-blur-3xl shadow-[0_48px_96px_-24px_rgba(0,40,120,0.1)] flex flex-col"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Inner Clipping Container */}
          <div className="absolute inset-0 rounded-[inherit] overflow-hidden flex flex-col">
            {/* Top Tabs Navigation */}
            <div className="w-full border-b border-white/40 bg-white/10 z-30">
              <div className="max-w-full mx-auto px-6 lg:px-16">
                <div className="flex items-center justify-between py-5 lg:py-6 overflow-x-auto no-scrollbar gap-10 lg:gap-4">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        const sectionHeight = containerRef.current?.offsetHeight || 0;
                        const sectionTop = containerRef.current?.offsetTop || 0;
                        const targetScroll = (i / TABS.length) * sectionHeight + sectionTop + 10;
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }}
                      className="relative group cursor-pointer flex-shrink-0 flex flex-col items-center gap-1.5 outline-none"
                    >
                      <span className={`text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-500 ${
                        activeIndex === i ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-700'
                      }`}>
                        {tab.title}
                      </span>

                      {activeIndex === i && (
                        <div className="absolute -bottom-6 lg:-bottom-[26px] left-1/2 -translate-x-1/2 z-10">
                          <motion.div 
                            layoutId="activeTabIndicatorLine"
                            className="w-12 h-[2.5px] bg-blue-600 rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                          <motion.div
                            layoutId="activeTabIndicatorTriangle"
                            className="mx-auto w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-blue-600 mt-[0.5px]"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Integrated Media & Content Body */}
            <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden z-20">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col lg:flex-row"
                >
                  {/* Left Side: Immersive Media */}
                  <div className="w-full lg:w-1/2 h-full relative overflow-hidden bg-slate-100">
                    <motion.div
                      initial={{ scale: 1.08, opacity: 0.4, filter: "blur(16px)" }}
                      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <OptimizedImage
                        src={TABS[activeIndex].image}
                        fill
                        className="object-cover"
                        alt={TABS[activeIndex].title}
                        priority
                      />
                    </motion.div>

                    {/* Glass Metric Badge */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute bottom-10 left-10 lg:bottom-14 lg:left-14 bg-white/30 backdrop-blur-3xl p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-white/40 shadow-xl min-w-[180px] lg:min-w-[240px]"
                    >
                      <span className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none tabular-nums drop-shadow-xl">
                        {TABS[activeIndex].metric}
                      </span>
                      <p className="text-[10px] lg:text-[11px] font-black text-white/90 uppercase tracking-[0.25em] mt-4 lg:mt-5">
                        {TABS[activeIndex].metricLabel}
                      </p>
                    </motion.div>
                  </div>

                  {/* Right Side: Content Area */}
                  <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-8 lg:p-16 relative bg-white">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col gap-8 lg:gap-10"
                    >
                      <div className="space-y-6 lg:space-y-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                             <div className="h-[1.5px] w-10 bg-blue-600/50" />
                             <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">{TABS[activeIndex].subtitle}</span>
                          </div>
                          <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.85] opacity-90">
                            {TABS[activeIndex].logo}
                          </h3>
                        </div>

                        <p className="text-xl lg:text-2xl text-slate-600 leading-[1.5] font-medium max-w-xl">
                          {TABS[activeIndex].content}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-8">
                        <button className="group relative px-10 lg:px-12 py-5 lg:py-6 bg-blue-600 text-white rounded-full font-bold flex items-center gap-3 overflow-hidden shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5 active:translate-y-0">
                          <span className="relative z-10 text-xs font-black uppercase tracking-widest">Case Study</span>
                          <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>

                        <div className="flex items-center gap-3 text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">
                           <CheckCircle2 className="w-4 h-4 text-blue-500" />
                           Industry Leader
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-30" />
          </div>

          {/* Bottom Action Area */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 flex items-center gap-5">
            <button 
              onClick={() => {
                const sectionHeight = containerRef.current?.offsetHeight || 0;
                const sectionTop = containerRef.current?.offsetTop || 0;
                window.scrollTo({ top: sectionTop + sectionHeight + 1, behavior: "smooth" });
              }}
              className="group h-12 lg:h-14 px-8 lg:px-10 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 border border-white/10"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Skip</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            
            <button className="group h-12 lg:h-14 px-10 lg:px-14 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white shadow-[0_20px_40px_-12px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-4 border border-white/20">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap">View All Case Studies</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
