function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-400 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="mx-auto container">
          <h1 className="font-bold text-xl">NOTEBOOK</h1>
        </div>
      </nav>

      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}

export default Layout;
