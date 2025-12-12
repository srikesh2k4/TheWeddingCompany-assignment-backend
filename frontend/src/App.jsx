import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CreateOrg from "./pages/CreateOrg";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200">

      {/* NAVBAR */}
      <nav className="bg-[#161616]/90 backdrop-blur-md border-b border-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Brand */}
          <NavLink
            to="/"
            className="text-xl font-semibold tracking-tight text-white hover:text-indigo-400 transition duration-200"
          >
            The Wedding Company
          </NavLink>

          {/* Nav Menu */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `text-sm font-medium transition duration-200 px-2 py-1 rounded 
                 ${
                   isActive
                     ? "text-indigo-400 bg-indigo-400/20"
                     : "text-gray-400 hover:text-white hover:bg-gray-800"
                 }`
              }
            >
              Create Org
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-sm font-medium transition duration-200 px-2 py-1 rounded 
                 ${
                   isActive
                     ? "text-indigo-400 bg-indigo-400/20"
                     : "text-gray-400 hover:text-white hover:bg-gray-800"
                 }`
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <Routes>
          <Route
            path="/"
            element={
              <div className="mt-10 bg-[#161616]/70 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl">

                {/* Title */}
                <h1 className="text-3xl font-bold text-white tracking-wide mb-4">
                  Backend Intern Assignment – Organization Management Service
                </h1>

                {/* Objective Section */}
                <div className="text-gray-300 text-lg leading-relaxed space-y-4 mb-10">
                  <h2 className="text-2xl text-indigo-400 font-semibold">Objective</h2>
                  <p>
                    Build a backend service using any backend framework of your choice,
                    preferably a Python framework such as Django or FastAPI, that supports
                    creating and managing organizations in a multi-tenant style architecture.
                  </p>
                  <p>
                    The system must maintain a master database for global metadata and
                    dynamically create collections for each organization. Your task is to
                    design and implement the required REST APIs and authentication flow
                    with proper authorization controls.
                  </p>
                </div>

                <hr className="border-gray-700 my-6" />

                {/* Creator Section */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-indigo-400">
                    Created By
                  </h2>

                  <p className="text-gray-300 text-lg">
                    <span className="font-medium text-white">Kotipalli Srikesh</span>
                  </p>

                  <p className="text-gray-400">
                    Registration Number: <span className="text-gray-200">RA2211003010979</span>
                  </p>

                  <a
                    href="https://www.linkedin.com/in/kotipalli-srikesh-9487561b9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-indigo-400 hover:text-indigo-300 transition text-sm underline"
                  >
                    LinkedIn Profile
                  </a>

                  <p className="text-gray-400 text-sm leading-relaxed mt-4">
                    This project was fully developed as part of a backend engineering
                    assignment. It demonstrates multi-tenant architecture, dynamic MongoDB
                    collection creation, JWT authentication, admin management workflows,
                    and a fully functional React frontend integrated with FastAPI.
                  </p>
                </div>
              </div>
            }
          />

          <Route path="/create" element={<CreateOrg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}
