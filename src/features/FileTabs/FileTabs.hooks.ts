// Monaco
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// React hook
import { useCallback } from "react";
// Store
import { closeFile, setEdited, setSelected, useGetEdited, useGetOpenFiles, useGetSelected } from "@stores/editor";
import { clearNewObject, useGetNewObject } from "@stores/file";

/**
 * [Hook] 에디터 내용 편집 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function onChangeContent() {
  /** [Handler] 에디터 내용 편집에 대한 이벤트 처리 */
  const onChange = useCallback((key: string, value: string) => setEdited(key, value), []);

  return {
    /** 에디터 내용 편집 이벤트 핸들러 */
    onChange,
  };
}
/**
 * [Hook] 이벤트 핸들러 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useHandler() {
  // 편집 중인 데이터
  const edited = useGetEdited();
  // 오픈된 파일 목록
  const openFiles = useGetOpenFiles();
  // 선택된 파일 키(Key)
  const selected = useGetSelected();
  // 선택된 파일
  const selectedFile = edited[selected] ? { name: openFiles[selected].name, value: edited[selected] } : openFiles[selected];

  /** [Handler] 탭 아이템 클릭 이벤트 처리 */
  const onClick = useCallback((key: string) => setSelected(key), []);
  /** [Handler] 탭 아이템 삭제 이벤트 처리 */
  const onDelete = useCallback(
    (key: string) => {
      // 파일 닫기 처리
      closeFile(key);
      // 선택된 파일 키와 닫으려는 파일 키가 같을 경우
      if (selected === key) {
        const keyList = Object.keys(openFiles);
        const index: number = keyList.indexOf(key);
        // 선택된 파일 키 변경
        if (keyList.length > 1) {
          setSelected(keyList[index === 0 ? index + 1 : index - 1]);
        } else {
          setSelected("");
        }
      }
      // 닫으려는 파일에 대한 에디터 모델 제거
      monaco.editor.getModel(monaco.Uri.parse(`memory://${key}`))?.dispose();
    },
    [openFiles, selected]
  );

  return {
    /** 오픈된 파일 목록 */
    openFiles,
    /** 선택된 파일 키(Key) */
    selected,
    /** 선택된 파일 */
    selectedFile,
    /** 탭 아이템 클릭 이벤트 핸들러 */
    onClick,
    /** 탭 아이템 삭제 이벤트 핸들러 */
    onDelete,
  };
}
/**
 * [Hook] 모달을 위한 커스텀 훅
 * @returns 모달 상태 객체
 */
export function useModal() {
  // 새롭게 추가하기 위한 파일/폴더 정보
  const newObject = useGetNewObject();
  /** [Handler] 모달을 닫기 위한 이벤트 처리 */
  const onClose = useCallback(() => clearNewObject(), []);

  return {
    /**  */
    info: newObject,
    /** 모달을 닫기 위한 이벤트 핸들러 */
    onClose,
    /** 모달 오픈 상태 */
    open: newObject !== null,
  };
}
