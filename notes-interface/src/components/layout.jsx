function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-400 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="mx-auto container">
          <h1 className="font-bold text-xl">INKNOTES</h1>
        </div>
      </nav>

      <main className="container mx-auto p-4">{children}</main>

      <div className="bg-gray-800 text-gray-400 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-center sm:text-left">
            <p className="text-gray-200 font-semibold">InkNotes</p>
            <p className="text-xs mt-1">
              © 2026 InkNotes. All rights reserved.
            </p>
          </div>

          <nav className="flex justify-center gap-6 text-sm sm:justify-end">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Layout;
