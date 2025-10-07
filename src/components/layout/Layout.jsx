import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const pageTitles = {
    dashboard: "Dashboard Overview",
    projects: "Projects",
    tasks: "Tasks",
    settings: "Settings",
  };

  return (
    <div className="flex min-h-screen bg-cce-gray">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col font-sans">
        <Header title={pageTitles[currentPage]} />
        <div className="p-6 space-y-6 bg-cce-gray/40">{children}</div>
      </main>
    </div>
  );
}
