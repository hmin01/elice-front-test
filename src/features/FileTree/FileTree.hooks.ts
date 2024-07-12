// Monaco
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// React hook
import { useCallback, useEffect, useMemo, useState } from "react";
// Store
import { addOpenFile, closeFile, setSelected, setSelectedForTree, useGetSelected, useGetSelectedForTree } from "@stores/editor";
import { addNewObject, removeFile, useGetFileName, useGetFiles } from "@stores/file";
// Type
import type { MouseEvent } from "react";
import type { DirectoryType, FileTreeType, FileType } from "@dtypes/file";
// Utility
import { isImageFile, isNotEditable } from "@utilities/file";

/**
 * [Hook] 업로드 파일 가공을 위한 커스텀 훅
 * @returns 업로드 파일 데이터를 포함한 객체
 */
export function useFiles() {
  // 업로드된 파일 데이터
  const files = useGetFiles();
  // Tree UI를 위한 데이터 가공
  const processed = useMemo(() => (files ? transformToJSON(files) : {}), [files]);

  return {
    /** 파일 이름 */
    fileName: useGetFileName(),
    /** 파일 내 데이터 */
    files: processed,
  };
}
/**
 * [Hook] 아이템에 대한 커스텀 훅
 * @param data 아이템 데이터
 * @returns 변수 및 핸들러를 포함한 객체
 */
export function useItem(data: FileType) {
  // 선택된 파일 키(Key)
  const selectedKey = useGetSelected();
  // 선택된 파일 키(Key) (For Tree)
  const selectedForTree = useGetSelectedForTree();
  // 하위 목록 숨김 상태
  const [hidden, setHidden] = useState<boolean>(true);

  /** [Handler] 클릭 이벤트 처리 */
  const onClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      // 아이템 유형이 "폴더"일 경우
      if (data.isDir) {
        setSelectedForTree(data.key, true);
        setHidden((state) => !state);
      }
      // 아이템 유형이 "파일"일 경우
      else {
        if (data) {
          // 기타 편집 불가 확장자 예외 처리
          if (isNotEditable(data.name)) {
            return alert("해당 파일은 편집할 수 없습니다.");
          }

          // 새로 만든 파일일 경우
          if (data.isNew) {
            addOpenFile(data.key, data.name, "");
          }
          // 이미지 확장자 처리
          else if (isImageFile(data.name)) {
            data.file.async("blob").then((content: Blob) => {
              content.type;
              addOpenFile(data.key, data.name, URL.createObjectURL(content));
            });
          }
          // 기타 파일
          else {
            // 편집 내용 존재 여부에 따른 처리
            data.file.async("string").then((content: string) => {
              addOpenFile(data.key, data.name, content);
            });
          }
          setSelectedForTree(data.key);
        }
      }
    },
    [data]
  );

  /** 선택된 파일이 위치하는 경로를 파악하여 Tree에 표시 */
  useEffect(() => {
    if (data.isDir) {
      if (selectedKey !== "" && selectedKey.includes(data.key)) {
        setHidden(false);
      }
    }
  }, [selectedKey]);

  return {
    /** 하위 목록 숨김 상태 */
    hidden,
    /** 클릭 이벤트 핸들러 */
    onClick,
    /** 선택된 파일 키 */
    selected: selectedForTree[0],
  };
}
/**
 * [Hook] 트리 핸들러 관련 커스텀 훅
 * @returns 핸들러를 포함한 객체
 */
export function useTreeHandler() {
  // 선택된 파일 키 (For Tree)
  const selected = useGetSelectedForTree();
  // 선택된 파일 키 (For Tabs)
  const selectedForTabs = useGetSelected();

  /** [Handler] 파일 추가 */
  const onAddFile = useCallback(() => {
    const keys = selected[0].split("/");
    if (keys.length === 1) {
      addNewObject("파일", selected[1] === "폴더" ? selected[0] : "");
    } else {
      addNewObject("파일", keys.slice(0, keys.length - 1).join("/"));
    }
  }, [selected]);
  /** [Handler] 폴더 추가 */
  const onAddFolder = useCallback(() => {
    const keys = selected[0].split("/");
    if (keys.length === 1) {
      addNewObject("폴더", selected[1] === "폴더" ? selected[0] : "");
    } else {
      addNewObject("폴더", keys.slice(0, keys.length - 1).join("/"));
    }
  }, [selected]);
  /** [Handler] 공백 클릭 시, 선택 해제 */
  const onClick = useCallback(() => setSelectedForTree(""), []);
  /** [Handler] 파일 및 폴더 삭제 */
  const onDelete = useCallback(() => {
    if (selected[0] !== "") {
      if (confirm(`선택한 파일 또는 폴더를 삭제하시겠습니까?\n경로: /${selected[0]}`)) {
        // 파일 닫기
        closeFile(selected[0]);
        // 삭제하려는 파일이 에디터에서 수정 중인 파일인 경우
        if (selectedForTabs === selected[0]) {
          setSelected("");
          // 닫으려는 파일에 대한 에디터 모델 제거
          monaco.editor.getModel(monaco.Uri.parse(`memory://${selected}`))?.dispose();
        }
        // 삭제
        removeFile(selected[0], selected[1] === "폴더");
        // 선택 상태 해제
        setSelectedForTree("");
      }
    }
  }, [selected, selectedForTabs]);

  return {
    /** 파일 추가 이벤트 핸들러 */
    onAddFile,
    /** 폴더 추가 이벤트 핸들러 */
    onAddFolder,
    /** 공백 클릭 시, 선택 해제 이벤트 핸들러 */
    onClick,
    /** 파일 및 폴더 삭제 이벤트 핸들러 */
    onDelete,
  };
}

/**
 * [Internal Function] JSON 변환 함수
 * @param preObj 변환하고자 하는 객체 변수
 * @returns 변환된 객체 변수
 */
function transformToJSON(preObj: any): any {
  // 결과 객체
  const result: FileTreeType = {};
  // 분석해야 하는 키(Key) 목록
  const keys: string[] = Object.keys(preObj);

  for (let i = 0; i < keys.length; i++) {
    // 서브 키(Sub key) 구분
    const subKeys: string[] = keys[i].split("/");
    // 결과 객체 참조
    let nestedObject: FileTreeType = result;

    // 하위 키에 대한 처리
    for (let j = 0; j < subKeys.length; j++) {
      // 마지막 하위 레벨인 경우, 값 설정
      if (j === subKeys.length - 1) {
        // 예외 처리
        if (subKeys[j] === "" || subKeys[j].charAt(0) === ".") continue;
        // 데이터 추가
        nestedObject[subKeys[j]] = preObj[keys[i]].dir
          ? {
              children: {},
              isDir: true,
              isNew: preObj[keys[i]].isNew,
              key: subKeys.slice(0, j + 1).join("/"),
              name: subKeys[j],
            }
          : {
              file: preObj[keys[i]],
              isDir: false,
              isNew: preObj[keys[i]].isNew,
              key: keys[i],
              name: subKeys[j],
            };
      }
      // 추가적인 하위 레벨이 있을 경우
      else {
        // 키(Key)가 없을 경우, 키에 대한 값 설정
        if (!nestedObject.hasOwnProperty(subKeys[j])) nestedObject[subKeys[j]] = { children: {}, isDir: true, key: subKeys.slice(0, j + 1).join("/"), name: subKeys[j] };
        // 현재 레벨의 객체 참조
        nestedObject = (nestedObject[subKeys[j]] as DirectoryType).children;
      }
    }
  }
  // 결과 반환
  return result;
}
