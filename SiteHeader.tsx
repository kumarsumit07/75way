"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { PRIMARY_NAV, SITE } from "@/lib/nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="sticky top-0 z-50 border-b border-[rgba(0,17,141,0.15)] bg-[rgba(255,255,255,0.92)] backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-200 bg-blue-50 shadow-[0_0_24px_rgba(37,99,235,0.12)]">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight text-brand">{SITE.name}</p>
              <p className="text-[0.65rem] font-semibold tracking-[0.32em] text-primary/90">{SITE.tagline}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-(--color-muted) lg:flex">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active ? "text-primary-strong" : "transition hover:text-primary"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              className="rounded-full border border-[rgba(10,89,194,0.15)] px-5 py-3 text-sm font-semibold text-primary-strong transition hover:bg-[rgba(10,89,194,0.08)]"
              href="/#contact"
            >
              Get a Call Back
            </Link>
            <Link
              className="group inline-flex items-center rounded-full px-5 py-3 text-sm font-bold text-white shadow-md shadow-[rgba(10,89,194,0.25)] transition hover:opacity-95 bg-button-primary"
              href="/#contact"
            >
              Let’s Talk <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button type="button" className="rounded-lg p-2 text-slate-800 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </motion.header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-white/96 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <p className="text-xl font-black text-slate-900">{SITE.name}</p>
            <button type="button" className="rounded-lg p-2" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <div className="mt-10 grid gap-4 text-lg font-medium text-slate-800">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
