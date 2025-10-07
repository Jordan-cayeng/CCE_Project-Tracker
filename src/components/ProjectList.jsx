import React from "react";

export default function ProjectList({ projects, selectedId, onSelect }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Select Project:</label>
      <select
        className="border rounded p-2 w-64"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a project --</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}