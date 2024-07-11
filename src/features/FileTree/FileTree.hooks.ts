// React hook
import { useCallback, useMemo, useState } from "react";
// Store
import { addOpenFile, useGetFiles } from "@stores/editor";
// Type
import type { DirectoryType, FileTreeType, FileType } from "@dtypes/file";
// Utility
import { getExtension } from "@utilities/file";

/**
 * [Hook] 업로드 파일 가공을 위한 커스텀 훅
 * @returns 업로드 파일 데이터를 포함한 객체
 */
export function useFiles() {
  const files = useGetFiles();
  // Tree UI를 위한 데이터 가공
  const processed = useMemo(() => (files ? transformToJSON(files) : {}), [files]);

  return {
    files: processed,
  };
}
/**
 * [Hook] 아이템에 대한 커스텀 훅
 * @param type 아이템 유형
 * @param data 아이템 데이터
 * @returns 변수 및 핸들러를 포함한 객체
 */
export function useItem(type: "directory" | "file", data?: FileType) {
  // 하위 목록 숨김 상태
  const [hidden, setHidden] = useState<boolean>(true);

  /** [Handler] 클릭 이벤트 처리 */
  const onClick = useCallback(() => {
    // 아이템 유형이 "폴더"일 경우
    if (type === "directory") {
      setHidden((state) => !state);
    }
    // 아이템 유형이 "파일"일 경우
    else {
      if (data) {
        // 파일 확장자
        const extension: string = getExtension(data.name);
        // 이미지 확장자 예외 처리
        if (["gif", "jpeg", "jpg", "png"].includes(extension)) {
          return;
        }
        // 기타 편집 불가 확장자 예외 처리
        else if (["bmp", "clip", "doc", "docx", "hwp", "pdf", "psd", "sai", "tga", "tif", "tiff", "xlsx"].includes(extension)) {
          return;
        }

        // 파일 내용 읽기
        data.file.async("string").then((content: string) => {
          addOpenFile(data.key, data.name, content);
        });
      }
    }
  }, [data, type]);

  return {
    /** 하위 목록 숨김 상태 */
    hidden,
    /** 클릭 이벤트 핸들러 */
    onClick,
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
        if (subKeys[j] === "") continue;
        // 데이터 추가
        nestedObject[subKeys[j]] = {
          file: preObj[keys[i]],
          name: subKeys[j],
          key: keys[i],
          type: "file",
        };
      }
      // 추가적인 하위 레벨이 있을 경우
      else {
        // 키(Key)가 없을 경우, 키에 대한 값 설정
        if (!nestedObject.hasOwnProperty(subKeys[j])) nestedObject[subKeys[j]] = { type: "directory", children: {} };
        // 현재 레벨의 객체 참조
        nestedObject = (nestedObject[subKeys[j]] as DirectoryType).children;
      }
    }
  }
  // 결과 반환
  return result;
}
