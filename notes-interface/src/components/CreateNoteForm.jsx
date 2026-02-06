import React, { useState } from "react";
import { createNote, updateNote } from "../services/api.js";

function CreateNoteForm({ onClose, onSuccess, isEdit = false, note = null }) {
  const [formData, setFormData] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (isEdit) {
        const response = await updateNote(note._id, formData);
        window.alert("Note updated successfully");
        onSuccess(response.data.data);
      } else {
        const response = await createNote(formData);
        window.alert("Note created successfully");
        onSuccess(response.data.data);
      }
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.error("failed to submit note", error);
      if (typeof error.response?.data === "string")
        setError(error.response.data);
      else if (error.response?.data?.message)
        setError(error.response.data.message);
      else setError("Failed to submit note, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl text-gray-800 font-bold mb-4">
            {isEdit ? "Edit Note" : "Create New Note"}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-800 border rounded"
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 text-gray-800 border rounded"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-800 border rounded hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update Note"
                    : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNoteForm;
