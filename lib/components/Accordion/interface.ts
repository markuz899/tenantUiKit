export interface FaqItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  options: FaqItem[];
  inline?: boolean;
  multipleOpen?: boolean;
}

export interface AccordionItemProps {
  faq: FaqItem;
  active: boolean;
  onToggle: () => void;
}
