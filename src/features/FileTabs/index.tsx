// Component
import { Editor, Modal, Tabs } from "@components";
// Hook
import { onChangeContent, useTabsHandler, useModal, useFileHandler } from "./FileTabs.hooks";
// Type
import { FileEditorProps } from "./FileTabs.types";
// Utility
import { isImageFile } from "@utilities/file";

export default function FileTabs() {
  // 이벤트 핸들러 관련 커스텀 훅
  const { onClick, onDelete, openFiles, selected, selectedFile } = useTabsHandler();

  return (
    <>
      {Object.keys(openFiles).length > 0 ? (
        <Tabs>
          <Tabs.List items={Object.entries(openFiles).map(([key, elem]): any => ({ key: key, label: elem.name }))} onClick={onClick} onDelete={onDelete} selected={selected} />
          <Tabs.PanelGroup>
            <FileEditor fileKey={selected} isImage={selectedFile ? isImageFile(selectedFile.name) : false} sources={selectedFile?.value} />
          </Tabs.PanelGroup>
        </Tabs>
      ) : (
        <></>
      )}
      <AddModal />
    </>
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
    </>
  );
}
/**
 * [Internal Component] 파일/폴더 추가를 위한 모달 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
function AddModal() {
  // 모달을 위한 커스텀 훅
  const { info, open, onClose } = useModal();
  // 파일 추가/삭제 핸들러 관련 커스텀 훅
  const { onAdd, onChange, onClear } = useFileHandler(onClose);

  return (
    <Modal open={open} onClose={onClear}>
      <div className="px-6 py-4">
        <h2 className="font-bold">{info?.type} 추가</h2>
      </div>
      <div className="px-6">
        <div className="mb-3">
          <label className="block font-bold mb-0.5 text-gray-500 text-xs">경로</label>
          <p>{`/${info?.path}`}</p>
        </div>
        <div>
          <label className="block font-bold mb-0.5 text-gray-500 text-xs">{info?.type}명</label>
          <input className="block border border-slate-400 px-2 py-1 rounded text-sm w-full" onChange={onChange} placeholder={`${info?.type}명을 입력해 주세요.`} />
        </div>
      </div>
      <div className="flex gap-3 justify-end px-6 py-4">
        <button className="bg-white border border-gray-300 duration-200 font-semibold px-4 py-1.5 rounded text-gray-900 text-sm hover:bg-slate-100" onClick={onClear}>
          취소
        </button>
        <button className="bg-blue-600 duration-200 font-semibold px-4 py-1 rounded text-white text-sm hover:bg-blue-500" onClick={onAdd}>
          저장
        </button>
      </div>
    </Modal>
  );
}
