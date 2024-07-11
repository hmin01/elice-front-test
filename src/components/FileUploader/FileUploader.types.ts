// Type
import type { ChangeEvent } from "react";

export interface FileUploaderProps {
  /** 클래스명 */
  className?: string;
  /** 값 변경 이벤트 핸들러 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
