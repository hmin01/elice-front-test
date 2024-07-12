// React hook
import { useCallback, useEffect, useState } from "react";

/**
 * [Hook] 모달 관리를 위한 커스텀 훅
 * @param open 모달 표시 상태 (부모로부터 받은 속성)
 * @param onClose 모닫을 닫기 위한 이벤트 핸들러 (부모로부터 받은 속성)
 * @returns 모달 관리 변수 및 함수
 */
export function useModal(open?: boolean, onClose?: () => void) {
  // 모달 표시 여부
  const [visible, setVisible] = useState<boolean>(false);

  /** [Handler] 모달을 닫기 위한 이벤트 처리 */
  const onCloseNative = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    // 표시 상태 변경
    if (open !== undefined) setVisible(open);
    // 렌더링 시, Body에 대한 스크롤 활성/비활성화
    document.body.style.overflow = open ? "hidden" : "auto";
    // 언마운트 시, Body에 대한 스크롤 활성화
    () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return {
    /** 모달 표시 상태 */
    visible,
    /** 모달을 닫기 위한 이벤트 */
    onCloseNative,
  };
}
