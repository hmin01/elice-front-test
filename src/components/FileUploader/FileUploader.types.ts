// Type
import type { ChangeEvent } from "react";

export interface FileUploaderProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
