import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FolderKanban, CheckSquare, Settings } from "lucide-react";
import { ThemeContext } from "../layout/Layout";
import logoLight from "../../assets/Cay_Social_NavyLightBlue.svg";
import logoDark from "../../assets/Cay_Social_LightBlueNavy.svg";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} />, path: "/" },
    { id: "projects", label: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
    { id: "tasks", label: "Tasks", icon: <CheckSquare size={18} />, path: "/tasks" },
    { id: "settings", label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
       } bg-cce-gray dark:bg-cce-dark text-cce-dark dark:text-cce-light h-screen flex flex-col transition-all duration-300`}
    >
      {/* --- Top Section / Logo --- */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cce-light/30">
        {/* wrap logo in color context for theme switching */}
      <img
        src={darkMode ? logoDark : logoLight}
        alt="CCE logo"
        className={`${isOpen ? "h-10" : "h-8"} w-auto transition-all duration-300 object-contain`}
        draggable="false"
      />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-cce-light hover:text-white"
          aria-label="Toggle sidebar"
        >
          {isOpen ? "‹" : "›"}
        </button>
      </div>

      {/* --- Navigation Links --- */}
      <nav className="flex-1 px-2 mt-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              location.pathname === item.path
                ? "bg-cce-light text-cce-dark"
                : "text-white hover:bg-cce-light hover:text-cce-dark"
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* --- Footer --- */}
      <div className="p-4 border-t border-cce-light/30 text-xs text-cce-light">
        {isOpen && <>© {new Date().getFullYear()} Cay Civil Engineering</>}
      </div>
    </aside>
  );
}
