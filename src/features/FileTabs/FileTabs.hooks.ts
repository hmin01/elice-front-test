// Monaco
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// React hook
import { useCallback, useState } from "react";
// Store
import { addOpenFile, closeFile, setEdited, setSelected, setSelectedForTree, useGetEdited, useGetOpenFiles, useGetSelected } from "@stores/editor";
import { addFile, clearNewObject, useGetFiles, useGetNewObject } from "@stores/file";
// Type
import type { ChangeEvent } from "react";

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
 * [Hook] 파일 추가/삭제 핸들러 관련 커스텀 훅
 * @param onClose 모닫 닫기 이벤트 핸들러
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useFileHandler(onClose: () => void) {
  // 원본 Zip 파일 데이터
  const files = useGetFiles();
  // 새로 추가할 파일 또는 폴더 상태
  const newObject = useGetNewObject();
  // 입력 값 상태
  const [fileName, setFileName] = useState<string>("");

  /** [Handler] 파일 또는 폴더 추가 */
  const onAdd = useCallback(() => {
    if (newObject) {
      // 예외 처리
      if (fileName.trim() === "") return alert(`${newObject.type}명을 입력해 주세요`);
      else if (newObject.type === "파일" && !fileName.includes(".")) return alert("파일명에 확장자도 포함해 주세요");
      // 파일 키 생성(경로 + 파일명)
      const key: string = newObject.path !== "" ? newObject.path.concat(`/${fileName}`) : fileName;
      // 이름 중복에 대한 예외 처리
      if (files[key]) return alert(`해당 위치에 이미 같은 이름이 존재합니다. 다른 이름을 입력해 주세요`);
      // 파일 또는 폴더 추가
      if (newObject.type === "폴더") {
        addFile(key, { dir: true, isNew: true });
      } else {
        addFile(key, { dir: false, isNew: true });
        setEdited(key, "");
        // 생성된 파일을 편집할 수 있도록 바로 선택
        addOpenFile(key, fileName, "");
        setSelected(key);
        setSelectedForTree(key, true);
      }
      // 모달 닫기
      onClose();
    }
  }, [newObject, fileName, files, onClose]);
  /** [Handler] 파일 또는 폴더 이름 변경 */
  const onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setFileName(target.value), []);
  /** [Handler] 입력 엘리먼트 값 초기화 */
  const onClear = useCallback(() => {
    setFileName("");
    onClose();
  }, [onClose]);

  return {
    /** 파일 또는 폴더 추가 이벤트 핸들러 */
    onAdd,
    /** 파일 또는 폴더 이름 변경 이벤트 핸들러 */
    onChange,
    /** 입력 엘리먼트 값 초기화 이벤트 핸들러 */
    onClear,
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
/**
 * [Hook] Tabs 이벤트 핸들러 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useTabsHandler() {
  // 편집 중인 데이터
  const edited = useGetEdited();
  // 오픈된 파일 목록
  const openFiles = useGetOpenFiles();
  // 선택된 파일 키(Key)
  const selected = useGetSelected();
  // 선택된 파일
  const selectedFile = edited[selected] ? { name: openFiles[selected].name, value: edited[selected] } : openFiles[selected];

  /** [Handler] 탭 아이템 클릭 이벤트 처리 */
  const onClick = useCallback((key: string) => {
    setSelected(key);
    setSelectedForTree(key);
  }, []);
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
          const newKey: string = keyList[index === 0 ? index + 1 : index - 1];
          setSelected(newKey);
          setSelectedForTree(newKey);
        } else {
          setSelected("");
          setSelectedForTree("");
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
