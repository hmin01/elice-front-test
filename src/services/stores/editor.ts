import { create } from "zustand";

// Interface
interface EditorState {
  /** 편집을 위해 열려진 파일들에 대한 데이터 */
  openFiles: {
    [key: string]: {
      name: string;
      value: string;
    };
  };
  /** 현재 선택된 파일에 대한 Key */
  selected: string;
}

// Store
export const useEditorStore = create<EditorState>(() => ({
  files: {},
  isUpload: false,
  openFiles: {},
  selected: "",
}));

// Actions (getter)
export const useGetOpenFiles = () => useEditorStore((state) => state.openFiles);
export const useGetSelected = () => useEditorStore((state) => state.selected);
// Actions (setter)
export const clearOpenFiles = () =>
  useEditorStore.setState(() => ({
    openFiles: {},
    selected: "",
  }));
export const closeFile = (key: string) =>
  useEditorStore.setState((state) => {
    // 깊은 복사
    const openFiles = JSON.parse(JSON.stringify(state.openFiles));
    // 키에 대한 값 제거
    delete openFiles[key];
    // 저장
    return { openFiles };
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
export const setSelected = (key: string) =>
  useEditorStore.setState(() => ({
    selected: key,
  }));
