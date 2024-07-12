// Hook
import { useFiles, useItem, useTreeHandler } from "./FileTree.hooks";
// Icon
import { FiFilePlus, FiFolderPlus, FiTrash2 } from "react-icons/fi";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
// Type
import { KeyListItemProps, KeyListProps } from "./FileTree.types";
// Utility
import { setClassName } from "@/utilities/className";

export default function FileTree() {
  // 트리 구조를 위한 커스텀 훅
  const { fileName, files } = useFiles();
  // 트리 핸들러 관련 커스텀 훅
  const { onAddFile, onAddFolder, onClick, onDelete } = useTreeHandler();

  return (
    <div className="h-full relative overflow-y-auto w-full">
      <div className="bg-white border-b border-dashed border-slate-200 flex h-10 justify-between left-0 px-4 sticky top-0 w-full">
        <div className="flex items-center">
          <h2>{fileName}</h2>
        </div>
        <div className="flex gap-3 items-center text-gray-600 text-xl">
          <FiFilePlus className="cursor-pointer" onClick={onAddFile} />
          <FiFolderPlus className="cursor-pointer" onClick={onAddFolder} />
          <FiTrash2 className="cursor-pointer" onClick={onDelete} />
        </div>
      </div>
      <div className="min-h-[calc(100%-44px)]" onClick={onClick}>
        <KeyList data={files} depth={0} />
      </div>
    </div>
  );
}

/**
 * [Internal Component] 키 목록 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
function KeyList({ data, depth, hidden }: KeyListProps) {
  return (
    <ul hidden={hidden}>
      {Object.keys(data).map(
        (key: string): JSX.Element => (
          <KeyListItem data={data[key]} depth={depth} key={key}>
            {key}
          </KeyListItem>
        )
      )}
    </ul>
  );
}
/**
 * [Internal Component] 키 목록 아이템 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
function KeyListItem({ children, data, depth }: KeyListItemProps) {
  // 아이템에 대한 커스텀 훅
  const { hidden, onClick, selected } = useItem(data);

  return (
    <li className="select-none">
      <a
        className={setClassName("cursor-pointer block duration-200 m-1 pr-4 py-2 rounded-lg", selected === data.key ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-white text-gray-900 hover:bg-slate-100")}
        onClick={onClick}
        style={{ paddingLeft: 16 + 24 * depth }}
      >
        <span className="flex gap-1.5 items-center">
          <>{data.isDir ? hidden ? <IoChevronForward size={14} /> : <IoChevronDown size={14} /> : <></>}</>
          <>{children}</>
        </span>
      </a>
      <>{data.isDir && <KeyList data={data.children} depth={depth + 1} hidden={hidden} />}</>
    </li>
  );
}
