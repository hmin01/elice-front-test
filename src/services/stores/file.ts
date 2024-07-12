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
    type: "directory" | "file";
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
export const addNewObject = (type: "directory" | "file", path: string) => useFileStore.setState(() => ({ new: { path, type } }));
export const clearNewObject = () => useFileStore.setState(() => ({ new: null }));
export const removeFile = (key: string) =>
  useFileStore.setState((state) => {
    const copy = JSON.parse(JSON.stringify(state.data));
    delete copy[key];
    return { data: copy };
  });
export const setFiles = (data: any) => useFileStore.setState(() => ({ data }));
export const setFileName = (name: string) => useFileStore.setState(() => ({ name }));
