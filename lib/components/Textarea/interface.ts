export interface TextareaProps {
  type?: string;
  topPlaceholder?: string;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  name?: string;
  isError?: any;
  onChange?: (
    event: { value: any; name?: string; type?: string },
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
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
  maxLength?: number;
  labelBgColor?: string;
  inputBgColor?: string;
}

export interface TextareaRef {
  focus: () => void;
}
