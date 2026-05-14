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

const img = (photoId: string, w = 1800) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=88`;

/** Rotating dashboard / tablet style shots for variety. */
const P = {
  dash1: img("1460925895917-afdab827c52f"),
  dash2: img("1551288049-bebda4e38f71"),
  dash3: img("1551434678-e076c223a692"),
  tablet1: img("1517245383298-b4e0547e8e44"),
  tablet2: img("1522071820081-009f0129c71c"),
  office: img("1497215728101-856f4ea74a97"),
  laptop: img("1454165804606-c3d57bc86b40"),
  data: img("1543286386-713bdd548c4e"),
  meeting: img("1542744173-05336fcc1adb"),
  finance: img("1554224154-6726b3ff858f"),
  health: img("1576091160399-112ba8d25d1d"),
  code: img("1555066931-4365d14bab8c"),
};

function items(
  defs: { title: string; description?: string; key: keyof typeof P }[]
) {
  return defs.map((d, i) => ({
    id: `${d.title.toLowerCase().replace(/\s+/g, "-")}-${i}`,
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
    { title: "Account Intelligence", description: "Surface whitespace and churn risk early.", key: "data" },
    { title: "Quote-to-Cash Assist", description: "Validate pricing, terms, and approvals.", key: "finance" },
    { title: "Meeting Briefings", description: "Pre-call dossiers with next-best actions.", key: "meeting" },
    { title: "Territory Planning", description: "Balance quotas with capacity and TAM.", key: "dash3" },
  ]),
};

const bpo: AgentCategory = {
  id: "bpo",
  label: "BPO / Customer Support",
  icon: Headset,
  items: items([
    { title: "Ticket Triage & Routing", description: "Intent-aware queues with SLA guardrails.", key: "dash1" },
    { title: "Knowledge Deflection", description: "Resolve L1 with grounded answers.", key: "tablet2" },
    { title: "Sentiment & Escalation", description: "Detect frustration before it churns.", key: "dash2" },
    { title: "Quality Assurance Sampling", description: "Score interactions against rubrics.", key: "data" },
    { title: "Back-Office Forms", description: "Extract, validate, and file structured data.", key: "office" },
    { title: "Voice of Customer", description: "Cluster themes across channels.", key: "meeting" },
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
    { title: "Legal Feedback & Reconciliation", description: "Merge redlines with audit trails.", key: "data" },
    { title: "Contract Approval & Workflow", description: "Route signatures with enterprise controls.", key: "office" },
    { title: "Compliance & Regulatory Oversight", description: "Continuous control monitoring.", key: "finance" },
    { title: "Clause Extraction & Recommendation", description: "Mine obligations and renewal windows.", key: "code" },
    { title: "Contract Monitoring & Notifications", description: "Proactive breach and milestone alerts.", key: "dash3" },
  ]),
};

const hr: AgentCategory = {
  id: "hr",
  label: "Human Resource",
  icon: Users,
  items: items([
    { title: "Recruitment & Candidate Evaluation", description: "Structured screening at scale.", key: "meeting" },
    { title: "Offer & Onboarding Management", description: "Personalized journeys with compliance.", key: "tablet2" },
    { title: "Performance Management", description: "Goals, feedback, and calibration support.", key: "dash1" },
    { title: "Policy & HR Helpdesk", description: "Grounded answers from your handbook.", key: "tablet1" },
    { title: "Payroll & Benefits Checks", description: "Catch anomalies before payroll runs.", key: "finance" },
    { title: "Workforce Planning", description: "Skills gaps and capacity forecasting.", key: "dash2" },
    { title: "Employee Relations Insights", description: "Themes from surveys and tickets.", key: "data" },
  ]),
};

const marketing: AgentCategory = {
  id: "marketing",
  label: "Marketing",
  icon: Megaphone,
  items: items([
    { title: "Campaign Briefs & Variants", description: "Generate channel-ready creative.", key: "dash1" },
    { title: "Audience Segmentation", description: "Propensity models on first-party data.", key: "data" },
    { title: "Content QA & Brand Voice", description: "Enforce tone and claims compliance.", key: "tablet1" },
    { title: "SEO & Metadata Ops", description: "Bulk optimize pages with guardrails.", key: "code" },
    { title: "Launch Analytics", description: "Attribution snapshots for stakeholders.", key: "dash2" },
    { title: "Competitive Intel Digests", description: "Weekly market moves summarized.", key: "meeting" },
  ]),
};

const finance: AgentCategory = {
  id: "finance",
  label: "Finance",
  icon: BarChart3,
  items: items([
    { title: "Inquiry Resolution", description: "Resolve AR/AP questions with evidence.", key: "dash1" },
    { title: "Invoice Management", description: "Match PO, GRN, and invoice lines.", key: "finance" },
    { title: "Accounts & Payment Processing", description: "Exception queues with suggested fixes.", key: "dash2" },
    { title: "Financial Data Validation", description: "Reconcile subledgers to controls.", key: "data" },
    { title: "Risk & Compliance Monitoring", description: "Continuous policy checks on journals.", key: "tablet2" },
    { title: "Reporting Automation", description: "Narratives for month-end packs.", key: "office" },
    { title: "Cash Flow & Liquidity Views", description: "Scenario planning with live signals.", key: "dash3" },
    { title: "Budgeting & Forecasting", description: "Driver-based models with variance.", key: "laptop" },
  ]),
};

const procurement: AgentCategory = {
  id: "procurement",
  label: "Procurement",
  icon: ShoppingCart,
  items: items([
    { title: "Invoice Management", description: "Three-way match with tolerance rules.", key: "finance" },
    { title: "Accounts Receivable Management", description: "Collections prioritization.", key: "dash2" },
    { title: "Procurement Management", description: "Supplier scorecards and renewals.", key: "data" },
    { title: "Contract Management", description: "Obligation tracking across vendors.", key: "tablet1" },
    { title: "Expense Management", description: "Policy checks on T&E submissions.", key: "dash1" },
    { title: "Vendor Risk Monitoring", description: "Sanctions and financial health signals.", key: "meeting" },
  ]),
};

const operations: AgentCategory = {
  id: "operations",
  label: "Operations",
  icon: Factory,
  items: items([
    { title: "Order Management", description: "End-to-end order orchestration.", key: "dash1" },
    { title: "Trade & Risk Intelligence", description: "Live risk scoring across trades.", key: "dash2" },
    { title: "Order Exception & Analytics", description: "Root-cause clusters for backlog.", key: "data" },
    { title: "Order Optimization", description: "Routing and inventory suggestions.", key: "tablet2" },
    { title: "Returns Management", description: "Authorize and track returns faster.", key: "office" },
    { title: "Returns Logistics", description: "Carrier SLAs and warehouse sync.", key: "laptop" },
    { title: "Operational Management", description: "Control tower KPIs and alerts.", key: "dash3" },
  ]),
};

const billing: AgentCategory = {
  id: "billing",
  label: "Billing",
  icon: CreditCard,
  items: items([
    { title: "Usage Rating & Mediation", description: "High-volume rating with audit trails.", key: "data" },
    { title: "Invoice Generation & Delivery", description: "Multi-entity billing templates.", key: "finance" },
    { title: "Payment Allocation", description: "Apply cash with fuzzy matching.", key: "dash2" },
    { title: "Dispute & Adjustment Workflow", description: "Guided resolution with policy hints.", key: "tablet1" },
    { title: "Revenue Recognition", description: "ASC 606 / IFRS 15 assistance.", key: "dash1" },
    { title: "Collections Assist", description: "Dunning with tone-safe outreach.", key: "meeting" },
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
