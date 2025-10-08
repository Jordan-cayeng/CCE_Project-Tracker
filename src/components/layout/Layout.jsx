// src/components/layout/Layout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export const ThemeContext = React.createContext();

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Apply whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {/* 👇 global wrapper that was incorrectly outside the component */}
      <div className="min-h-screen font-sans bg-cce-gray text-cce-dark dark:bg-cce-dark dark:text-cce-light transition-colors duration-300">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col font-sans">
            <Header />
            <div className="p-6 space-y-6 bg-cce-gray/40 dark:bg-cce-dark/60 transition-colors duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
