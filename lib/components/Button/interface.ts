import { KIND } from "./styled";

type KindKeys = keyof typeof KIND;

export interface ButtonProps {
  kind?: KindKeys;
  iconLeft?: string;
  iconRight?: string;
  size?: any;
  iconSize?: string;
  label?: string;
  children?: React.ReactNode;
  link?: boolean;
  onClick?: any;
  reverse?: boolean;
  round?: boolean;
  fluid?: boolean;
  className?: string;
  loading?: boolean;
  loadingColor?: string;
  disabled?: boolean;
  type?: any;
  icon?: any;
}

export interface StyledButtonProps {
  size: any;
  $fluid?: boolean;
  $reverse?: boolean;
  $round?: boolean;
  kind: KindKeys;
  icon: string;
  $iconLeft?: string;
  $iconRight?: string;
  $link?: boolean;
}
