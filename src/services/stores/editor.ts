import { create } from "zustand";

// Interface
interface EditorState {
  edited: {
    [key: string]: string;
  };
  /** 편집을 위해 열려진 파일들에 대한 데이터 */
  openFiles: {
    [key: string]: {
      name: string;
      value: string;
    };
  };
  /** 현재 선택된 파일에 대한 Key */
  selected: string;
  /** 현재 선택된 파일에 대한 Key (For Tree) */
  selectedForTree: [key: string, type: "폴더" | "파일"];
}

// Store
export const useEditorStore = create<EditorState>(() => ({
  edited: {},
  openFiles: {},
  selected: "",
  selectedForTree: ["", "파일"],
}));

// Actions (getter)
export const useGetEdited = () => useEditorStore((state) => state.edited);
export const useGetOpenFiles = () => useEditorStore((state) => state.openFiles);
export const useGetSelected = () => useEditorStore((state) => state.selected);
export const useGetSelectedForTree = () => useEditorStore((state) => state.selectedForTree);
// Actions (setter)
export const clearOpenFiles = () =>
  useEditorStore.setState(() => ({
    openFiles: {},
    selected: "",
  }));
export const closeFile = (key: string) =>
  useEditorStore.setState((state) => {
    // 복사
    const openFiles = state.openFiles;
    // 키에 대한 값 제거
    delete openFiles[key];
    // 저장
    return { openFiles: { ...openFiles } };
  });
export const addOpenFile = (key: string, name: string, value: string) =>
  useEditorStore.setState((state) => ({
    openFiles: {
      ...state.openFiles,
      [key]: {
        name,
        value,
      },
    },
    selected: key,
  }));
export const setEdited = (key: string, value: string) =>
  useEditorStore.setState((state) => ({
    edited: {
      ...state.edited,
      [key]: value,
    },
  }));
export const setSelected = (key: string) => useEditorStore.setState(() => ({ selected: key }));
export const setSelectedForTree = (key: string, isDir?: boolean) => useEditorStore.setState(() => ({ selectedForTree: [key, isDir ? "폴더" : "파일"] }));
