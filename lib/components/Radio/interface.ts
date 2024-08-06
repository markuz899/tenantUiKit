/* eslint-disable */
export interface RadioOption {
  label: string;
  value: any;
}

export interface RadioProps {
  name: string;
  label?: string;
  options: RadioOption[];
  onChange: (
    selectedOption: { label: string; value: any; name: string },
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  inline?: any;
  defaultValue?: any;
  isError?: boolean;
  message?: string;
  disabled?: boolean;
}
