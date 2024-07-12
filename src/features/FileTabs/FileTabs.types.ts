export interface FileEditorProps {
  /** 파일에 대한 키 */
  fileKey: string;
  /** 이미지 파일 여부 */
  isImage?: boolean;
  /** 에디터 기본 내용 또는 이미지 URL */
  sources?: string;
}
