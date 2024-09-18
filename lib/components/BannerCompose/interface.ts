import { ReactNode } from "react";

export interface BannerComposeProps {
  content?: ReactNode;
  kind?: "error" | "light-error" | "warning" | "success";
  title?: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  closable?: boolean;
}
