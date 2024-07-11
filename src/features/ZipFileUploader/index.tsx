// Component
import { FileUploader } from "@components";
// Hook
import { useUploader } from "./ZipFileUploader.hooks";

export default function ZipFileUploader() {
  // 파일 업로드 처리 관련 커스텀 훅
  const { onChange } = useUploader();

  return <FileUploader className="h-full" onChange={onChange} />;
}
