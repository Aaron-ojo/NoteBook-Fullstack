import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { loginUser } from "../api/auth.api.js";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      console.log("login successful", response.data);
      setFormData({ email: "", password: "" });
      // TO redirect to dashboard or home page after login
    } catch (error) {
      console.error("login failed", error);
      setError(error.response?.data || "login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col ">
      <h1 className="text-gray-800 font-bold text-2xl">Login to NOTEBOOK</h1>
      <p>Access your notes more prominently</p>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-80 container mx-auto mt-4">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg w-full p-2 mb-4 text-gray-800"
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
            className="rounded-lg w-full p-2 mb-4 text-gray-800"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-2xl text-gray-800 rounded-lg w-full p-2 hover:bg-gray-200"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-white mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
