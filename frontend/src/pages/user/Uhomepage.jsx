import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserNavbar from "../../components/navbar/UserNavbar.jsx";
import { useAuthStore } from "../../utils/isloggedin.js";

const Uhomepage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.redirectUrl) {
        checkAuth();
        navigate(data.redirectUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-cyan-300 to-orange-600 text-gray-800">
      {/* Pass setFormData as a prop */}
      <UserNavbar setFormData={setFormData} />
      <h1 className="text-2xl text-red-600 text-center my-4">User Homepage</h1>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/4 text-center">
            <h1 className="text-white text-xl mb-4">User Login</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <label className="text-teal-200 text-left">
                Username:
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-400"
                />
              </label>
              <label className="text-teal-200 text-left">
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-400"
                />
              </label>
              <label className="text-teal-200 text-left">
                Password:
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-400"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-4">
              <p className="text-white">Don't have an account?</p>
              <Link to="/user/signup" className="text-blue-300 hover:text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uhomepage;
