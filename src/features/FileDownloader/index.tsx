// Icon
import { IoDownload } from "react-icons/io5";
// Lib
import JSZip from "jszip";
// Store
import { useGetFiles, useGetUploadState } from "@stores/editor";
// Utility
import { setClassName } from "@utilities/className";
import { useCallback } from "react";

export default function FileDownloader() {
  const isUpload: boolean = useGetUploadState();
  const files = useGetFiles();

  const onDownload = useCallback(() => {
    // Zip 파일 처리를 위한 객체 생성
    const jsZip = new JSZip();
    // Zip 파일 생성을 위한 데이터 추가
    for (const [key, value] of Object.entries(files)) {
      const fileData: any = value;
      // 디렉터리인 경우
      if (fileData.dir) {
        jsZip.folder(key);
      }
      // 파일인 경우
      else {
        console.log(fileData);
        jsZip.file(key, fileData.async("string"));
      }
    }
    // Zip 파일 생성
    jsZip.generateAsync({ type: "blob" }).then((data) => {
      // <a> 태그 생성
      const elem: HTMLAnchorElement = document.createElement("a");
      // 파일명 및 다운로드 데이터 설정
      elem.download = "test.zip";
      elem.href = URL.createObjectURL(data);
      // 이벤트 발생 및 엘리먼트 제거
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    });
  }, [files]);

  return (
    <button className={setClassName("border border-slate-200 gap-2 h-full items-center justify-center px-4 rounded-md text-sm", isUpload ? "flex" : "hidden")} onClick={onDownload}>
      <IoDownload className="text-lg" />
      <>Download</>
    </button>
  );
}
