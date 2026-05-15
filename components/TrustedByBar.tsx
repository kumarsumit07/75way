"use client";

import Image from "next/image";
import OptimizedImage from "./OptimizedImage";

const TRUST_LOGOS = [
  { name: "Emerson", src: "/images/logos/emerson.png" },
  { name: "LG", src: "/images/logos/lg.png" },
  { name: "Stanford University", src: "/images/logos/stanford.png" },
  { name: "Saint Luke's", src: "/images/logos/stanford.png" },
  { name: "Ferrero Rocher", src: "/images/logos/emerson.png" },
] as const;

export function TrustedByBar() {
  return (
    <section className="overflow-x-clip border-y border-[rgba(10,89,194,0.14)] bg-surface py-5 text-(--color-text) sm:py-6">
      <div className="site-container flex flex-wrap items-center justify-center gap-6 lg:justify-between">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">Trusted By</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {TRUST_LOGOS.map((logo) => (
            <div key={logo.name} className="relative h-6 w-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <OptimizedImage
                src={logo.src}
                alt={logo.name}
                fill
                priority
                className="object-contain"
                sizes="200px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
