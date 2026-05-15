"use client";

import React from "react";

const TRUST_LOGOS = ["Emerson", "LG", "Stanford University", "Saint Luke's", "Ferrero Rocher"] as const;

export function TrustedByBar() {
  return (
    <section className="overflow-x-clip border-y border-[rgba(10,89,194,0.14)] bg-surface py-5 text-(--color-text) sm:py-6">
      <div className="site-container flex flex-wrap items-center justify-center gap-6 lg:justify-between">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">Trusted By</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {TRUST_LOGOS.map((name) => (
            <span
              key={name}
              className="text-center text-sm font-semibold text-muted transition hover:text-primary-strong md:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
