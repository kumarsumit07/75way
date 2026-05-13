"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/nav";

export function TopStrip() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="border-b border-blue-200/80 bg-blue-600 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-2 text-sm font-semibold sm:flex-row lg:px-8">
        <motion.p animate={reduce ? undefined : { x: [0, 6, 0] }} transition={{ duration: 8, repeat: Infinity }}>
          From AI & Agentic AI to IoT & on-demand apps — solutions built for measurable business impact.
        </motion.p>
        <div className="flex flex-wrap gap-5">
          <span className="inline-flex items-center gap-1.5 opacity-95">
            <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
          </span>
          <span className="inline-flex items-center gap-1.5 opacity-95">
            <Phone className="h-4 w-4 shrink-0" /> {SITE.phone}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
