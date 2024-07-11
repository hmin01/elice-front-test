// Lib
import JSZip from "jszip";
// React hook
import { useCallback } from "react";
// Store
import { clearOpenFiles, setFiles } from "@stores/editor";
// Type
import type { ChangeEvent } from "react";
// Utility
import { getExtension } from "@utilities/file";

/**
 * [Hook] 파일 업로드 처리 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useUploader() {
  /** [Handler] 값 변경 이벤트 처리 */
  const onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      // 파일 데이터
      const file: File = target.files[0];
      // 확장자
      const extension: string = getExtension(file.name);
      // 확장자를 이용한 예외 처리
      if (extension !== "zip") {
        target.value = "";
        return alert("zip 확장자를 가진 압축 파일만 업로드 가능합니다");
      }

      // 이전 업로드 데이터 초기화
      clearOpenFiles();

      // 파일 리더 객체 생성
      const reader = new FileReader();
      // 파일 읽기 이벤트 핸들러
      reader.onloadend = (e) => {
        if (e.target) {
          JSZip.loadAsync(e.target.result).then((data) => {
            setFiles(data.files);
          });
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
