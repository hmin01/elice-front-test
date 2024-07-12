// Type
import type { PropsWithChildren } from "react";

export interface ModalContentProps extends PropsWithChildren {
  /** 너비 */
  width?: number | string;
}

export interface ModalProps extends ModalContentProps {
  /** 모달 표시 여부 */
  open?: boolean;
  /** 모달을 닫기 위한 이벤트 핸들러 */
  onClose?: () => void;
}
