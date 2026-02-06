import CreateNoteForm from "../components/CreateNoteForm";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllNotes } from "../services/NotesApi";

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      const response = await getAllNotes();
      console.log("API Response:", response.data);
      setNotes(response.data.notes || []);
    } catch (error) {
      console.log("failed to fetch notes", error);
    } finally {
      setLoadingNotes(false);
    }
  };

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

  const openNoteDetail = (noteID) => {
    console.log("opening not", noteID);
    //we'll implement this later
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
          <p className="text-gray-600 mb-6">
            You're logged in! Start creating and managing your notes.
          </p>

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

          {/* Notes List Section */}
          <div className="mt-6">
            {loadingNotes ? (
              <p>Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No notes yet. Create your first note!
              </p>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => openNoteDetail(note._id)} // We'll create this
                  >
                    <h3 className="font-medium text-gray-500">{note.title}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {note.content.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">
              Account Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Email: </span>
                {userEmail || "Not available"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Username: </span>
                {userName || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {showCreateForm && (
          <CreateNoteForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              console.log("Note created successfully!");
              setShowCreateForm(false);
              fetchNotes();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
