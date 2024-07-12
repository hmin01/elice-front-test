// Component
import { Editor, Modal, Tabs } from "@components";
// Hook
import { onChangeContent, useHandler, useModal } from "./FileTabs.hooks";
// React hook
import { useRef } from "react";
// Type
import { FileEditorProps } from "./FileTabs.types";
// Utility
import { isImageFile } from "@utilities/file";

export default function FileTabs() {
  // 이벤트 핸들러 관련 커스텀 훅
  const { onClick, onDelete, openFiles, selected, selectedFile } = useHandler();
  // DOM 요소 참조 객체
  const ref = useRef<HTMLDivElement>(null);

  return Object.keys(openFiles).length > 0 ? (
    <Tabs>
      <Tabs.List items={Object.entries(openFiles).map(([key, elem]): any => ({ key: key, label: elem.name }))} onClick={onClick} onDelete={onDelete} refer={ref} selected={selected} />
      <Tabs.PanelGroup>
        <FileEditor fileKey={selected} isImage={selectedFile ? isImageFile(selectedFile.name) : false} sources={selectedFile?.value} />
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
function FileEditor({ fileKey, isImage, sources }: FileEditorProps) {
  // 에디터 내용 편집 관련 커스텀 훅
  const { onChange } = onChangeContent();

  return (
    <>
      {isImage ? (
        <div className="h-full relative w-full">
          <img alt="image" className="h-full object-contain w-full" src={sources} />
        </div>
      ) : (
        <Editor modelKey={fileKey} content={sources} onChange={onChange} />
      )}
      <AddModal />
    </>
  );
}
function AddModal() {
  const { info, open, onClose } = useModal();

  const type: string = info?.type === "directory" ? "폴더" : "파일";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-6 py-4">
        <h2 className="font-bold">{type} 추가</h2>
      </div>
      <div className="px-6">
        <div className="mb-3">
          <label className="block mb-0.5 text-gray-500 text-sm">경로</label>
          <p>{`/${info?.path}`}</p>
        </div>
        <div>
          <label className="block mb-0.5 text-gray-500 text-sm">{type}명</label>
          <input className="block border border-slate-400 px-2 py-1 rounded text-sm w-full" placeholder={`${type}명을 입력해 주세요.`} />
        </div>
      </div>
      <div className="flex gap-3 justify-end px-6 py-4">
        <button className="bg-white border border-gray-500 duration-200 px-4 py-1 rounded text-gray-900 text-sm hover:bg-slate-100" onClick={onClose}>
          취소
        </button>
        <button className="border border-blue-500 px-4 py-1 rounded text-blue-700 text-sm">저장</button>
      </div>
    </Modal>
  );
}
