"use client";

import React from "react";

const TRUST_LOGOS = ["Emerson", "LG", "Stanford University", "Saint Luke's", "Ferrero Rocher"] as const;

export function TrustedByBar() {
  return (
    <section className="border-y border-[rgba(10,89,194,0.14)] bg-surface py-4 text-(--color-text)">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-5 lg:justify-between lg:px-8">
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
