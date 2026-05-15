export type BenefitCardData = {
  id: string;
  /** First line — leading accent segment (crimson in reference) */
  titleLead: string;
  /** First line — remainder (black) */
  titleRest: string;
  /** Bottom caption, black */
  caption: string;
};

export const BENEFITS_CAROUSEL_CARD_COUNT = 6 as const;
