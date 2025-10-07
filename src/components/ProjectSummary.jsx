// src/components/ProjectSummary.jsx
import React from "react";

export default function ProjectSummary({ projects, tasks }) {
  // Helper function: returns tasks for a given project
  const getTasksByProject = (projectId) =>
    tasks.filter((t) => t.projectId === projectId);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">📊 Project Overview</h2>
      <div className="space-y-3">
        {projects.map((project) => {
          const projectTasks = getTasksByProject(project.id);
          const total = projectTasks.length;
          const complete = projectTasks.filter(
            (t) => t.status === "Complete"
          ).length;
          const percent =
            total > 0 ? Math.round((complete / total) * 100) : 0;

          return (
            <div
              key={project.id}
              className="bg-white border rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-700">
                  {project.name}
                </span>
                <span className="text-sm text-gray-600">
                  {complete} of {total} complete ({percent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    percent === 100
                      ? "bg-green-500"
                      : percent >= 50
                      ? "bg-blue-500"
                      : "bg-yellow-400"
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}