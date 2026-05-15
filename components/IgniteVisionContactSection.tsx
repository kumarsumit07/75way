"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Landmark } from "lucide-react";

const ADDRESSES = {
  usa: {
    label: "UNITED STATES",
    lines: "Blackthorn Drive, San Jacinto, California - 92582, USA",
    phonePrefix: "+1",
    phonePlaceholder: "(555) 000-0000",
  },
  in: {
    label: "INDIA",
    lines: "Cyber City, DLF Phase 3, Gurugram, Haryana - 122002, India",
    phonePrefix: "+91",
    phonePlaceholder: "98765 43210",
  },
} as const;

export function IgniteVisionContactSection() {
  const reduceMotion = useReducedMotion();
  const [location, setLocation] = useState<"usa" | "in">("usa");
  const addr = ADDRESSES[location];

  return (
    <section
      id="contact"
      className="relative overflow-x-clip site-section-y"
      style={{
        backgroundColor: "#f4f7fd",
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(10, 89, 194, 0.07) 1px, transparent 0),
          radial-gradient(ellipse 120% 80% at 50% 100%, rgba(10, 89, 194, 0.06), transparent 55%)
        `,
        backgroundSize: "28px 28px, 100% 100%",
      }}
    >
      <div className="relative z-10 site-container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14 xl:gap-16"
        >
          {/* Left column */}
          <div>
            <h2 className="text-3xl font-black leading-[1.12] tracking-tight text-(--color-text) sm:text-4xl lg:text-[2.15rem] lg:leading-[1.15]">
              <span className="text-primary">Ready To Ignite</span> Your Vision With AI-Powered Excellence?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              We value your time. Our experts revert to you within 24 hours.
            </p>
            <Link
              href="#ignite-contact-form"
              className="mt-4 inline-block text-base font-bold text-primary underline-offset-4 transition hover:text-primary-strong hover:underline sm:text-lg"
            >
              Claim Free Consultation
            </Link>

            <p className="mt-10 text-4xl font-black leading-tight tracking-tight text-primary-strong sm:text-5xl lg:text-[2.75rem] lg:leading-[1.05]">
              Let&apos;s Innovate Together!
            </p>

            <div className="mt-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">{addr.label}</p>
              <div className="mt-4 flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(10,89,194,0.18)] bg-white text-primary shadow-sm">
                  <Landmark className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="text-base font-medium leading-relaxed text-(--color-text) sm:text-[1.05rem]">{addr.lines}</p>
              </div>
            </div>

            <div className="mt-10 flex gap-8 border-b border-[rgba(10,89,194,0.15)]">
              <button
                type="button"
                onClick={() => setLocation("usa")}
                className={`relative flex items-center gap-2 pb-3 text-sm font-bold uppercase tracking-wider transition ${
                  location === "usa" ? "text-(--color-text)" : "text-muted hover:text-(--color-text)"
                }`}
              >
                <span aria-hidden>🇺🇸</span> USA
                {location === "usa" ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => setLocation("in")}
                className={`relative flex items-center gap-2 pb-3 text-sm font-bold uppercase tracking-wider transition ${
                  location === "in" ? "text-(--color-text)" : "text-muted hover:text-(--color-text)"
                }`}
              >
                <span aria-hidden>🇮🇳</span> INDIA
                {location === "in" ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            </div>
          </div>

          {/* Right column — form card */}
          <motion.div
            id="ignite-contact-form"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08 }}
            className="rounded-[1.75rem] border border-[rgba(10,89,194,0.1)] bg-white p-6 shadow-[0_20px_60px_rgba(10,89,194,0.1)] sm:rounded-[2rem] sm:p-8 lg:p-9"
          >
            <form className="grid gap-4 text-(--color-text)" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Full name
                  <input
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter Full name"
                    className="rounded-xl border border-[rgba(10,89,194,0.18)] bg-surface px-4 py-3.5 text-[0.9375rem] outline-none transition placeholder:text-muted/70 focus:border-primary/40 focus:ring-2 focus:ring-[rgba(10,89,194,0.2)]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Company Name
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Enter Company Name"
                    className="rounded-xl border border-[rgba(10,89,194,0.18)] bg-surface px-4 py-3.5 text-[0.9375rem] outline-none transition placeholder:text-muted/70 focus:border-primary/40 focus:ring-2 focus:ring-[rgba(10,89,194,0.2)]"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@youremail.com"
                  className="rounded-xl border border-[rgba(10,89,194,0.18)] bg-surface px-4 py-3.5 text-[0.9375rem] outline-none transition placeholder:text-muted/70 focus:border-primary/40 focus:ring-2 focus:ring-[rgba(10,89,194,0.2)]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Phone number
                <div className="flex overflow-hidden rounded-xl border border-[rgba(10,89,194,0.18)] bg-surface focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-[rgba(10,89,194,0.2)]">
                  <span className="flex shrink-0 items-center gap-2 border-r border-[rgba(10,89,194,0.12)] bg-[rgba(10,89,194,0.04)] px-3 py-3.5 text-sm font-semibold text-muted sm:px-4">
                    <span aria-hidden>{location === "usa" ? "🇺🇸" : "🇮🇳"}</span>
                    {addr.phonePrefix}
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={addr.phonePlaceholder}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[0.9375rem] outline-none placeholder:text-muted/70"
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Message
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write your message here..."
                  className="resize-y rounded-xl border border-[rgba(10,89,194,0.18)] bg-surface px-4 py-3.5 text-[0.9375rem] outline-none transition placeholder:text-muted/70 focus:border-primary/40 focus:ring-2 focus:ring-[rgba(10,89,194,0.2)]"
                />
              </label>
              <div className="pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[linear-gradient(90deg,#0f1217_0%,#0a59c2_55%,#0350d6_100%)] px-10 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_32px_rgba(10,89,194,0.35)] transition hover:opacity-[0.96] sm:px-12 sm:py-4 sm:text-[0.9375rem]"
                >
                  Send message
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
