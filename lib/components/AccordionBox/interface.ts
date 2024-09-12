export interface FaqItem {
  question: string;
  answer: string;
  renderIcon?: any;
}

export interface AccordionProps {
  options: FaqItem[];
  inline?: boolean;
  multipleOpen?: boolean;
  withTruncate?: boolean;
}

export interface AccordionItemProps {
  faq: FaqItem;
  active: boolean;
  onToggle: () => void;
  $withTruncate: boolean;
}
