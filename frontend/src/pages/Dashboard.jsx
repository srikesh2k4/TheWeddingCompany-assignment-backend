import React, { useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  async function handleGet() {
    try {
      const res = await API.get("/org/get", {
        params: { organization_name: name },
      });
      setMsg(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setMsg(err.response?.data?.detail || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen py-16 px-4 bg-[#0d0d0d]">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-xl 
                      border border-gray-800 bg-[#161616]/80 backdrop-blur">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">
          Organization Dashboard
        </h2>

        {/* Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Enter Organization Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. my_organization"
            className="input bg-black/40 text-white border-gray-700 
                       focus:ring-indigo-500 focus:border-indigo-500"
          />

          <button
            onClick={handleGet}
            className="w-full bg-indigo-600 hover:bg-indigo-700 
                       text-white font-medium p-3 rounded-lg transition"
          >
            Fetch Organization
          </button>
        </div>

        {/* Result */}
        {msg && (
          <pre
            className="mt-6 p-4 bg-black/40 border border-gray-700 text-sm text-gray-200 
                       rounded-lg overflow-x-auto whitespace-pre-wrap"
          >
            {msg}
          </pre>
        )}
      </div>
    </div>
  );
}
