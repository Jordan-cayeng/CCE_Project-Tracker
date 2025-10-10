import React, { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-cce-light">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-cce-light">Projects</h1>

      <div className="overflow-x-auto bg-white text-cce-dark border border-cce-gray rounded-xl shadow-card">
        <table className="min-w-full divide-y divide-cce-gray/70">
          <thead className="bg-cce-light/40">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Project Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Manager</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cce-gray/50">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-cce-light/20">
                <td className="px-4 py-2">{proj.name}</td>
                <td className="px-4 py-2">{proj.status}</td>
                <td className="px-4 py-2">{proj.manager}</td>
                <td className="px-4 py-2">{proj.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
