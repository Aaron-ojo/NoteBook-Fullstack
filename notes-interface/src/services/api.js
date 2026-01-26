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

export const register = (userData) => API.post("/auth/register", userData);
export const login = (credentials) => API.post("/auth/login", credentials);

export const getNotes = () => API.get("/notes/getAllNotes");
export const createNote = (noteData) => API.post("/notes/create", noteData);

export default API;
