// Type
import { PropsWithChildren } from "react";

export interface KeyListProps {
  /** 목록 표시를 위한 데이터 */
  data: any;
  /** 계층 레벨 */
  depth: number;
  /** 숨김 여부 */
  hidden?: boolean;
}
export interface KeyListItemProps extends PropsWithChildren {
  /** 하위 목록 데이터 */
  data: any;
  /** 계층 레벨 */
  depth: number;
  /** 디렉터리 여부 */
  isDir: boolean;
}
