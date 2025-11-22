import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../api";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await signin({
        email: values.email,
        password: values.password,
      });

      if (data.error) {
        setError(data.error);
      } else {
        login(data.user, data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4">
            Sign In
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400">Welcome back! Please sign in to continue</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                required
                className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Your password"
                required
                className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
