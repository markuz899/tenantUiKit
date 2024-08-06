export interface CheckboxProps {
  refer?: React.Ref<HTMLInputElement>;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: any;
  buttonMode?: boolean;
  label?: string;
  isError?: boolean;
  message?: string;
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}
