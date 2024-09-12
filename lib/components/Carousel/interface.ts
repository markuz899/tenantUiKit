export interface CarouselProps {
  options: { text?: string; path: string; [key: string]: any }[];
  className?: string;
  type?: string;
  background?: string;
  withPagination?: boolean;
  hovered?: boolean;
}
