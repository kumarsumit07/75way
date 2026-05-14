"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BrainCircuit, Cpu, LineChart, ShieldCheck, Zap, Cloud, Database } from "lucide-react";

interface TechItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Our experts at 75way deploy AI models for enhanced decision-making.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    icon: BrainCircuit,
  },
  {
    id: "gen-ai",
    title: "Generative AI",
    description: "We implement Gen AI to enhance operational efficiency for SMEs.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4628c975c?auto=format&fit=crop&w=1200&q=80",
    icon: Zap,
  },
  {
    id: "ml",
    title: "Machine Learning",
    description: "Specializing in ML solutions to analyze patterns and predict trends.",
    image: "https://images.unsplash.com/photo-1555255707-c07966488bc7?auto=format&fit=crop&w=1200&q=80",
    icon: Cpu,
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description: "Blockchain services for secure transactions and higher business trust.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    icon: ShieldCheck,
  },
  {
    id: "iot",
    title: "Internet of Things (IoT)",
    description: "Connecting devices through IoT for real-time monitoring and automation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    icon: Cloud,
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Extracting actionable insights to reduce costs and drive revenue growth.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    icon: Database,
  },
  {
    id: "bi",
    title: "Business Intelligence",
    description: "AI-powered BI tools to visualize performance and enhance strategies.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    icon: LineChart,
  },
];

export const TechStorytelling = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const SECTION_HEIGHT = 350; 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const newIndex = Math.min(
        Math.floor(v * TECH_ITEMS.length),
        TECH_ITEMS.length - 1
      );
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, activeIndex]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white" 
      style={{ height: `${SECTION_HEIGHT}vh` }}
    >
      {/* Sticky Viewport with Safe Padding */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden py-12">
        <div className="container mx-auto px-6 lg:px-12 max-h-[85vh] flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Compact Image Area */}
          <div className="w-full flex flex-col justify-center">
            <div className="max-w-xl">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-blue-600 font-black uppercase tracking-[0.4em] text-[9px] mb-2"
              >
                Tech Ecosystem
              </motion.p>
              <h2 className="text-2xl lg:text-4xl font-black text-slate-900 leading-[1.1] mb-1 tracking-tight">
                Next-Level Technologies
              </h2>
              <h2 className="text-2xl lg:text-4xl font-black text-blue-600 leading-[1.1] mb-6 tracking-tight">
                That Drive Real Impact.
              </h2>

              <div className="relative aspect-[16/10] w-full max-w-lg rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={TECH_ITEMS[activeIndex].id}
                    initial={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={TECH_ITEMS[activeIndex].image}
                      alt={TECH_ITEMS[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Ultra-Compact Premium Tabs */}
          <div className="w-full relative flex flex-col justify-center py-2 lg:py-4">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-50 hidden lg:block" />
            
            <div className="flex flex-col gap-0.5">
              {TECH_ITEMS.map((item, index) => (
                <TechUltraCompactTab 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  isActive={activeIndex === index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechUltraCompactTab = ({ 
  item, 
  index, 
  isActive, 
  scrollYProgress 
}: { 
  item: TechItem; 
  index: number; 
  isActive: boolean;
  scrollYProgress: any;
}) => {
  const zoneSize = 1 / TECH_ITEMS.length;
  const start = index * zoneSize;
  const end = (index + 1) / TECH_ITEMS.length;
  
  const itemProgress = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1]
  );

  return (
    <div className="relative pl-5 lg:pl-8">
      {/* Indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent hidden lg:block">
        <motion.div 
          style={{ scaleY: itemProgress, originY: 0 }}
          className="absolute inset-0 bg-blue-600 z-10 shadow-[0_0_8px_rgba(37,99,235,0.2)]"
        />
      </div>

      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0.3,
          x: isActive ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`w-full py-1.5 px-5 rounded-xl transition-all duration-300 ${
          isActive ? "bg-blue-600/5 shadow-sm" : ""
        }`}
      >
        <h3 className={`text-sm lg:text-[1.1rem] font-black transition-colors leading-tight tracking-tight ${
          isActive ? "text-slate-900" : "text-slate-400"
        }`}>
          {item.title}
        </h3>
        
        <p className={`text-[0.7rem] lg:text-[0.82rem] leading-snug font-semibold transition-colors duration-300 mt-0.5 ${
          isActive ? "text-slate-600" : "text-slate-400"
        }`}>
          {item.description}
        </p>

        {/* Mobile Line */}
        <div className="mt-2 h-0.5 w-full bg-slate-50 lg:hidden overflow-hidden rounded-full">
          <motion.div 
            style={{ scaleX: itemProgress, originX: 0 }}
            className="h-full bg-blue-600"
          />
        </div>
      </motion.div>
    </div>
  );
};
