import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 p-6">
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to INKNOTES 📓
        </h1>
        <p className="text-gray-300 text-lg">
          Your personal note-taking application. Securely store and manage all
          your notes in one place.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
