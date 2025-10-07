// src/pages/SettingsPage.jsx
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update theme whenever the toggle changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-cce-dark border border-cce-gray dark:border-cce-light rounded-xl shadow-card p-6 transition-colors duration-300">
        <h1 className="text-2xl font-semibold text-cce-dark dark:text-cce-light mb-4">
          Settings
        </h1>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-200">
            Appearance Mode
          </span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
              darkMode ? "bg-cce-light" : "bg-cce-dark"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          Toggle between light and dark mode. Your choice is saved automatically.
        </p>
      </div>
    </div>
  );
}