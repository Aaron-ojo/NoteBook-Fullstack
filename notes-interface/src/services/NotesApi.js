import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/notes",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Interceptor adding token:", token ? "YES" : "NO"); // ADD THIS

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createNote = (noteData) => {
  return API.post("/create", noteData);
};

export const getAllNotes = (noteGetAll) => {
  return API.get("/getAllNotes", noteGetAll);
};

export const getNote = (noteGet) => {
  return API.get("/:id", noteGet);
};

export const updateNote = (noteUpdate) => {
  return API.put("/:id", noteUpdate);
};

export const deleteNote = (noteDelete) => {
  return API.delete("/:id", noteDelete);
};
