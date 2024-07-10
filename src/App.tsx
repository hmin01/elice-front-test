// Feature
import FileTree from "@features/FileTree";
import ZipFileUploader from "@features/ZipFileUploader";

function App() {
  return (
    <main className="h-screen relative w-screen">
      <header className="border-b border-slate-200 flex gap-4 h-16 items-center justify-between px-4 relative w-full">
        <ZipFileUploader />
        <button>hi</button>
      </header>
      <section className="flex h-[calc(100vh-64px)] relative w-full">
        <aside className="border-r border-slate-200 h-full overflow-y-auto w-80">
          <FileTree />
        </aside>
        <div className="flex-1"></div>
      </section>
    </main>
  );
}

export default App;
