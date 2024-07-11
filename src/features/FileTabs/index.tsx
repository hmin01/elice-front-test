// Component
import { Editor, Tabs } from "@components";
// Hook
import { useFiles, useHandler } from "./FileTabs.hooks";
// React hook
import { useRef } from "react";
// Utility
import { isImageFile } from "@utilities/file";

export default function FileTabs() {
  // 파일 목록에 대한 커스텀 훅
  const { openFiles, selected, selectedFile } = useFiles();
  console.log(openFiles, selected, selectedFile);
  // 이벤트 핸들러 관련 커스텀 훅
  const { onClick, onDelete } = useHandler();
  // DOM 요소 참조 객체
  const ref = useRef<HTMLDivElement>(null);

  return Object.keys(openFiles).length > 0 ? (
    <Tabs>
      <Tabs.List items={Object.entries(openFiles).map(([key, elem]): any => ({ key: key, label: elem.name }))} onClick={onClick} onDelete={onDelete} refer={ref} selected={selected} />
      <Tabs.PanelGroup>
        <FileEditor content={selectedFile?.value} fileKey={selected} fileName={selectedFile?.name} />
      </Tabs.PanelGroup>
    </Tabs>
  ) : (
    <></>
  );
}

/**
 * [Internal Component] 파일 에디터 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
function FileEditor({ content, fileKey, fileName }: any) {
  return isImageFile(fileName ?? "") ? (
    <div className="h-full relative w-full">
      <img alt="image" className="h-full object-contain w-full" src={content} />
    </div>
  ) : (
    <Editor modelKey={fileKey} content={content} />
  );
}
