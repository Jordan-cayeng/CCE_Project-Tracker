// src/components/layout/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen font-sans bg-cce-dark text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          {/* Page content */}
          <div className="p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
