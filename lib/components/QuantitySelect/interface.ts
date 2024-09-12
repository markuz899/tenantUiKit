export interface QuantitySelectProps {
  className?: string;
  disabledInput?: boolean;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  width?: string;
}
