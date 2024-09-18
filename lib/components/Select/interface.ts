export interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  options: { label: string; value: string | any; [key: string]: any }[];
  onChange: any;
  onInputChange?: (data: { value: string }) => void;
  placeholder?: string;
  topPlaceholder?: string;
  labelBgColor?: string;
  name?: string;
  showArrow?: boolean;
  iconBefore?: string;
  enableInput?: boolean;
  onClose?: () => void;
  hint?: string;
  isError?: boolean;
  message?: string;
  value?: string | string[];
  multiselect?: boolean;
  defaultValues?: any;
  readOnly?: boolean;
  className?: string;
  withFilter?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  width?: any;
  rounded?: boolean;
  clearable?: boolean;
}
