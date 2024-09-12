export interface DropdownProps {
  renderTarget: ({
    show,
    close,
    visible,
  }: {
    show: () => void;
    close: () => void;
    visible: boolean;
  }) => React.ReactNode;
  renderDropdown?: ({
    show,
    close,
    visible,
  }: {
    show: () => void;
    close: () => void;
    visible: boolean;
  }) => React.ReactNode;
  showArrow?: boolean;
  width?: number;
  fluid?: boolean;
  fullWidth?: boolean;
  onClose?: () => void;
  includeTarget?: boolean;
  includeIcon?: boolean;
  leftPosition?: number;
  topPosition?: number;
  className?: string;
  children?: any;
}
