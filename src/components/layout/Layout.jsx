// src/components/layout/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen font-sans flex">
      {/* Sidebar (Dark Section) */}
      <aside className="bg-cce-dark text-white w-64 flex-shrink-0 min-h-screen">
        <Sidebar />
      </aside>

      {/* Main Content (Light Section) */}
      <main className="flex flex-col flex-1 bg-cce-gray text-gray-900">
        <Header />
        <div className="p-6 space-y-6 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
