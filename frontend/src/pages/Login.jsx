import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", { email, password });
      const token = res.data.access_token;

      localStorage.setItem("token", token);
      setMsg("Login successful");
      nav("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.detail || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start py-16 px-4 bg-[#0d0d0d]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl 
                      border border-gray-800 bg-[#161616]/80 backdrop-blur">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              type="email"
              required
              className="input bg-black/40 text-white border-gray-700 
                         focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Password</label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPass ? "text" : "password"}
                required
                className="input bg-black/40 text-white border-gray-700 
                           focus:border-indigo-500 focus:ring-indigo-500 pr-12"
              />

              {/* Show / Hide Button */}
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-3 flex items-center 
                           text-gray-400 hover:text-white transition"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full btn-primary bg-indigo-600 hover:bg-indigo-700 
                       text-white font-medium p-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Message */}
        {msg && (
          <div
            className={`mt-5 text-center text-sm font-medium ${
              msg.toLowerCase().includes("success")
                ? "text-green-400"
                : "text-red-500"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
