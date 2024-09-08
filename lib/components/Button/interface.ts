import { KIND } from "./styled";
/* eslint-disable */
type KindKeys = keyof typeof KIND;

export interface ButtonProps {
  kind?: KindKeys;
  icon?: string;
  size?: any;
  iconSize?: string;
  label?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: any;
  reverse?: boolean;
  round?: boolean;
  fluid?: boolean;
  className?: string;
  loading?: boolean;
  loadingColor?: string;
  disabled?: boolean;
  type?: any;
}

export interface StyledButtonProps {
  size: any;
  $fluid?: boolean;
  reverse?: boolean;
  $round?: boolean;
  kind: KindKeys;
}
