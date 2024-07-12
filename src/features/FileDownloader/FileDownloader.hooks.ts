// Lib
import JSZip from "jszip";
// React hook
import { useCallback } from "react";
// Store
import { useGetEdited } from "@stores/editor";
import { useGetFiles, useGetFileName } from "@stores/file";

/**
 * [Hook] 이벤트 핸들러 관련 커스텀 훅
 * @returns 이벤트 핸들러를 포함한 객체
 */
export function useHandler() {
  // 업로드된 파일들
  const files = useGetFiles();
  const edited = useGetEdited();
  // 업로드 파일 이름
  const filename = useGetFileName();

  /** [Handler] 다운로드 이벤트 처리 */
  const onDownload = useCallback(() => {
    // Zip 파일 처리를 위한 객체 생성
    const jsZip = new JSZip();
    // Zip 파일 생성을 위한 데이터 추가
    for (const [key, value] of Object.entries(files)) {
      const fileData: any = value;
      // 폴더 추가
      if (fileData.dir) jsZip.folder(key);
      // 파일 추가
      else jsZip.file(key, edited[key] !== undefined ? edited[key] : fileData.async("blob"));
    }

    // Zip 파일 생성
    jsZip.generateAsync({ type: "blob" }).then((data) => {
      // <a> 태그 생성
      const elem: HTMLAnchorElement = document.createElement("a");
      // 파일명 및 다운로드 데이터 설정
      elem.download = filename ?? "Archive.zip";
      elem.href = URL.createObjectURL(data);
      // 이벤트 발생 및 엘리먼트 제거
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    });
  }, [edited, filename, files]);

  return {
    /** 다운로드 이벤트 핸들러 */
    onDownload,
  };
}
/**
 * [Hook] UI 표시 관련 커스텀 훅
 * @returns 변수를 포함한 객체
 */
export function useVisible() {
  // 업로드된 파일명
  const filename: string | undefined = useGetFileName();

  return {
    /** 파일 업로드 여부 */
    isUpload: filename !== undefined,
  };
}
