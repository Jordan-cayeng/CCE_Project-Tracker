import React, { useState, useMemo, useRef, useEffect } from "react";
import ProjectHeader from "../components/Project/ProjectHeader";
import ActivityFeed from "../components/Project/ActivityFeed";
import PhaseCard from "../components/Project/PhaseCard";
import ContactsSection from "../components/Project/ContactsSection";
import { getProjects } from "../../lib/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  // 🔹 Fetch projects from API
  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        if (data.length > 0) setProject(data[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 🔍 Filtered project list
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return [];
    return projects.filter((p) =>
      (p.projectName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, projects]);

  // 🧠 Handle selection
  const handleSelectProject = (selected) => {
    setProject(selected);
    setSearchTerm(selected.projectName);
    setIsDropdownOpen(false);
  };

  // 🧹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activePhases =
    project?.phases?.filter((phase) => phase.status === "In Progress") || [];

  const handleProjectUpdate = (updatedProject) => {
    setProject({ ...updatedProject });
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-6 text-red-600">
        <p>Error loading projects: {error}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 🔍 Search Bar */}
      <div ref={searchRef} className="relative w-1/2">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200 shadow-sm bg-white"
        />

        {/* Dropdown list */}
        {isDropdownOpen && filteredProjects.length > 0 && (
          <ul
            className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-xl max-h-64 overflow-y-auto"
          >
            {filteredProjects.map((p) => (
              <li
                key={p.id}
                onClick={() => handleSelectProject(p)}
                className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700 cursor-pointer flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{p.projectName}</span>
                  <span className="text-xs text-gray-500">
                    {p.client || "No client"}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    p.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : p.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : p.status === "Complete"
                      ? "bg-gray-200 text-gray-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {isDropdownOpen && searchTerm && filteredProjects.length === 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg px-3 py-2 text-sm text-gray-500">
            No matching projects
          </div>
        )}
      </div>

      {/* 🧱 Project Header */}
      {project && <ProjectHeader project={project} setProject={handleProjectUpdate} />}

      {/* 🗒️ Activity Feed */}
      {project && (
        <ActivityFeed
          project={project}
          activePhases={activePhases}
          setProject={handleProjectUpdate}
        />
      )}

      {/* 👥 Contacts */}
      {project?.contacts && (
        <ContactsSection
          contacts={project.contacts}
          setProject={handleProjectUpdate}
        />
      )}

      {/* 📋 Phase Cards */}
      <div className="flex flex-col gap-6">
        {project?.phases?.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            project={project}
            setProject={handleProjectUpdate}
          />
        ))}
      </div>
    </div>
  );
}
