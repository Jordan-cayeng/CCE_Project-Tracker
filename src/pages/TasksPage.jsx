import React, { useEffect, useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-cce-dark dark:text-cce-light">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-cce-dark dark:text-cce-light">
        Tasks
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-cce-dark border border-cce-gray dark:border-cce-light rounded-xl shadow-card transition-colors duration-300">
        <table className="min-w-full divide-y divide-cce-gray dark:divide-cce-light/40">
          <thead className="bg-cce-light/50 dark:bg-cce-dark/30">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Task</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Project</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Owner</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cce-gray/40 dark:divide-cce-light/20">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-cce-light/30 dark:hover:bg-cce-light/10">
                <td className="px-4 py-2">{task.task}</td>
                <td className="px-4 py-2">{task.project}</td>
                <td className="px-4 py-2">{task.owner}</td>
                <td className="px-4 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}