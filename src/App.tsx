function App() {
  return (
    <main className="h-screen relative w-screen">
      <header className="border-b border-slate-200 h-16 relative w-full"></header>
      <section className="flex h-[calc(100vh-64px)] relative w-full">
        <aside className="border-r border-slate-200 h-full overflow-y-auto w-80"></aside>
        <div className="flex-1"></div>
      </section>
    </main>
  );
}

export default App;
