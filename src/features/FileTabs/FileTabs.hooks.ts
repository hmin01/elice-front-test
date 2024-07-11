// Hook
import { useCallback } from "react";
// Store
import { closeFile, setSelected, useGetOpenFiles, useGetSelected } from "@stores/editor";

/**
 * [Hook] 파일 목록에 대한 커스텀 훅
 * @returns 파일 목록을 포함한 객체
 */
export function useFiles() {
  // 오픈된 파일 목록
  const openFiles = useGetOpenFiles();
  // 선택된 파일 키(Key)
  const selected = useGetSelected();
  // 선택된 파일
  const selectedFile = openFiles[selected];

  return {
    /** 오픈된 파일 목록 */
    openFiles,
    /** 선택된 파일 키(Key) */
    selected,
    /** 선택된 파일 */
    selectedFile,
  };
}
/**
 * [Hook] 이벤트 핸들러 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useHandler() {
  // 선택된 파일 키(Key)
  const selected = useGetSelected();

  /** [Handler] 탭 아이템 클릭 이벤트 처리 */
  const onClick = useCallback((key: string) => setSelected(key), []);
  /** [Handler] 탭 아이템 삭제 이벤트 처리 */
  const onDelete = useCallback(
    (key: string) => {
      // 파일 닫기 처리
      closeFile(key);
      // 선택된 파일 키 초기화
      if (selected === key) setSelected("");
    },
    [selected]
  );

  return {
    /** 탭 아이템 클릭 이벤트 핸들러 */
    onClick,
    /** 탭 아이템 삭제 이벤트 핸들러 */
    onDelete,
  };
}
