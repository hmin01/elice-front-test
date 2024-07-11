// Icon
import { IoClose } from "react-icons/io5";
// Type
import type { PropsWithChildren } from "react";
// Utility
import { setClassName } from "@utilities/className";

export default function Tabs({ children }: PropsWithChildren) {
  return <div className="h-full relative w-full">{children}</div>;
}

Tabs.List = ({ items, onClick, onDelete, selected }: any) => {
  return (
    <nav className="border-b border-slate-100 flex flex-nowrap h-12 items-center overflow-x-auto w-full">
      {items.map(
        (elem: any): JSX.Element => (
          <TabsItem
            key={elem.key}
            onClick={() => onClick(elem.key)}
            onDelete={(e: any) => {
              e.stopPropagation();
              onDelete(elem.key);
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
Tabs.PanelGroup = ({ children }: PropsWithChildren) => {
  return <div className="h-[calc(100%-48px)] relative w-full">{children}</div>;
};

/**
 * [Internal Component] 탭 아이템 컴포넌트
 * @param params 컴포넌트 속성
 * @returns 컴포넌트
 */
function TabsItem({ children, onClick, onDelete, selected }: any) {
  return (
    <span className={setClassName("border-r border-slate-100 cursor-pointer flex gap-2 h-full min-w-24 px-4", selected ? "bg-blue-100" : "bg-white")} onClick={onClick}>
      <span className="flex items-center">{children}</span>
      <span className="flex items-center">
        <IoClose className="text-slate-500" onClick={onDelete} />
      </span>
    </span>
  );
}
