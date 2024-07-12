import { create } from "zustand";

// Interface
interface FileState {
  /** 업로드된 Zip 파일 내 파일들에 대한 데이터 */
  data: any;
  /** 파일명 */
  name: string | undefined;
  /**  */
  new: {
    path: string;
    type: "폴더" | "파일";
  } | null;
}

// Store
export const useFileStore = create<FileState>(() => ({
  data: {},
  name: undefined,
  new: null,
}));

// Actions (getter)
export const useGetFiles = () => useFileStore((state) => state.data);
export const useGetFileName = () => useFileStore((state) => state.name);
export const useGetNewObject = () => useFileStore((state) => state.new);
// Actions (setter)
export const addFile = (key: string, value: any) =>
  useFileStore.setState((state) => ({
    data: {
      ...state.data,
      [key]: value,
    },
  }));
export const addNewObject = (type: "폴더" | "파일", path: string) => useFileStore.setState(() => ({ new: { path, type } }));
export const clearNewObject = () => useFileStore.setState(() => ({ new: null }));
export const removeFile = (key: string, isDir?: boolean) =>
  useFileStore.setState((state) => {
    // 복사
    const copy = state.data;
    // 키에 대한 값 제거
    if (isDir) {
      for (const fileKey of Object.keys(copy)) {
        if (fileKey.search(`^${key}*`) >= 0) delete copy[fileKey];
      }
    } else {
      delete copy[key];
    }
    // 저장
    return { data: { ...copy } };
  });
export const setFiles = (data: any) => useFileStore.setState(() => ({ data }));
export const setFileName = (name: string) => useFileStore.setState(() => ({ name }));
