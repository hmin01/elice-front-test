// Monaco
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// React hook
import { useEffect, useRef } from "react";

/**
 * [Hook] 에디터 초기 설정을 위한 커스텀 훅
 * @param key 식별 값
 * @param content 에디터 내용
 * @returns 참조 객체를 포함하는 객체
 */
export function useEditor(key?: string, content?: string, onChange?: (key: string, content: string) => void) {
  // 에디터 엘리먼트 참조 객체
  const monacoElem = useRef<HTMLDivElement>(null);
  // 에디터
  const editor = useRef<monaco.editor.ICodeEditor>();

  /** 초기 렌더링 시, 모나코 에디터 설정 */
  useEffect(() => {
    if (monacoElem.current) {
      // 에디터 생성
      if (!editor.current) {
        editor.current = monaco.editor.create(monacoElem.current, {
          automaticLayout: true,
        });
        editor.current.onKeyDown((e: monaco.IKeyboardEvent) => {
          e.stopPropagation();
          if (e.metaKey && e.keyCode === 49) {
            if (onChange) {
              // 현재 에디터의 모델
              if (editor.current) {
                const model = editor.current.getModel();
                if (model) {
                  onChange(model.uri.authority.concat(model.uri.path), model.getValue());
                }
              }
            }
          }
        });
      }
    }

    // Unmount
    () => editor.current?.dispose();
  }, []);
  /** 키에 따른 모델 생성 및 관리 */
  useEffect(() => {
    // 선택된 키에 대한 모델 생성 및 설정
    if (key !== undefined && key !== "") {
      // 모델 조회
      let model = getModel(key);
      // 없을 경우, 모델 생성
      if (model === null) {
        model = createModel(key, content);
      }

      // 에디터 모델 설정
      if (editor.current) {
        editor.current.setModel(model);
      }
    }
  }, [key]);

  return {
    /** 엘리먼트 참조 객체 */
    monacoElem,
  };
}

/**
 * [Internal Function] 에디터 모델 조회
 * @param key 고유 식별 값
 * @returns 에디터 모델
 */
function getModel(key: string): monaco.editor.ITextModel | null {
  // 모델 URI
  const uri: monaco.Uri = monaco.Uri.parse(`memory://${key}`);
  // 모델 조회
  return monaco.editor.getModel(uri);
}
/**
 * [Internal Function] 에디터 모델 생성 함수
 * @param key 코드 작성 언어 객체
 * @param content 초기 코드
 * @returns 에디터 모델
 */
function createModel(key: string, content?: string): monaco.editor.ITextModel {
  // 모델 생성을 위한 정보
  const initialCode: string = content ?? "";
  const uri: monaco.Uri = monaco.Uri.parse(`memory://${key}`);
  // 모델 생성 및 반환
  return monaco.editor.createModel(initialCode, "plaintext", uri);
}
