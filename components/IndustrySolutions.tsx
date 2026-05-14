"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface IndustryCardProps {
  title: string;
  image: string;
  tags: string[];
  delay: number;
}

const IndustryCard = ({ title, image, tags, delay }: IndustryCardProps) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="group relative h-[450px] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-[0_40px_80px_-16px_rgba(37,99,235,0.2)]"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
      
      {/* Top Header */}
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
        <h3 className="text-2xl font-black tracking-tight text-white">{title}</h3>
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          <motion.div
            variants={{
              initial: { rotate: 0 },
              hover: { rotate: 90 }
            }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="flex items-center justify-center"
          >
            <ArrowUpRight className="h-6 w-6 text-white stroke-[2.5px]" />
          </motion.div>
        </div>
      </div>

      {/* Content Badges */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * idx, duration: 0.5 }}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-colors duration-500 group-hover:border-white/40 group-hover:bg-white/20"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hover Reveal Border Glow */}
      <div className="absolute inset-0 border-[2px] border-transparent transition-colors duration-500 group-hover:border-blue-500/30 rounded-[2.5rem] pointer-events-none" />
    </motion.div>
  );
};

const INDUSTRIES = [
  {
    title: "Healthcare",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Diagnostics", "Telemedicine Software", "Healthcare CRM"],
  },
  {
    title: "Real Estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    tags: ["Real Estate CRM", "Smart Home App", "AI Chatbot Support"],
  },
  {
    title: "E-commerce",
    image: "https://images.unsplash.com/photo-1556742049-04ff4d0ca04b?auto=format&fit=crop&w=800&q=80",
    tags: ["E-commerce App", "Online Marketplace", "AI Recommendations"],
  },
  {
    title: "Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    tags: ["AI-enabled Banking", "Crypto Wallet App", "Insurance App"],
  },
  {
    title: "Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Fleet Tracking", "E-Mobility Solutions", "Food Delivery App"],
  },
  {
    title: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Tutoring Platforms", "E-Learning Platform", "Virtual Classroom"],
  },
];

export const IndustrySolutions = () => {
  return (
    <section id="industries" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] bg-slate-50/50 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6"
          >
            Industries We Empower
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
          >
            Our Tailored <span className="text-blue-600">AI Solutions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-lg lg:text-xl text-slate-500 font-medium"
          >
            We build intelligent platforms across diverse markets to drive digital transformation and sustainable growth.
          </motion.p>
        </div>

        {/* 3 Columns Row Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {INDUSTRIES.map((industry, index) => (
            <IndustryCard
              key={industry.title}
              title={industry.title}
              image={industry.image}
              tags={industry.tags}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
