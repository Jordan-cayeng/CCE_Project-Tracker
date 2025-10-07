// src/components/Layout.jsx
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 hidden md:flex flex-col">
        <h1 className="text-xl font-bold text-blue-700 mb-6">CCE Tracker</h1>
        <nav className="space-y-3">
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Dashboard
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Projects
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Tasks
          </button>
        </nav>
        <div className="mt-auto text-xs text-gray-500">
          © {new Date().getFullYear()} Cay Civil Engineering
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Civil Engineering Project Tracker
          </h2>
          <div className="text-sm text-gray-500">Local Mode</div>
        </header>

        {/* Body */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}