import CreateNoteForm from "../components/CreateNoteForm";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserEmail(user.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Notes Dashboard
            </h1>
            {userEmail && (
              <p className="text-gray-600 mt-2">
                Welcome,{" "}
                <span className="font-semibold text-blue-600">{userEmail}</span>
                !
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <button
              onClick={() => {
                setShowCreateForm(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Create New Note
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">
              Account Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>
                {userEmail || "Not available"}
              </p>
            </div>
          </div>

          <p className="text-gray-600">
            You're logged in! Start creating and managing your notes.
          </p>
        </div>

        {showCreateForm && (
          <CreateNoteForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              console.log("Note created successfully!");
              setShowCreateForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
