import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/projects").then((res) => res.json()),
      fetch("http://localhost:3001/tasks").then((res) => res.json()),
    ])
      .then(([projectsData, tasksData]) => {
        setProjects(projectsData);
        setTasks(tasksData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="text-cce-light">Loading tasks...</div>;
  }

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject.id)
    : tasks;

  return (
    <div className="space-y-6 relative" ref={dropdownRef}>
      <h1 className="text-2xl font-semibold text-cce-light">Tasks</h1>

      {/* Unified search/select bar */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search or select a project..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full pr-10 border border-cce-gray/60 bg-white text-cce-dark rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cce-light transition-all duration-200"
        />

        {/* Clear (X) */}
        {(searchQuery || selectedProject) && (
          <button
            type="button"
            onClick={() => {
              setSelectedProject(null);
              setSearchQuery("");
              setIsDropdownOpen(false);
            }}
            className="absolute inset-y-0 right-2 my-auto px-2 text-sm text-cce-dark/70 hover:text-cce-dark"
            aria-label="Clear selection"
          >
            ×
          </button>
        )}

        {/* Solid, opaque dropdown with animation */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto
                         bg-white opacity-100
                         border border-cce-gray/70
                         rounded-md shadow-2xl ring-1 ring-cce-light/40"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <li
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      setSearchQuery(project.name);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer transition-colors duration-150 
                                hover:bg-cce-light/40
                                ${selectedProject?.id === project.id ? "bg-cce-light/60 font-semibold" : ""}`}
                  >
                    <span className="text-cce-dark">{project.name}</span>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 italic text-cce-dark/70">No matching projects</li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Task table */}
      <div className="overflow-x-auto bg-white text-cce-dark border border-cce-gray rounded-xl shadow-card">
        <table className="min-w-full divide-y divide-cce-gray/70">
          <thead className="bg-cce-light/40">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Task</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Project</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Owner</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cce-gray/50">
            {visibleTasks.length > 0 ? (
              visibleTasks.map((task) => (
                <tr key={task.id} className="hover:bg-cce-light/20">
                  <td className="px-4 py-2">{task.name}</td>
                  <td className="px-4 py-2">
                    {projects.find((p) => p.id === task.projectId)?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2">{task.owner}</td>
                  <td className="px-4 py-2">{task.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-cce-dark/80">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
