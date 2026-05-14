import type { LucideIcon } from "lucide-react";

export type AgentSubmenuItem = {
  id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
};

export type AgentCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  items: AgentSubmenuItem[];
};

export type AiAgentStoreSectionProps = {
  /** Optional prefix before the title line (e.g. product name). */
  eyebrow?: string;
  /** Primary title segment (dark). */
  title: string;
  /** Accent title segment (brand blue). */
  titleAccent: string;
  subheading: string;
  /** Defaults to built-in enterprise categories when omitted. */
  categories?: AgentCategory[];
  className?: string;
};
