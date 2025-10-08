import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/projects").then((res) => res.json()),
      fetch("http://localhost:3001/tasks").then((res) => res.json()),
    ])
      .then(([projData, taskData]) => {
        setProjects(projData);
        setTasks(taskData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-cce-dark dark:text-cce-light">Loading dashboard...</div>;
  }

  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const completedTasks = tasks.filter((t) => t.status === "Complete").length;
  const openTasks = tasks.filter((t) => t.status !== "Complete").length;

  const metrics = [
    { title: "Active Projects", value: activeProjects, color: "bg-cce-light" },
    { title: "Open Tasks", value: openTasks, color: "bg-yellow-400 text-cce-dark" },
    { title: "Completed Tasks", value: completedTasks, color: "bg-green-500 text-white" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-cce-dark dark:text-cce-light">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-card p-4 flex flex-col items-center justify-center transition-colors duration-300 ${metric.color}`}
          >
            <div className="text-4xl font-bold">{metric.value}</div>
            <div className="text-sm font-medium mt-1">{metric.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}