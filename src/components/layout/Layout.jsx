// src/components/layout/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen font-sans flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-col flex-1 bg-cce-gray text-cce-textDark">
        <Header />
        <div className="p-6 space-y-6 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
