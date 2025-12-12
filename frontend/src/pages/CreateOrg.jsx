import React, { useState } from "react";
import API from "../api/api";

export default function CreateOrg() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/;

  function validateInputs() {
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailErr("Enter a valid email.");
      valid = false;
    } else setEmailErr("");

    if (!passwordRegex.test(password)) {
      setPassErr("Min 6 chars, must include letters & numbers.");
      valid = false;
    } else setPassErr("");

    return valid;
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const res = await API.post("/org/create", {
        organization_name: name,
        email,
        password,
      });

      setMsg("Organization created successfully: " + res.data.organization_name);
    } catch (err) {
      setMsg(err.response?.data?.detail || "Something went wrong.");
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen py-16 px-4 bg-[#0d0d0d]">
      <div className="w-full max-w-lg bg-[#161616]/80 backdrop-blur
                      p-8 rounded-2xl shadow-xl border border-gray-800">

        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Organization
        </h2>

        <form onSubmit={handleCreate} className="space-y-5">

          {/* Organization Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">
              Organization Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. my_org"
              className="bg-black/40 text-white border border-gray-700
                         rounded-lg p-3 focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Admin Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              type="email"
              className={`bg-black/40 text-white border rounded-lg p-3 outline-none 
                          focus:ring-2 focus:ring-indigo-500
                          ${emailErr ? "border-red-500" : "border-gray-700"}`}
            />
            {emailErr && <p className="text-red-500 text-xs">{emailErr}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium text-gray-300">Password</label>

            {/* Eye button positioned ABOVE the input */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-1.5 px-2 py-1 text-xs 
                         text-gray-400 hover:text-white bg-[#1f1f1f] rounded-md"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              className={`bg-black/40 text-white border rounded-lg p-3 pr-14 outline-none
                          focus:ring-2 focus:ring-indigo-500 text-base
                          ${passErr ? "border-red-500" : "border-gray-700"}`}
            />

            {passErr && <p className="text-red-500 text-xs">{passErr}</p>}
          </div>

          {/* Submit */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white
                       font-medium p-3 rounded-lg transition"
          >
            Create Organization
          </button>
        </form>

        {/* Result */}
        {msg && (
          <div
            className={`mt-4 text-center text-sm font-medium ${
              msg.toLowerCase().includes("success")
                ? "text-green-500"
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
