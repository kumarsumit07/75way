"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Target, Rocket, CheckCircle2 } from "lucide-react";

interface ModelCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
  color: string;
}

const MODELS: ModelCard[] = [
  {
    id: "staff-augmentation",
    title: "Staff Augmentation",
    description: "Time differences won't affect your product delivery. At 75way, we provide skilled resources who work to your requirements, enabling you to manage tasks and priorities.",
    icon: Clock,
    details: ["Global Talent Pool", "Seamless Integration", "Flexible Scaling", "Direct Communication"],
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: "time-material",
    title: "Project-Based Time & Material Model",
    description: "We customize an initial cost model according to your project's scope, timelines, and desired functionality. This model allows payment based on time and resources while the scope evolves.",
    icon: Target,
    details: ["Scope Flexibility", "Incremental Progress", "Transparent Billing", "Adaptive Planning"],
    color: "from-indigo-600 to-blue-500",
  },
  {
    id: "turn-key",
    title: "Committed Commercial Turn-Key Model",
    description: "We deliver cost-effective pricing models for PoCs, MVPs, and quick-pilot solutions. Our transparent approach enables flexible collaboration and smooth scaling.",
    icon: Rocket,
    details: ["Fixed Deadlines", "Defined Deliverables", "End-to-End Ownership", "Post-Launch Support"],
    color: "from-blue-700 to-indigo-500",
  },
];

// Extended array for infinite looping: [Clone of C, A, B, C, Clone of A]
const EXTENDED_MODELS = [
  MODELS[MODELS.length - 1],
  ...MODELS,
  MODELS[0],
];

export const EngagementModels = () => {
  const [index, setIndex] = useState(1); // Start at the first real card (A)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controls = useAnimation();

  // Reference proportions: 75% card width, 2% gap
  const cardWidth = 75; 
  const gap = 2.5;
  const step = cardWidth + gap;

  const handleNext = useCallback(async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const nextIndex = index + 1;
    setIndex(nextIndex);

    await controls.start({
      x: `-${nextIndex * step}%`,
      transition: { type: "spring", stiffness: 120, damping: 22, mass: 1 }
    });

    if (nextIndex === EXTENDED_MODELS.length - 1) {
      // Reached the clone of A, teleport to original A
      setIndex(1);
      controls.set({ x: `-${1 * step}%` });
    }
    setIsTransitioning(false);
  }, [index, isTransitioning, controls, step]);

  const handlePrev = useCallback(async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const prevIndex = index - 1;
    setIndex(prevIndex);

    await controls.start({
      x: `-${prevIndex * step}%`,
      transition: { type: "spring", stiffness: 120, damping: 22, mass: 1 }
    });

    if (prevIndex === 0) {
      // Reached the clone of C, teleport to original C
      setIndex(MODELS.length);
      controls.set({ x: `-${MODELS.length * step}%` });
    }
    setIsTransitioning(false);
  }, [index, isTransitioning, controls, step]);

  // Initial position set
  useEffect(() => {
    controls.set({ x: `-${1 * step}%` });
  }, [controls, step]);

  return (
    <section className="relative bg-slate-950 py-16 lg:py-24 overflow-hidden border-t border-white/5">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
            >
              Choose the Engagement Model <br />
              <span className="text-white/90">That Fits Your Vision</span>
            </motion.h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-blue-600 hover:border-blue-600 shadow-lg disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 text-white transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-blue-600 hover:border-blue-600 shadow-lg disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Real Horizontal Track Slider */}
        <div className="relative">
          <motion.div
            animate={controls}
            className="flex items-stretch"
            style={{ gap: `${gap}%` }}
          >
            {EXTENDED_MODELS.map((model, i) => {
              const Icon = model.icon as any;
              // Logical index maps clones back to their originals for active state
              const logicalIndex = i === 0 ? MODELS.length : i === EXTENDED_MODELS.length - 1 ? 1 : i;
              const isActive = index === i || (index === 0 && i === MODELS.length) || (index === EXTENDED_MODELS.length - 1 && i === 1);

              return (
                <div
                  key={`${model.id}-${i}`}
                  className="flex-shrink-0 w-[85%] lg:w-[75%] transition-all duration-500"
                  style={{ 
                    opacity: isActive ? 1 : 0.4,
                    transform: `scale(${isActive ? 1 : 0.98})`
                  }}
                >
                  <div className="relative h-full rounded-3xl p-6 lg:p-10 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl transition-all duration-500 hover:border-blue-500/30">
                    <div className="relative z-10 flex flex-col h-full gap-6 lg:gap-8">
                      {/* Top Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                          {model.title}
                        </h3>
                        <p className="text-sm lg:text-base text-white/70 leading-relaxed font-medium">
                          {model.description}
                        </p>
                      </div>

                      {/* Illustration Area */}
                      <div className="relative flex-grow flex items-center justify-center rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm overflow-hidden min-h-[180px]">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          {model.id === "staff-augmentation" && (
                            <div className="relative w-full h-full flex items-center justify-center gap-6 lg:gap-12">
                              {[ 
                                { city: "USA", time: "07:16:05" }, 
                                { city: "UK", time: "12:16:05" }
                              ].map((clock) => (
                                <div key={clock.city} className="flex flex-col items-center gap-3">
                                  <div className="relative h-24 w-24 lg:h-32 lg:w-32 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/5">
                                    <div className="absolute h-1.5 w-1.5 bg-slate-400 rounded-full z-10" />
                                    <div className="absolute inset-2 rounded-full border border-white/10" />
                                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, idx) => (
                                      <div key={n} className="absolute inset-0 text-[8px] text-white/40 flex items-start justify-center pt-1" style={{ transform: `rotate(${idx * 30}deg)` }}>
                                        <span style={{ transform: `rotate(-${idx * 30}deg)` }}>{n}</span>
                                      </div>
                                    ))}
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute w-[35%] h-[2px] bg-red-500 origin-left left-1/2 rounded-full z-20" />
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3600, repeat: Infinity, ease: "linear" }} className="absolute w-[45%] h-[2.5px] bg-slate-800 origin-left left-1/2 rounded-full" />
                                  </div>
                                  <p className="text-[10px] font-bold text-white/60 uppercase">{clock.city}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {model.id === "time-material" && (
                            <div className="flex items-center gap-8 lg:gap-16">
                              {[1, 2, 3, 4].map((node, i) => (
                                <div key={node} className="relative h-10 w-10 lg:h-14 lg:w-14 rounded-full border border-blue-500/40 bg-blue-500/10 flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                                  {i < 3 && <div className="absolute left-full w-8 lg:w-16 h-[1px] bg-blue-500/20" />}
                                </div>
                              ))}
                            </div>
                          )}

                          {model.id === "turn-key" && (
                            <div className="relative w-full max-w-md aspect-[3/1] flex items-center">
                               <div className="relative flex-grow h-8 bg-blue-600/20 rounded-full flex items-center px-4">
                                  <div className="absolute -left-2 h-12 w-12 rounded-full border-4 border-blue-600/40 bg-slate-950 flex items-center justify-center text-[8px] font-bold text-white/40 uppercase tracking-tighter">Discovery</div>
                                  <div className="absolute -right-2 h-12 w-12 rounded-full border-4 border-blue-600/40 bg-slate-950 flex items-center justify-center text-[8px] font-bold text-white/40 uppercase tracking-tighter">Execution</div>
                               </div>
                            </div>
                          )}
                        </div>
                        <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${model.color} opacity-10 blur-[60px] rounded-full`} />
                      </div>

                      {/* Bottom Tags */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                        {model.details.map((detail) => (
                          <div key={detail} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.15em]">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="mt-8 lg:mt-10 flex items-center justify-center gap-2.5">
          {MODELS.map((_, i) => {
            const logicalIndex = index === 0 ? MODELS.length - 1 : index === EXTENDED_MODELS.length - 1 ? 0 : index - 1;
            return (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  logicalIndex === i ? 'w-8 bg-blue-600' : 'w-2.5 bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
