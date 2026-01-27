import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = async (credentials) => {
  return API.post("/auth/login", credentials);
};

export const getNotes = async () => {
  return API.get("/notes/getAllNotes");
};

export const createNote = async (noteData) => {
  return API.post("/notes/create", noteData);
};

export const updateNote = async (id, noteData) => {
  return API.put(`/notes/${id}`, noteData);
};

export const deleteNote = async (id) => {
  return API.delete(`/notes/${id}`);
};
