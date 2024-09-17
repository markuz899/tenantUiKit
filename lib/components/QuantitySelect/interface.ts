export interface QuantitySelectProps {
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  width?: string;
}
