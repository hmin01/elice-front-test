// Type
import type { JSZipObject } from "jszip";

export type TreeItemType = "directory" | "file";

export interface DirectoryType {
  /** 하위 파일 목록 */
  children: {
    [key: string]: FileType;
  };
  /** 유형 (= directory) */
  type: TreeItemType;
}
export interface FileType {
  /** 파일 데이터 */
  file: JSZipObject;
  /** 파일 키(= 전체 경로) */
  key: string;
  /** 파일 이름 */
  name: string;
  /** 유형 (= file) */
  type: TreeItemType;
}

export interface FileTreeType {
  [key: string]: FileType | DirectoryType;
}
