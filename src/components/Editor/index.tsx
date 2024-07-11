// Hook
import { useEditor } from "./Editor.hook";

export default function Editor({ modelKey, content }: any) {
  // 에디터 초기 설정을 위한 커스텀 훅
  const { monacoElem } = useEditor(modelKey, content);

  return <div className="h-full relative w-full" ref={monacoElem}></div>;
}
