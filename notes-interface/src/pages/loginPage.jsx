import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api.js";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      console.log("login successful", response.data);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        const userData = {
          email: formData.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setSuccess("Login successful, Redirecting...");
      setFormData({ email: "", password: "" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("login failed", error);
      setFieldErrors({ email: "", password: "" });

      if (!error.response) {
        setError("cannot connect to server, please check your connection");
        return;
      }

      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const errorMessages = error.response.data.errors
          .map((err) => {
            const fieldName = err.field === "email" ? "Email" : "Password";
            const message =
              err.message.charAt(0).toUpperCase() + err.message.slice(1);
            return `${fieldName}: ${message}`;
          })
          .join("\n");
        setError(`please fix the following:\n${errorMessages}`);

        const newFieldErrors = { email: "", password: "" };
        error.response.data.errors.forEach((err) => {
          if (err.field === "email" || err.field === "password") {
            newFieldErrors[err.field] = err.message;
          }
        });
        setFieldErrors(newFieldErrors);
        return;
      }

      if (error.response?.data?.message) {
        const message = error.response.data.message.toLowerCase();

        if (
          message.includes("email") ||
          message.includes("password") ||
          message.includes("invalid") ||
          message.includes("credentials")
        ) {
          setFieldErrors({
            email: "invalid email or password",
            password: "invalid email or password",
          });
          setError("invalid email or password, please check your credentials");
        } else {
          setError(error.response.data.message);
        }
        return;
      }

      setError("login failed, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col ">
      <h1 className="text-gray-800 font-bold text-2xl">Login to INKNOTES</h1>
      <p>Access your notes more prominently</p>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-80 container mx-auto mt-4">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`rounded-lg w-full p-2 text-gray-800 ${
                fieldErrors.email ? "border-2 border-red-500" : ""
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`rounded-lg w-full p-2 text-gray-800 ${
                fieldErrors.password ? "border-2 border-red-500" : ""
              }`}
            />
            {fieldErrors.password && (
              <p className="text-red-400 text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

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
