import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { registerUser } from "../services/api.js";
//continuing from step 7. Updating Inputs

function RegisterPage() {
  // const [formData, setFormData] = useState({
  //   userName: "",
  //   email: "",
  //   password: "",
  // });

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
    setFieldErrors({ ...fieldErrors, [name]: value });

    if (name === "email" && value && !value.includes("@")) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    }
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
      console.log("full error object for debugging ", error);
      console.log("response data", error.response?.data);

      setError(JSON.stringify(error.response?.data || error.message));

      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        console.log("found validation errors", error.response.data.errors);

        const errorMessages = error.response.data.errors
          .map((err) => `${err.field}: ${err.message}`)
          .join(", ");

        setError(`please fix: ${errorMessages}`);
      } else if (error.response?.data?.message) {
        console.log("found controller error:", error.response.data.message);

        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log("registration attempt", formData);
  };

  const formatFieldNames = (field) => {
    if (field === "userName") return "Username";
    if (field === "email") return "Email";
    if (field === "password") return "Password";
    return field;
  };

  const errorList = error.response.data.errors
    .map((err) => `${formatFieldNames(err.field)}:${err.message}`)
    .join("\n");

  setError(`please fix the following: \n${errorList}`);

  const newFieldErrors = { userName: "", email: "", password: "" };
  error.response.data.errors.forEach((err) => {
    if (["userName", "email", "password"].includes(err.field)) {
      newFieldErrors[err.field] = err.message;
    }
  });
  setFieldErrors(newFieldErrors);

  return (
    <div className="h-screen flex justify-center items-center w-full flex-col">
      <h1 className="text-gray-800 text-2xl font-bold">Register on NOTEBOOK</h1>
      <p className="text-gray-400 mb-6">
        Create your account to start taking notes
      </p>
      <div className="container bg-gray-800 rounded-lg shadow-lg p-8 mx-auto w-80 mt-4">
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

          <input type="text" />

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
