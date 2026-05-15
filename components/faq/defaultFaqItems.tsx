import type { FaqItem } from "./types";

/** Twelve FAQs — left column first six, right column second six (desktop). */
export const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "mobile-services",
    question: "What mobile app development services does 75way offer?",
    answer:
      "We design and build native and cross-platform apps, product discovery, UX/UI, backend APIs, QA, release management, and ongoing optimization—so you can ship polished mobile products end-to-end with a single accountable engineering partner.",
  },
  {
    id: "cost-timeline",
    question: "What Is The Average Cost And Timeline For Mobile App Development?",
    answer:
      "Scope and complexity drive both; a focused MVP might move in weeks, while enterprise-grade platforms take longer. We align on milestones, transparent estimates, and phased delivery so you always know cost drivers, tradeoffs, and expected timelines before we write production code.",
  },
  {
    id: "software-services",
    question: "What Software Development Services Do You Provide?",
    answer:
      "Custom web platforms, cloud-native services, integrations, modernization of legacy systems, data pipelines, and automation—built with security, observability, and maintainability as first-class concerns rather than afterthoughts.",
  },
  {
    id: "security-quality",
    question: "How Do You Ensure Software Security And Quality?",
    answer:
      "We combine secure SDLC practices, code review, automated testing, dependency hygiene, and pragmatic threat modeling tailored to your domain—paired with CI quality gates so regressions are caught early and releases stay predictable.",
  },
  {
    id: "integration-migration",
    question: "Does 75way Support Software Integration And Data Migration?",
    answer:
      "Yes. We connect systems via APIs, events, and ETL where appropriate, plan cutovers with rollback paths, and validate data integrity so teams can migrate confidently without freezing the business during the transition.",
  },
  {
    id: "web-mobile",
    question: "Do You Develop Solutions For Both Web And Mobile Platforms?",
    answer:
      "Absolutely. We often deliver paired web consoles and mobile experiences with shared contracts and design systems—keeping UX coherent while tailoring each surface to its platform strengths and user context.",
  },
  {
    id: "approach",
    question: "What Is Your Development Approach?",
    answer:
      "We start with outcomes and constraints, shape a thin vertical slice early, then iterate in tight feedback loops with visible demos. Engineering decisions stay tied to product risk so we invest depth where it moves the needle—not everywhere at once.",
  },
  {
    id: "project-management",
    question: "How does 75way handle project management?",
    answer:
      "You get clear ownership, weekly rhythm, async updates, and tooling that fits your team—whether that is Linear, Jira, or something lighter. Risks, scope changes, and decisions are documented so stakeholders stay aligned without meeting overload.",
  },
  {
    id: "ai-legacy",
    question: "Can AI be integrated into existing legacy software?",
    answer:
      "Yes, when the data model and interfaces allow it. We assess latency, governance, and human-in-the-loop needs, then integrate models or agents behind stable APIs so legacy cores stay reliable while new intelligence ships incrementally.",
  },
  {
    id: "data-analytics",
    question: "What Data Analytics Services Does 75way Provide?",
    answer:
      "From dashboards and KPI definitions to pipelines, warehousing patterns, and lightweight ML where it helps—we focus on decisions your operators can trust, with lineage and refresh SLAs that match how the business actually runs.",
  },
  {
    id: "ai-usa",
    question: "How Does 75way Deliver AI Solutions For USA Businesses?",
    answer:
      "We collaborate across time zones with clear handoffs, security expectations, and compliance-aware architectures—shipping incrementally so U.S. teams can validate value early while governance and documentation scale with the product.",
  },
  {
    id: "custom-usa",
    question: "Does 75way Offer Custom App Development In The USA?",
    answer:
      "We build tailored applications for U.S. startups, SMEs, and enterprises—embedding with your stakeholders, aligning to your procurement and security norms, and delivering maintainable codebases your team can own long-term.",
  },
];
