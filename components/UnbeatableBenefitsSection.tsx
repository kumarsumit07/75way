"use client";

import { BenefitsInfiniteCarousel } from "@/components/benefits-carousel";
import type { BenefitCardData } from "@/components/benefits-carousel";
import { GlobalEventsImpactSection } from "@/components/GlobalEventsImpactSection";

const DEFAULT_BENEFIT_CARDS: BenefitCardData[] = [
  {
    id: "client-centric",
    titleLead: "Client-",
    titleRest: "Centric",
    caption: "Delivery Process",
  },
  {
    id: "mvp-ready",
    titleLead: "MVP ",
    titleRest: "Ready",
    caption: "in 21 Days",
  },
  {
    id: "support",
    titleLead: "24/7 ",
    titleRest: "Dedicated",
    caption: "Support Team",
  },
  {
    id: "cost",
    titleLead: "Cost-",
    titleRest: "Optimized",
    caption: "Engagement Models",
  },
  {
    id: "security",
    titleLead: "Enterprise-",
    titleRest: "Grade",
    caption: "Security & Compliance",
  },
  {
    id: "global",
    titleLead: "Global ",
    titleRest: "Delivery",
    caption: "Follow-the-sun Teams",
  },
];

export function UnbeatableBenefitsSection() {
  return (
    <>
      <GlobalEventsImpactSection />
      <BenefitsInfiniteCarousel
        title={<span className="text-primary">Unbeatable Benefits</span>}
        subtitle="That Power Your Vision With Success"
        cards={DEFAULT_BENEFIT_CARDS}
      />
    </>
  );
}
