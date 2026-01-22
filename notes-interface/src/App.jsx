function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        🎉 Tailwind CSS is <span className="text-cyan-400">Working!</span>
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl">
        If you see this styled message with a gradient background, your Tailwind
        CSS v3 setup is perfectly configured for your Notes App.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
          Next Steps:
        </h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
            Build the Login & Register components
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
            Connect to your backend API
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
            Create the Notes dashboard
          </li>
        </ul>
      </div>
      <p className="mt-8 text-gray-500 text-sm">
        Your full-stack Notes App is coming to life!
      </p>
    </div>
  );
}

export default App;
