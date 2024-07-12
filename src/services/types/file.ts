// Type
import type { JSZipObject } from "jszip";

interface CommonType {
  /** 폴더 여부 값 */
  isDir: boolean;
  /** 전체 경로에 대한 키 */
  key: string;
  /**  */
  isNew?: boolean;
  /** 파일 이름 */
  name: string;
}
export interface DirectoryType extends CommonType {
  /** 하위 파일 목록 */
  children: {
    [key: string]: FileType;
  };
}
export interface FileType extends CommonType {
  /** 파일 데이터 */
  file: JSZipObject;
}

export interface FileTreeType {
  [key: string]: FileType | DirectoryType;
}
