import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUserType, setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blogweb-9heo.onrender.com/login", {
        email,
        password,
      });

      if (response.data.status === "ok") {
        const { token, userType, fname, lname } = response.data.data;

        // Log token, userType, fname, and lname in the console
        console.log("Token:", token);
        console.log("User Type:", userType);
        console.log("First Name:", fname);
        console.log("Last Name:", lname);

        // Storing details in localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userType", userType);
        localStorage.setItem("userName", `${fname} ${lname}`);
        localStorage.setItem("token", token);

        // Update global state
        setIsLoggedIn(true);
        setUserType(userType);
        setUserName(`${fname} ${lname}`);

        // Redirect based on userType
        if (userType === "Admin") {
          navigate("/blogForm");
        } else {
          navigate("/blogPost");
        }
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("An error occurred");
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Redirect to the Forgot Password page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-6">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>

          <p className="mt-4 text-gray-600 text-sm text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
          <p className="mt-2 text-gray-600 text-sm text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;













