export interface OptionProps {
  label?: any;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
}

export interface RadioButtonProps {
  options: OptionProps[];
  className?: string;
  onChange?: (option: OptionProps & { name: string; value: any }) => void;
  name?: string;
  inline?: boolean;
  isError?: boolean;
  defaultValue?: any;
}
