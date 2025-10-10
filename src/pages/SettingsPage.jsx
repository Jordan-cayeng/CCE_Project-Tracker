// src/pages/SettingsPage.jsx
import { useContext } from "react";
import { ThemeContext } from "../components/layout/Layout";

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-cce-dark border border-cce-gray dark:border-cce-light rounded-xl shadow-card p-6 transition-colors duration-300">
        <h1 className="text-2xl font-semibold text-cce-dark dark:text-cce-light mb-4">
          Settings
        </h1>
      </div>
    </div>
  );
}
