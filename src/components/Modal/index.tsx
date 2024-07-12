// Hook
import { useModal } from "./Modal.hooks";
// Type
import type { ModalContentProps, ModalProps } from "./Modal.types";

export default function Modal({ children, open, onClose, width }: ModalProps) {
  // 모달 관리 변수 및 함수
  const { visible, onCloseNative } = useModal(open, onClose);

  return visible ? (
    <div className="fixed h-screen left-0 top-0 z-[999] w-screen" tabIndex={-1}>
      <div className="absolute bg-black/70 backdrop-blur h-full left-0 top-0 w-full" onClick={onCloseNative}></div>
      <div className="flex h-full items-center justify-center w-full z-[2]">
        <ModalContent width={width}>{children}</ModalContent>
      </div>
    </div>
  ) : (
    <></>
  );
}

function ModalContent({ children, width }: ModalContentProps) {
  // 너비 스타일
  const widthStyle: string = typeof width === "number" ? `${width}px` : typeof width === "string" ? width : "420px";

  return (
    <div className="bg-white max-h-[calc(100vh-96px)] overflow-y-auto relative rounded-lg shadow" style={{ width: widthStyle }}>
      {children}
    </div>
  );
}
