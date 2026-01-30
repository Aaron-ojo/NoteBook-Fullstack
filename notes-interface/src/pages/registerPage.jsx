import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { registerUser } from "../services/api.js";

function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await registerUser(formData);

      console.log("registration successful", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setFormData({ userName: "", email: "", password: "" });
    } catch (error) {
      console.log("Error Investigation time");
      console.log(typeof error);
      console.log(Object.keys(error));

      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log("no response - network error");
      }

      setError(JSON.stringify(error.message.data) || error.message);
    } finally {
      setIsLoading(false);
    }
    console.log("registration attempt", formData);
  };

  return (
    <div className="h-screen flex justify-center items-center w-full flex-col">
      <h1 className="text-gray-800 text-2xl font-bold">Register on NOTEBOOK</h1>
      <p className="text-gray-400 mb-6">
        Create your account to start taking notes
      </p>
      <div className="container bg-gray-800 rounded-lg shadow-lg p-8 mx-auto w-80 mt-4">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
        )}

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="userName" className="text-white">
            Username:
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={formData.userName}
            onChange={handleChange}
            className="rounded-lg w-full p-2 text-gray-800"
          />

          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg w-full p-2 text-gray-800"
          />

          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-lg w-full p-2 text-gray-800"
          />

          <button
            type="submit"
            className="w-full bg-white text-gray-800 hover:bg-gray-200 p-2 rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
