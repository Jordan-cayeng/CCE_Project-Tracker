import React from "react";

export default function ProjectHeader({ project, setProject }) {
  const handleStatusChange = (e) => {
    setProject({ ...project, status: e.target.value });
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {project.name || "Unnamed Project"}
        </h1>
        <select
          value={project.status || "Active"}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded-md p-1 text-sm"
        >
          <option>Active</option>
          <option>In Progress</option>
          <option>Complete</option>
          <option>On Hold</option>
        </select>
      </div>

      <p className="text-gray-600 mt-1">
        Client: {project.client || "N/A"}
      </p>
      <p className="text-gray-600">Project No: {project.id || "N/A"}</p>

      <div className="mt-3">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Overall Progress: {project.progress || 0}%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${project.progress || 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
