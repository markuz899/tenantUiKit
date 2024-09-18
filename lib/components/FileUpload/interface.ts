export interface InputProps {
  type?: string;
  placeholder?: string;
  topPlaceholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  isError?: boolean;
  hint?: string;
  isWarning?: boolean;
  onChange?: any;
  message?: string;
  showPasswordIcon?: boolean;
  icon?: string;
  iconBefore?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  enableControlledInput?: boolean;
  uppercase?: boolean;
  withFilter?: boolean;
  autoComplete?: string;
  maxSize?: number;
  inputSelectAction?: {
    visible: boolean;
    show: () => void;
    close: () => void;
  };
  labelBgColor?: string;
  inputBgColor?: string;
  clearable?: boolean;
  [key: string]: any;
}

export interface InputRef {
  focus: () => void;
}
