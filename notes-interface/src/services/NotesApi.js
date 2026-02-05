import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/notes-api",
});

export const createNote = (noteData) => {
  return API.post("notes/create", noteData);
};
