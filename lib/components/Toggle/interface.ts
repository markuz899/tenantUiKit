export interface ToggleProps {
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: () => void;
  className?: string;
  colorBg?: string;
  label?: string;
  disabled?: boolean;
}
