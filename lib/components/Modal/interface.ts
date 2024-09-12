export interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  render?: (props: { close: () => void }) => React.ReactNode;
  onClickOther?: boolean;
  onClose?: () => void;
  size?: [number | null, number | null];
  isVisible?: boolean;
  noTitle?: boolean;
  noCloseIcon?: boolean;
  className?: string;
  fullScreen?: boolean;
  rightScreen?: boolean;
  fluid?: boolean;
  disableOverflow?: boolean,
  portalId?: string
}

export interface ModalRootProps {
  $fullScreen?: boolean;
  $noTitle?: boolean;
  rightScreen?: boolean;
}

export interface ModalContentProps {
  size: [number | null, number | null];
  $noTitle?: boolean;
  $fullScreen?: boolean;
  rightScreen?: boolean;
  $disableOverflow?: boolean
}
