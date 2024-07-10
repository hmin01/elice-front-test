// Component
import { FileUploader } from "@components";
import { useUploader } from "./ZipFileUploader.hooks";

export default function ZipFileUploader() {
  // 파일 업로드 처리 관련 커스텀 훅
  const { onChange } = useUploader();

  return <FileUploader onChange={onChange} />;
}
