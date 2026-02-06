import CreateNoteForm from "../components/CreateNoteForm";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getNotes, deleteNote } from "../services/api.js";

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      const response = await getNotes();
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
        setUserName(user.userName || "");
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

  const openNoteDetail = (note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(selectedNote._id);
      fetchNotes();
      setSelectedNote(null);
    } catch (error) {
      console.log("failed to delete note", error);
      alert("failed to delete note, please try again");
    }
  };

  const openEditForm = (note) => {
    setEditNote(note);
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

            <div className="mb-4">
              <input
                type="text"
                placeholder="search notes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded text-gray-800"
              />
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Create New Note
            </button>
          </div>

          <div className="mt-6">
            {loadingNotes ? (
              <p>Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No notes yet. Create your first note!
              </p>
            ) : (
              <div className="space-y-3">
                {notes
                  .filter(
                    (note) =>
                      note.title
                        .toLowerCase()
                        .includes(searchQuery.toLocaleLowerCase()) ||
                      note.content
                        .toLocaleLowerCase()
                        .includes(searchQuery.toLocaleLowerCase()),
                  )
                  .map((note) => (
                    <div
                      key={note._id}
                      className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => openNoteDetail(note)}
                    >
                      <h3 className="font-medium text-gray-500">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {note.content.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {note.createdAt &&
                          new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {editNote && (
            <CreateNoteForm
              note={editNote}
              isEdit={true}
              onClose={() => setEditNote(null)}
              onSuccess={(updatedNote) => {
                setEditNote(null);
                fetchNotes().then(() => {
                  if (updatedNote) setSelectedNote(updatedNote);
                });
              }}
            />
          )}

          {selectedNote && (
            <div className="mb-6 p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedNote.title}
              </h3>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {selectedNote.content}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => setSelectedNote(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => openEditForm(selectedNote)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 mt-6">
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
