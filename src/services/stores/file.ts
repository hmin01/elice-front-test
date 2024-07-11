import { create } from "zustand";

// Interface
interface FileState {
  /** 업로드된 Zip 파일 내 파일들에 대한 데이터 */
  data: any;
  /** 파일명 */
  name: string | undefined;
}

// Store
export const useFileStore = create<FileState>(() => ({
  data: {},
  name: undefined,
}));

// Actions (getter)
export const useGetFiles = () => useFileStore((state) => state.data);
export const useGetFileName = () => useFileStore((state) => state.name);
// Actions (setter)
export const setFiles = (data: any) => useFileStore.setState(() => ({ data }));
export const setFileName = (name: string) => useFileStore.setState(() => ({ name }));
