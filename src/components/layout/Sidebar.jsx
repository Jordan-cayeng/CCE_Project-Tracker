import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FolderKanban, CheckSquare, Settings } from "lucide-react";
import logo from "../../assets/Cay_Social_LightBlueNavy.svg";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

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
      } bg-cce-dark text-cce-textLight h-screen flex flex-col transition-[width] duration-300 ease-in-out`}
    >
      {/* --- Top Section / Logo + Toggle --- */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cce-gray/30">
        <img
          src={logo}
          alt="CCE logo"
          className={`${isOpen ? "h-10" : "h-8"} w-auto transition-all duration-300 object-contain`}
          draggable="false"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-cce-textLight hover:text-cce-accent1 transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          {isOpen ? "‹" : "›"}
        </button>
      </div>

      {/* --- Navigation Links --- */}
      <nav className="flex-1 px-2 mt-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer
                ${
                  active
                    ? "bg-cce-dark text-cce-dark"
                    : "hover:bg-cce-accent1/40 hover:text-cce-textLight"
                }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* --- Footer --- */}
      <div className="p-4 border-t border-cce-gray/30 text-xs text-cce-light">
        {isOpen && <>© {new Date().getFullYear()} Cay Civil Engineering</>}
      </div>
    </aside>
  );
}
