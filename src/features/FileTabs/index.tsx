// Component
import { Editor, Tabs } from "@components";
// Store
import { closeFile, setSelected, useGetOpenFiles, useGetSelected } from "@stores/editor";
import { useCallback } from "react";
// Utility
import { getExtension } from "@utilities/file";

export default function FileTabs() {
  // 선택된 파일 목록
  const openFiles = useGetOpenFiles();
  const selected = useGetSelected();

  const onClick = useCallback((key: string) => {
    setSelected(key);
  }, []);

  const onDelete = useCallback((key: string) => {
    console.log(key);
    closeFile(key);
    //
    setSelected("");
  }, []);

  const selectedFile = openFiles[selected];

  return Object.keys(openFiles).length > 0 ? (
    <Tabs>
      <Tabs.List items={Object.entries(openFiles).map(([key, elem]): any => ({ key: key, label: elem.name }))} onClick={onClick} onDelete={onDelete} selected={selected} />
      <Tabs.PanelGroup>
        <FileEditor content={selectedFile?.value} fileKey={selected} fileName={selectedFile?.name} />
      </Tabs.PanelGroup>
    </Tabs>
  ) : (
    <></>
  );
}

function FileEditor({ content, fileKey, fileName }: any) {
  const extension: string | undefined = fileName ? getExtension(fileName) : undefined;

  return <Editor modelKey={fileKey} content={content} />;
}
