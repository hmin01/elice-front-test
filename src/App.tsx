// Feature
import FileDownloader from "@features/FileDownloader";
import FileTabs from "@features/FileTabs";
import FileTree from "@features/FileTree";
import ZipFileUploader from "@features/ZipFileUploader";

function App() {
  return (
    <main className="h-screen relative w-screen">
      <header className="border-b border-slate-200 flex gap-4 h-16 items-center justify-between px-4 py-2 relative w-full">
        <ZipFileUploader />
        <FileDownloader />
      </header>
      <section className="flex h-[calc(100vh-64px)] relative w-full">
        <aside className="border-r border-slate-200 h-full w-80">
          <FileTree />
        </aside>
        <div className="w-[calc(100vw-320px)]">
          <FileTabs />
        </div>
      </section>
    </main>
  );
}

export default App;
