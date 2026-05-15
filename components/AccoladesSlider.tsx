"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

interface Accolade {
  id: string;
  name: string;
  logo: string;
  award: string;
  rating: number;
}

const ACCOLADES: Accolade[] = [
  { id: "1", name: "TopDevelopers", award: "Top Mobile App Developers", logo: "/assets/images/unsplash-1560179707-f14e90ef3623.webp", rating: 5 },
  { id: "2", name: "Techreviewer", award: "Top AI Companies 2024", logo: "/assets/images/unsplash-1551434678-e076c223a692.webp", rating: 5 },
  { id: "3", name: "SoftwareWorld", award: "Top Rated App Dev US", logo: "/assets/images/unsplash-1559136555-9303baea8ebd.webp", rating: 5 },
  { id: "4", name: "Clutch", award: "Top Artificial Intelligence", logo: "/assets/images/unsplash-1516321318423-f06f85e504b3.webp", rating: 5 },
  { id: "5", name: "AI Agents", award: "Featured on AI Directory", logo: "/assets/images/unsplash-1677442136019-21780ecad995.webp", rating: 5 },
  { id: "6", name: "GoodFirms", award: "Top Big Data Analytics", logo: "/assets/images/unsplash-1460925895917-afdab827c52f.webp", rating: 5 },
  { id: "7", name: "AppFutura", award: "Top Web Developers", logo: "/assets/images/unsplash-1551288049-bebda4e38f71.webp", rating: 5 },
];

// Use 3x array for infinite looping
const EXTENDED_ACCOLADES = [...ACCOLADES, ...ACCOLADES, ...ACCOLADES];

export const AccoladesSlider = () => {
  const [index, setIndex] = useState(ACCOLADES.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controls = useAnimation();

  // Each card width + gap. 
  // To show 4 full cards and a peek of the 5th:
  // Each card should be ~23% of the container.
  const cardWidthPercent = 23; 
  const gapPercent = 1.5;
  const step = cardWidthPercent + gapPercent;

  const getX = (idx: number) => {
    return -(idx * step);
  };

  const handleNext = useCallback(async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const nextIndex = index + 1;
    setIndex(nextIndex);

    await controls.start({
      x: `${getX(nextIndex)}%`,
      transition: { 
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1], // Smooth Apple-style ease-out
      }
    });

    if (nextIndex >= ACCOLADES.length * 2) {
      setIndex(ACCOLADES.length);
      controls.set({ x: `${getX(ACCOLADES.length)}%` });
    }
    setIsTransitioning(false);
  }, [index, isTransitioning, controls, step]);

  const handlePrev = useCallback(async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const prevIndex = index - 1;
    setIndex(prevIndex);

    await controls.start({
      x: `${getX(prevIndex)}%`,
      transition: { 
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1],
      }
    });

    if (prevIndex < ACCOLADES.length) {
      setIndex(ACCOLADES.length * 2 - 1);
      controls.set({ x: `${getX(ACCOLADES.length * 2 - 1)}%` });
    }
    setIsTransitioning(false);
  }, [index, isTransitioning, controls, step]);

  useEffect(() => {
    controls.set({ x: `${getX(ACCOLADES.length)}%` });
  }, [controls, step]);

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
              Every Accolade Reinforces <br />
              <span className="text-blue-600">Our Vision for Digital Transformation</span>
            </h2>
          </div>
          <button className="px-10 py-4 rounded-full bg-slate-950 text-white font-black text-sm shadow-2xl transition-transform hover:scale-105 active:scale-95">
            Reach Us Now
          </button>
        </div>

        {/* Viewport: Flush left, Peek right */}
        <div className="relative overflow-hidden -mx-4 px-4">
          <motion.div
            animate={controls}
            className="flex items-stretch"
            style={{ 
              gap: `${gapPercent}%`,
              // No fixed width here, flex will naturally expand
            }}
          >
            {EXTENDED_ACCOLADES.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="flex-shrink-0"
                style={{ width: `${cardWidthPercent}%` }}
              >
                {/* Full physical card container that moves with the track */}
                <div className="h-full rounded-[2.5rem] p-8 lg:p-11 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-950 border border-blue-500/20">
                  <div className="flex flex-col items-center text-center space-y-10 h-full">
                    <div className="h-28 w-full flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 opacity-25 flex justify-between px-1">
                         <svg className="w-12 h-full text-white/30" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M6,21C6,21 2,13 2,12C2,11 6,3 6,3C6,3 5,11 5,12C5,13 6,21 6,21Z" />
                         </svg>
                         <svg className="w-12 h-full text-white/30 scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M6,21C6,21 2,13 2,12C2,11 6,3 6,3C6,3 5,11 5,12C5,13 6,21 6,21Z" />
                         </svg>
                      </div>
                      <div className="relative z-10 h-16 w-16 overflow-hidden rounded-full border-2 border-white/40 bg-white/10 p-2 shadow-xl">
                        <OptimizedImage
                          src={item.logo}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-[10px] font-black text-blue-300 uppercase tracking-[0.25em] mt-5 leading-tight max-w-[90%] mx-auto">{item.award}</div>
                    </div>
                    <div className="flex gap-1.5 py-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="h-4.5 w-4.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                      ))}
                    </div>
                    <div className="w-full pt-10 border-t border-white/10 mt-auto">
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{item.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex justify-center gap-6">
          <button onClick={handlePrev} disabled={isTransitioning} className="h-14 w-14 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 group transition-all shadow-xl disabled:opacity-20">
            <ChevronLeft className="h-6 w-6 text-slate-600 group-hover:text-white transition-transform group-hover:-translate-x-1" />
          </button>
          <button onClick={handleNext} disabled={isTransitioning} className="h-14 w-14 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 group transition-all shadow-xl disabled:opacity-20">
            <ChevronRight className="h-6 w-6 text-slate-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
