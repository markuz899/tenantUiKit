export interface BadgeProps {
  label?: string;
  children?: any;
  onClick?: (label: string) => void;
  className?: string;
  iconClose?: boolean;
  kind?: "warning" | "success" | "error" | "info" | "ghost";
}
