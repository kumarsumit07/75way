"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/nav";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const columns = [
  { title: "Company", links: [
    { href: "/about", label: "About Us" },
    { href: "/about#careers", label: "Career" },
    { href: "/about#partners", label: "Partnerships" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/#contact", label: "Contact" },
  ]},
  { title: "Services", links: [
    { href: "/services#ai", label: "AI Development" },
    { href: "/services#apps", label: "App Development" },
    { href: "/services#crm", label: "CRM Solutions" },
    { href: "/services#data", label: "Data Analytics" },
  ]},
  { title: "Industries", links: [
    { href: "/industries#healthcare", label: "Healthcare" },
    { href: "/industries#fintech", label: "Fintech" },
    { href: "/industries#education", label: "Education" },
    { href: "/industries#ecommerce", label: "E-commerce" },
  ]},
  { title: "Resources", links: [
    { href: "/resources#blogs", label: "Blogs" },
    { href: "/resources#videos", label: "Videos" },
    { href: "/resources#case-studies", label: "Case Studies" },
  ]},
] as const;

export function SiteFooter() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      className="border-t border-[rgba(255,255,255,0.08)] bg-footer py-14 text-footer-muted"
    >
      <motion.div variants={stagger} className="site-container grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <motion.div variants={fadeUp} className="lg:col-span-1">
          <Link href="/" className="text-2xl font-black text-surface">
            {SITE.name}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-muted">
            AI-led product engineering for apps, automation, data platforms, blockchain, IoT, and cloud delivery.
          </p>
        </motion.div>
        {columns.map((col) => (
          <motion.div variants={fadeUp} key={col.title}>
            <p className="font-bold text-surface">{col.title}</p>
            <div className="mt-4 grid gap-2.5 text-sm">
              {col.links.map((l) => (
                <Link key={l.href + l.label} href={l.href} className="text-footer-link transition hover:text-surface">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="site-container mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <span className="hover:text-slate-300">Sitemap</span>
          <span className="hover:text-slate-300">Privacy</span>
          <span className="hover:text-slate-300">Terms</span>
        </div>
      </div>
    </motion.footer>
  );
}
