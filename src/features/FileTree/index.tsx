// Hook
import { useFiles, useItem } from "./FileTree.hooks";
// Icon
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
// Type
import { KeyListItemProps, KeyListProps } from "./FileTree.types";

export default function FileTree() {
  // 업로드 파일 가공을 위한 커스텀 훅
  const { files } = useFiles();

  return <KeyList data={files} depth={0} />;
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
          <KeyListItem data={data[key]} depth={depth} key={key} isDir={data[key].isDir}>
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
function KeyListItem({ children, data, depth, isDir }: KeyListItemProps) {
  // 아이템에 대한 커스텀 훅
  const { hidden, onClick } = useItem(isDir, data);

  return (
    <li className="select-none">
      <a className="cursor-pointer block duration-200 m-1 pr-4 py-2 rounded-lg hover:bg-slate-100" onClick={onClick} style={{ paddingLeft: 16 + 24 * depth }}>
        <span className="flex gap-1.5 items-center">
          <>{isDir ? hidden ? <IoChevronForward size={14} /> : <IoChevronDown size={14} /> : <></>}</>
          <>{children}</>
        </span>
      </a>
      <>{isDir && <KeyList data={data.children} depth={depth + 1} hidden={hidden} />}</>
    </li>
  );
}
