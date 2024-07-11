// Type
import type { PropsWithChildren } from "react";

export interface TabsListItemProps extends PropsWithChildren {
  /** 클릭 이벤트 핸들러 */
  onClick?: (e: any) => void;
  /** 삭제 이벤트 핸들러 */
  onDelete?: (e: any) => void;
  /** 선택된 파일 여부 */
  selected?: boolean;
}
export interface TabsListProps {
  /** 탭 아이템 요소 데이터 */
  items: any[];
  /** 클릭 이벤트 핸들러 */
  onClick?: (e: any) => void;
  /** 삭제 이벤트 핸들러 */
  onDelete?: (e: any) => void;
  /** DOM 요소 참조 객체  */
  refer?: React.LegacyRef<HTMLElement> | undefined;
  /** 선택된 파일 키(Key) */
  selected?: string;
}
