import { ReactNode } from "react";

export interface BannerProps {
  title?: string;
  content?: ReactNode;
  kind?: "warning" | "success" | "error" | "info";
  active?: boolean;
  children?: ReactNode;
  className?: string;
}
