// Icon
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
// Store
import { useGetFiles } from "@stores/editor";
import { useCallback, useState } from "react";
// Type
import { KeyListItemProps, KeyListProps } from "./FileTree.types";

export default function FileTree() {
  const files = useGetFiles();

  return <KeyList data={files} depth={0} />;
}

/**
 * [Internal Component] 키 목록 컴포넌트
 * @param param0
 * @returns
 */
function KeyList({ data, depth, hidden }: KeyListProps) {
  return (
    <ul hidden={hidden}>
      {Object.keys(data).map(
        (key: string): JSX.Element => (
          <KeyListItem data={data[key].children} depth={depth} key={key} type={data[key].type}>
            {key}
          </KeyListItem>
        )
      )}
    </ul>
  );
}
/**
 * [Internal Component] 키 목록 아이템 컴포넌트
 * @param param0
 * @returns
 */
function KeyListItem({ children, data, depth, type }: KeyListItemProps) {
  const [hidden, setHidden] = useState<boolean>(true);

  const onClick = useCallback(() => {
    // 하위 목록 표시/미표시
    if (type === "directory") {
      setHidden((state) => !state);
    }
  }, [type]);

  return (
    <li className="select-none">
      <a className="cursor-pointer block duration-200 m-1 pr-4 py-2 rounded-lg hover:bg-slate-100" onClick={onClick} style={{ paddingLeft: 16 + 24 * depth }}>
        <span className="flex gap-1.5 items-center">
          <>{type === "directory" ? hidden ? <IoChevronForward size={14} /> : <IoChevronDown size={14} /> : <></>}</>
          <>{children}</>
        </span>
      </a>
      <>{type === "directory" && <KeyList data={data} depth={depth + 1} hidden={hidden} />}</>
    </li>
  );
}
