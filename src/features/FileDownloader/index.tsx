// Hook
import { useHandler, useVisible } from "./FileDownloader.hooks";
// Icon
import { IoDownload } from "react-icons/io5";
// Utility
import { setClassName } from "@utilities/className";

export default function FileDownloader() {
  // UI 표시 관련 커스텀 훅
  const { isUpload } = useVisible();
  // 이벤트 핸들러 관련 커스텀 훅
  const { onDownload } = useHandler();

  return (
    <button className={setClassName("border border-slate-200 gap-2 h-full items-center justify-center px-4 rounded-md text-sm", isUpload ? "flex" : "hidden")} onClick={onDownload}>
      <IoDownload className="text-lg" />
      <>Download</>
    </button>
  );
}
