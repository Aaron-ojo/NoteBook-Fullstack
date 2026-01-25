import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-white mb-4">
        Welcome to NOTEBOOK 📓
      </h1>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Your personal note-taking application. Securely store and manage all
        your notes in one place.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg inline-block transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
