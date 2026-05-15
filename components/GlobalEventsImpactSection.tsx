"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EVENT_IMAGES: { src: string; alt: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop",
    alt: "Technology conference exhibition floor",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&auto=format&fit=crop",
    alt: "Business professionals at a global tech event",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80&auto=format&fit=crop",
    alt: "Team collaborating at a trade show booth",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fc2d075665c?w=800&q=80&auto=format&fit=crop",
    alt: "Enterprise meeting at an innovation summit",
  },
  {
    src: "https://images.unsplash.com/photo-1598484608138-10aa277d3347?w=800&q=80&auto=format&fit=crop",
    alt: "Partners discussing digital solutions at an event",
  },
  {
    src: "https://images.unsplash.com/photo-1517245385007-4d6707a65f7f?w=800&q=80&auto=format&fit=crop",
    alt: "Conference networking and product showcase",
  },
];

function CesWordmark() {
  return (
    <div className="flex items-center gap-3 text-white">
      <div
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/25 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:h-14 sm:w-14"
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 22 L16 8 L26 22 Z"
            fill="currentColor"
            fillOpacity={0.2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="20" r="2.5" fill="currentColor" />
        </svg>
      </div>
      <span className="text-3xl font-black tracking-tight sm:text-4xl">CES</span>
    </div>
  );
}

export function GlobalEventsImpactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-x-clip text-white"
      style={{
        background:
          "linear-gradient(145deg, #000c3a 0%, #001a5c 28%, #0a59c2 62%, #003484 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_10%_-20%,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_80%,rgba(0,0,0,0.18),transparent_55%)]" />

      <div className="relative z-10 site-container py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
          >
            <h2 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
              From Global Events to Worldwide Impact, Our Footprint Speaks Innovation
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              We bring our digital transformation solutions to global events. Our IT solutions inspire and help enterprises
              to innovate, compete, and scale worldwide.
            </p>
            <motion.div
              className="mt-8 inline-block"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-(--color-text) shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition hover:bg-[#f0f5ff] sm:px-8 sm:py-4 sm:text-[0.9375rem]"
              >
                Discuss Project Now
                <ArrowRight className="h-4 w-4 shrink-0 sm:h-[1.05rem] sm:w-[1.05rem]" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex shrink-0 lg:pt-2"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08 }}
          >
            <CesWordmark />
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1, ease: [0.33, 1, 0.68, 1] }}
        >
          {EVENT_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_16px_48px_rgba(0,0,0,0.2)] sm:rounded-3xl"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i < 2}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(0,12,40,0.45)] via-transparent to-transparent opacity-80" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
