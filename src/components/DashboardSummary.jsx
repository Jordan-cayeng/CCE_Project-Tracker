// src/components/DashboardSummary.jsx
import React from "react";

export default function DashboardSummary({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Complete").length;
  const waitingTasks = tasks.filter((t) => t.status === "Waiting on Client").length;
  const activeTasks = totalTasks - completedTasks - waitingTasks;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 text-center shadow-sm">
        <h3 className="text-sm font-semibold text-blue-700">Total Tasks</h3>
        <p className="text-2xl font-bold text-blue-800">{totalTasks}</p>
      </div>

      <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center shadow-sm">
        <h3 className="text-sm font-semibold text-green-700">Completed</h3>
        <p className="text-2xl font-bold text-green-800">{completedTasks}</p>
      </div>

      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center shadow-sm">
        <h3 className="text-sm font-semibold text-yellow-700">Active</h3>
        <p className="text-2xl font-bold text-yellow-800">{activeTasks}</p>
      </div>

      <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-center shadow-sm">
        <h3 className="text-sm font-semibold text-orange-700">Waiting on Client</h3>
        <p className="text-2xl font-bold text-orange-800">{waitingTasks}</p>
      </div>
    </div>
  );
}