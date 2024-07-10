// Lib
import JSZip from "jszip";
// React hook
import { useCallback } from "react";
// Store
import { useSetFiles } from "@stores/editor";
// Type
import type { ChangeEvent } from "react";

/**
 * [Hook] 파일 업로드 처리 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useUploader() {
  // 업로드된 파일에 대한 상태 저장 함수
  const setFiles = useSetFiles();

  /** [Handler] 값 변경 이벤트 처리 */
  const onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      // 파일 데이터
      const file: File = target.files[0];
      // 확장자
      const extension: string = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
      // 확장자를 이용한 예외 처리
      if (extension !== "zip") {
        target.value = "";
        return alert("zip 확장자를 가진 압축 파일만 업로드 가능합니다");
      }

      // 파일 리더 객체 생성
      const reader = new FileReader();
      // 파일 읽기 이벤트 핸들러
      reader.onload = (e) => {
        if (e.target) {
          JSZip.loadAsync(e.target.result).then((data) => setFiles(transformToJSON(data.files)));
        }
      };
      // 파일 에러 이벤트 핸들러
      reader.onerror = (err) => alert(`[ERROR] ${err}`);

      // 업로드 파일 데이터 변환
      reader.readAsArrayBuffer(file);
    }
  }, []);

  return {
    /** 값 변경 이벤트 핸들러 */
    onChange,
  };
}

/**
 * [Internal Function] JSON 변환 함수
 * @param preObj 변환하고자 하는 객체 변수
 * @returns 변환된 객체 변수
 */
function transformToJSON(preObj: any): any {
  // 결과 객체
  const result: any = {};
  // 분석해야 하는 키(Key) 목록
  const keys: string[] = Object.keys(preObj);

  for (let i = 0; i < keys.length; i++) {
    // 서브 키(Sub key) 구분
    const subKeys: string[] = keys[i].split("/");
    // 결과 객체 참조
    let nestedObject: any = result;

    // 하위 키에 대한 처리
    for (let j = 0; j < subKeys.length; j++) {
      // 마지막 하위 레벨인 경우, 값 설정
      if (j === subKeys.length - 1) {
        // 예외 처리
        if (subKeys[j] === "") continue;
        // 데이터 추가
        nestedObject[subKeys[j]] = {
          type: "file",
          file: preObj[keys[i]],
        };
      }
      // 추가적인 하위 레벨이 있을 경우
      else {
        // 키(Key)가 없을 경우, 키에 대한 값 설정
        if (!nestedObject.hasOwnProperty(subKeys[j])) nestedObject[subKeys[j]] = { type: "directory", children: {} };
        // 현재 레벨의 객체 참조
        nestedObject = nestedObject[subKeys[j]].children;
      }
    }
  }
  // 결과 반환
  return result;
}
