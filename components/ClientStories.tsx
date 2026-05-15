"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Quote, User } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  story: string;
  headline: string;
  tag: string;
  videoThumb: string;
}

const STORIES: Testimonial[] = [
  {
    id: "1",
    name: "Michael Coderre",
    role: "CEO",
    company: "Zebraonline",
    headline: "A Positive Experience from the Beginning",
    tag: "Legacy Transformation",
    story: "Working with 75way was a positive experience from the start. We needed to upgrade our legacy Ruby solution and make critical infrastructure improvements. They were thorough in their review of our requirements, and their communication was exceptional throughout the entire process.",
    videoThumb: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Nathan Yawn",
    role: "CTO",
    company: "MorningStar",
    headline: "Thorough Implementation & Flexibility",
    tag: "Angular Scalability",
    story: "75way completed the job expanding our Angular front-end code within the initially-estimated time. They were thorough in their implementation of our specifications and flexible enough to understand incomplete definitions defined across multiple sources.",
    videoThumb: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Pedro Silva",
    role: "Lead Developer",
    company: "1D.Works",
    headline: "Proactive Problem Solving",
    tag: "Backend Optimization",
    story: "The team at 75way was proactive and could anticipate potential roadblocks before they became major issues. Their approach to work is truly commendable, always looking for ways to improve the final product beyond the initial scope.",
    videoThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
];

export const ClientStories = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % STORIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  const story = STORIES[current];

  return (
    <section className="bg-slate-950 py-20 lg:py-32 overflow-hidden relative">
      {/* Cinematic Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Area */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-4"
          >
            Client Success
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
          >
            Our Clients' Success Stories <br />
            <span className="text-white/40 font-bold">Power the Legacy We Build.</span>
          </motion.h2>
        </div>

        {/* Stories Slider Viewport */}
        <div className="relative min-h-[700px] lg:min-h-[550px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={story.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                filter: { duration: 0.5 },
              }}
              className="absolute inset-0 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-stretch"
            >
              {/* Left Side: Story Card */}
              <div className="relative group">
                <div className="h-full rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-8 lg:p-14 flex flex-col justify-between shadow-2xl">
                  <div>
                    <Quote className="h-12 w-12 text-blue-500/40 mb-8" />
                    <h3 className="text-2xl lg:text-4xl font-black text-white mb-6 leading-tight">
                      "{story.headline}"
                    </h3>
                    <p className="text-lg lg:text-xl text-white/60 leading-relaxed font-medium">
                      {story.story}
                    </p>
                  </div>
                  
                  <div className="mt-12 flex items-center gap-5 pt-10 border-t border-white/5">
                    <div className="h-14 w-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-white leading-none mb-1">{story.name}</p>
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest">
                        {story.role}, <span className="text-blue-400">{story.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Video Card */}
              <div className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl">
                <div className="absolute inset-0 bg-slate-900">
                  <img 
                    src={story.videoThumb} 
                    alt={story.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </motion.div>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <p className="text-xs font-black text-white/60 uppercase tracking-[0.3em]">Watch Success Story</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-16 lg:mt-24 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Progress Indicators */}
          <div className="flex gap-3">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === i ? 'w-12 bg-blue-600' : 'w-4 bg-white/10'
                }`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group"
            >
              <ChevronLeft className="h-6 w-6 text-white transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group"
            >
              <ChevronRight className="h-6 w-6 text-white transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
