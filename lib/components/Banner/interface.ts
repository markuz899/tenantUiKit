import { ReactNode } from "react";

export interface BannerProps {
  content?: ReactNode;
  kind?: "error" | "light-error" | "warning" | "success";
  active?: boolean;
  children?: ReactNode;
  className?: string;
  closable?: boolean;
  readMore?: boolean;
  max?: number;
}
