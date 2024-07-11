// Icon
import { IoClose } from "react-icons/io5";
// Type
import type { PropsWithChildren } from "react";
import type { TabsListItemProps, TabsListProps } from "./Tabs.types";
// Utility
import { setClassName } from "@utilities/className";

export default function Tabs({ children }: PropsWithChildren) {
  return <div className="h-full relative w-full">{children}</div>;
}

/**
 * [Compound Component] 탭 아이템 목록 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
Tabs.List = ({ items, onClick, onDelete, refer, selected }: TabsListProps) => {
  return (
    <nav className="border-b border-slate-100 h-12 items-center overflow-x-auto w-full whitespace-nowrap" ref={refer}>
      {items.map(
        (elem: any): JSX.Element => (
          <TabsItem
            key={elem.key}
            onClick={() => onClick?.(elem.key)}
            onDelete={(e: any) => {
              e.stopPropagation();
              onDelete?.(elem.key);
            }}
            selected={elem.key === selected}
          >
            {elem.label}
          </TabsItem>
        )
      )}
    </nav>
  );
};
/**
 * [Compound Component] 탭 패널 그룹 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
Tabs.PanelGroup = ({ children }: PropsWithChildren) => {
  return <div className="h-[calc(100%-48px)] relative w-full">{children}</div>;
};

/**
 * [Internal Component] 탭 아이템 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
function TabsItem({ children, onClick, onDelete, selected }: TabsListItemProps) {
  return (
    <div className={setClassName("border-r border-slate-100 cursor-pointer inline-block text-nowrap h-full min-w-24 pl-4 pr-3", selected ? "bg-blue-100" : "bg-white")} onClick={onClick}>
      <div className="flex h-full gap-2 justify-between">
        <span className="flex items-center">{children}</span>
        <span className="flex items-center">
          <IoClose className="text-slate-500" onClick={onDelete} />
        </span>
      </div>
    </div>
  );
}
