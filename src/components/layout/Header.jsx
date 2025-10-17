// src/components/layout/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between border-b border-cce-light bg-cce-navy">
      <h1 className="text-lg font-semibold text-cce-light">Project Tracker</h1>
      <div className="flex items-center gap-4">
        <button className="text-sm hover:text-cce-blue transition">Notifications</button>
        <div className="flex items-center gap-2">
          <span className="text-sm">Jordan</span>
        </div>
      </div>
    </header>
  );
}
