// src/components/layout/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-white dark:bg-cce-dark border-b border-cce-gray dark:border-cce-light px-6 py-3 flex justify-between items-center sticky top-0 z-10 transition-colors duration-300 shadow-subtle">
      <h2 className="text-lg font-semibold text-cce-dark dark:text-cce-light">
        Cay Civil Engineering Project Tracker
      </h2>
    </header>
  );
}