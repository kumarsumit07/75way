import {
  BarChart3,
  CreditCard,
  Factory,
  Gavel,
  Headset,
  LineChart,
  Megaphone,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { AgentCategory } from "./types";

/** 
 * Use the exact IDs provided by the user. 
 * Optimized for maximum loading reliability.
 */
const P = {
  dash1: "/assets/images/unsplash-1551288049-bebda4e38f71.webp",
  dash2: "/assets/images/unsplash-1460925895917-afdab827c52f.webp",
  dash3: "/assets/images/unsplash-1551434678-e076c223a692.webp",
  dash4: "/assets/images/unsplash-1551288049-bebda4e38f71.webp",
  tablet1: "/assets/images/unsplash-1551434678-e076c223a692.webp",
  tablet2: "/assets/images/unsplash-1551434678-e076c223a692.webp",
  office1: "/assets/images/unsplash-1499951360447-b19be8fe80f5.webp",
  office2: "/assets/images/unsplash-1499951360447-b19be8fe80f5.webp",
  laptop1: "/assets/images/unsplash-1499951360447-b19be8fe80f5.webp",
  laptop2: "/assets/images/unsplash-1486312338219-ce68d2c6f44d.webp",
  data1: "/assets/images/unsplash-1531297484001-80022131f5a1.webp",
  data2: "/assets/images/unsplash-1560250097-0b93528c311a.webp",
  meeting1: "/assets/images/unsplash-1555066931-4365d14bab8c.webp",
  meeting2: "/assets/images/unsplash-1515187029135-18ee286d815b.webp",
  finance1: "/assets/images/unsplash-1554224155-6726b3ff858f.webp",
  finance2: "/assets/images/unsplash-1560472355-536de3962603.webp",
  code1: "/assets/images/unsplash-1498050108023-c5249f4df085.webp",
  code2: "/assets/images/unsplash-1555066931-4365d14bab8c.webp",
  security: "/assets/images/unsplash-1550751827-4bd374c3f58b.webp",
  future: "/assets/images/unsplash-1451187580459-43490279c0fa.webp",
};

function items(
  defs: { title: string; description?: string; key: keyof typeof P }[]
) {
  return defs.map((d, i) => ({
    id: `${d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`,
    title: d.title,
    description: d.description,
    image: P[d.key],
    imageAlt: `${d.title} — AI agent dashboard preview`,
  }));
}

const sales: AgentCategory = {
  id: "sales",
  label: "Sales",
  icon: LineChart,
  items: items([
    { title: "Lead Scoring & Routing", description: "Prioritize revenue-ready opportunities automatically.", key: "dash1" },
    { title: "Pipeline Forecasting", description: "Predict close dates with live deal telemetry.", key: "dash2" },
    { title: "Proposal Generation", description: "Draft tailored proposals from CRM context.", key: "tablet1" },
    { title: "Account Intelligence", description: "Surface whitespace and churn risk early.", key: "data1" },
    { title: "Quote-to-Cash Assist", description: "Validate pricing, terms, and approvals.", key: "finance1" },
    { title: "Meeting Briefings", description: "Pre-call dossiers with next-best actions.", key: "meeting1" },
    { title: "Territory Planning", description: "Balance quotas with capacity and TAM.", key: "dash3" },
  ]),
};

const bpo: AgentCategory = {
  id: "bpo",
  label: "BPO / Customer Support",
  icon: Headset,
  items: items([
    { title: "Ticket Triage & Routing", description: "Intent-aware queues with SLA guardrails.", key: "dash4" },
    { title: "Knowledge Deflection", description: "Resolve L1 with grounded answers.", key: "tablet2" },
    { title: "Sentiment & Escalation", description: "Detect frustration before it churns.", key: "dash2" },
    { title: "Quality Assurance Sampling", description: "Score interactions against rubrics.", key: "data2" },
    { title: "Back-Office Forms", description: "Extract, validate, and file structured data.", key: "office1" },
    { title: "Voice of Customer", description: "Cluster themes across channels.", key: "meeting2" },
  ]),
};

const legal: AgentCategory = {
  id: "legal",
  label: "Legal",
  icon: Gavel,
  items: items([
    { title: "Contract Creation & Drafting", description: "Clause libraries with policy alignment.", key: "tablet1" },
    { title: "Contract Review & Validation", description: "Flag risky language against playbooks.", key: "dash1" },
    { title: "Contract Analysis & Risk Assessment", description: "Score exposure across portfolios.", key: "dash2" },
    { title: "Legal Feedback & Reconciliation", description: "Merge redlines with audit trails.", key: "data1" },
    { title: "Contract Approval & Workflow", description: "Route signatures with enterprise controls.", key: "office2" },
    { title: "Compliance & Regulatory Oversight", description: "Continuous control monitoring.", key: "finance2" },
    { title: "Clause Extraction & Recommendation", description: "Mine obligations and renewal windows.", key: "code1" },
    { title: "Contract Monitoring & Notifications", description: "Proactive breach and milestone alerts.", key: "dash3" },
  ]),
};

const hr: AgentCategory = {
  id: "hr",
  label: "Human Resource",
  icon: Users,
  items: items([
    { title: "Recruitment & Candidate Evaluation", description: "Structured screening at scale.", key: "meeting1" },
    { title: "Offer & Onboarding Management", description: "Personalized journeys with compliance.", key: "tablet2" },
    { title: "Performance Management", description: "Goals, feedback, and calibration support.", key: "dash1" },
    { title: "Policy & HR Helpdesk", description: "Grounded answers from your handbook.", key: "tablet1" },
    { title: "Payroll & Benefits Checks", description: "Catch anomalies before payroll runs.", key: "finance1" },
    { title: "Workforce Planning", description: "Skills gaps and capacity forecasting.", key: "dash4" },
    { title: "Employee Relations Insights", description: "Themes from surveys and tickets.", key: "data1" },
  ]),
};

const marketing: AgentCategory = {
  id: "marketing",
  label: "Marketing",
  icon: Megaphone,
  items: items([
    { title: "Campaign Briefs & Variants", description: "Generate channel-ready creative.", key: "dash1" },
    { title: "Audience Segmentation", description: "Propensity models on first-party data.", key: "future" },
    { title: "Content QA & Brand Voice", description: "Enforce tone and claims compliance.", key: "tablet1" },
    { title: "SEO & Metadata Ops", description: "Bulk optimize pages with guardrails.", key: "code2" },
    { title: "Launch Analytics", description: "Attribution snapshots for stakeholders.", key: "dash2" },
    { title: "Competitive Intel Digests", description: "Weekly market moves summarized.", key: "meeting2" },
  ]),
};

const finance: AgentCategory = {
  id: "finance",
  label: "Finance",
  icon: BarChart3,
  items: items([
    { title: "Inquiry Resolution", description: "Resolve AR/AP questions with evidence.", key: "dash1" },
    { title: "Invoice Management", description: "Match PO, GRN, and invoice lines.", key: "finance1" },
    { title: "Accounts & Payment Processing", description: "Exception queues with suggested fixes.", key: "dash2" },
    { title: "Financial Data Validation", description: "Reconcile subledgers to controls.", key: "data2" },
    { title: "Risk & Compliance Monitoring", description: "Continuous policy checks on journals.", key: "tablet2" },
    { title: "Reporting Automation", description: "Narratives for month-end packs.", key: "office1" },
    { title: "Cash Flow & Liquidity Views", description: "Scenario planning with live signals.", key: "dash3" },
    { title: "Budgeting & Forecasting", description: "Driver-based models with variance.", key: "laptop1" },
  ]),
};

const procurement: AgentCategory = {
  id: "procurement",
  label: "Procurement",
  icon: ShoppingCart,
  items: items([
    { title: "Invoice Management", description: "Three-way match with tolerance rules.", key: "finance1" },
    { title: "Accounts Receivable Management", description: "Collections prioritization.", key: "dash2" },
    { title: "Procurement Management", description: "Supplier scorecards and renewals.", key: "data2" },
    { title: "Contract Management", description: "Obligation tracking across vendors.", key: "tablet1" },
    { title: "Expense Management", description: "Policy checks on T&E submissions.", key: "laptop2" },
    { title: "Vendor Risk Monitoring", description: "Sanctions and financial health signals.", key: "meeting1" },
  ]),
};

const operations: AgentCategory = {
  id: "operations",
  label: "Operations",
  icon: Factory,
  items: items([
    { title: "Order Management", description: "End-to-end order orchestration.", key: "dash1" },
    { title: "Trade & Risk Intelligence", description: "Live risk scoring across trades.", key: "dash2" },
    { title: "Order Exception & Analytics", description: "Root-cause clusters for backlog.", key: "future" },
    { title: "Order Optimization", description: "Routing and inventory suggestions.", key: "tablet2" },
    { title: "Returns Management", description: "Authorize and track returns faster.", key: "office2" },
    { title: "Returns Logistics", description: "Carrier SLAs and warehouse sync.", key: "laptop1" },
    { title: "Operational Management", description: "Control tower KPIs and alerts.", key: "dash3" },
  ]),
};

const billing: AgentCategory = {
  id: "billing",
  label: "Billing",
  icon: CreditCard,
  items: items([
    { title: "Usage Rating & Mediation", description: "High-volume rating with audit trails.", key: "data2" },
    { title: "Invoice Generation & Delivery", description: "Multi-entity billing templates.", key: "finance2" },
    { title: "Payment Allocation", description: "Apply cash with fuzzy matching.", key: "dash2" },
    { title: "Dispute & Adjustment Workflow", description: "Guided resolution with policy hints.", key: "tablet1" },
    { title: "Revenue Recognition", description: "ASC 606 / IFRS 15 assistance.", key: "dash4" },
    { title: "Collections Assist", description: "Dunning with tone-safe outreach.", key: "meeting2" },
  ]),
};

/** Default 9 top-level categories for the Agent Store showcase. */
export const DEFAULT_AGENT_STORE_CATEGORIES: AgentCategory[] = [
  sales,
  bpo,
  legal,
  hr,
  marketing,
  finance,
  procurement,
  operations,
  billing,
];
