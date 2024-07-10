import { create } from "zustand";

// Interface
interface EditorState {
  files: {
    [key: string]: File;
  };
}
interface EditorActions {
  setFiles: (value: any) => void;
}

// Store
const useEditorStore = create<EditorState & EditorActions>((set) => ({
  files: {},
  setFiles: (value: any) => set({ files: value }),
}));

// Actions
export const useGetFiles = () => useEditorStore((state) => state.files);
export const useSetFiles = () => useEditorStore((state) => state.setFiles);
