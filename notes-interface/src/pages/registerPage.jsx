import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api.js";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }

    if (error) {
      setError("");
    }

    if (name === "email" && value && !value.includes("@")) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    setError("");
    setFieldErrors({ userName: "", email: "", password: "" });
    if (isLoading) {
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({ userName: "", email: "", password: "" });

    try {
      const response = await registerUser(formData);

      console.log("registration successful", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSuccess("Registration successful, redirecting to login...");

      setFormData({ userName: "", email: "", password: "" });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("full error object for debugging ", error);
      console.log("response data", error.response?.data);

      if (!error.response) {
        setError("Cannot connect to server");
        return;
      }

      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        console.log("found validation errors", error.response.data.errors);

        const formattedErrors = error.response.data.errors
          .map((err) => {
            const fieldName = formatFieldNames(err.field);
            const message = capitalizeFirst(err.message);
            return `${fieldName}: ${message}`;
          })
          .join("\n");

        setError(`${formattedErrors}`);

        const newFieldErrors = { userName: "", email: "", password: "" };
        error.response.data.errors.forEach((err) => {
          if (["userName", "email", "password"].includes(err.field)) {
            newFieldErrors[err.field] = capitalizeFirst(err.message);
          }
        });
        setFieldErrors(newFieldErrors);

        return;
      }

      if (error.response?.data?.message) {
        console.log("found controller error:", error.response.data.message);
        setError(error.response.data.message);
        return;
      }

      if (error.response.data.errors.length === 1) {
        const err = error.response.data.errors[0];
        const fieldName = formatFieldName(err.field);
        const message = capitalizeFirst(err.message);
        setError(`${fieldName}: ${message}`);
      } else {
        const formattedErrors = error.response.data.errors
          .map((err) => {
            const fieldName = formatFieldName(err.field);
            const message = capitalizeFirst(err.message);
            return `${fieldName}: ${message}`;
          })
          .join("\n");
        setError(`Please fix the following:\n${formattedErrors}`);
      }

      setError(JSON.stringify(error.response?.data || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const formatFieldNames = (field) => {
    if (field === "userName") return "Username";
    if (field === "email") return "Email";
    if (field === "password") return "Password";
    return field;
  };

  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="h-screen flex justify-center items-center w-full flex-col">
      <h1 className="text-gray-800 text-2xl font-bold">Register on INKNOTES</h1>
      <p className="text-gray-400 mb-6">
        Create your account to start taking notes
      </p>
      <div className="container bg-gray-800 rounded-lg shadow-lg p-8 mx-auto w-80 mt-4">
        {success && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {success}
          </div>
        )}

        {error && error.includes("\n") ? (
          <div>
            <p>Please fix the following:</p>
            {error.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ) : (
          <div>{error}</div>
        )}

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
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
            {fieldErrors.userName && (
              <p className="text-red-400 text-sm mt-1">
                {fieldErrors.userName}
              </p>
            )}
          </div>

          <div>
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
            {fieldErrors.email && (
              <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
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
            {fieldErrors.password && (
              <p className="text-red-400 text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded-lg font-medium ${isLoading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-200"}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
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
