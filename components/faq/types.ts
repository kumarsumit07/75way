import type { ReactNode } from "react";

export type FaqItem = {
  id: string;
  question: string;
  /** Rich text or plain string shown when expanded. */
  answer: ReactNode;
};
