// Type
import type { JSZipObject } from "jszip";

export interface DirectoryType {
  /** 하위 파일 목록 */
  children: {
    [key: string]: FileType;
  };
  /** 폴더 여부 값 */
  isDir: boolean;
}
export interface FileType {
  /** 파일 데이터 */
  file: JSZipObject;
  /** 폴더 여부 값 */
  isDir: boolean;
  /** 파일 키(= 전체 경로) */
  key: string;
  /** 파일 이름 */
  name: string;
}

export interface FileTreeType {
  [key: string]: FileType | DirectoryType;
}
