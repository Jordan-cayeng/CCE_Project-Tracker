import React from "react";

export default function PhaseCard({ phase }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{phase.name}</h2>
        <span className="text-sm text-gray-600">{phase.status}</span>
      </div>
      <p className="text-gray-500 text-sm mb-3">{phase.goal}</p>

      {phase.tasks?.map((task) => (
        <div key={task.id} className="mb-3 ml-2">
          <p className="font-medium text-gray-700">{task.name}</p>
          <p className="text-gray-500 text-sm mb-1">
            {task.notes?.[0] || "No task notes yet."}
          </p>
          <button className="text-blue-600 text-xs hover:underline">
            + Add Task Note
          </button>

          {task.subtasks?.map((sub, i) => (
            <div key={i} className="ml-4 mt-1 border-l pl-3">
              <p className="text-sm font-medium text-gray-700">
                {sub.name}{" "}
                {sub.status === "Complete" && (
                  <span className="text-green-500">(Complete)</span>
                )}
              </p>
              <p className="text-gray-500 text-xs mb-1">
                {sub.notes?.[0] || "No subtask notes yet."}
              </p>
              <button className="text-blue-600 text-xs hover:underline">
                + Add Subtask Note
              </button>
            </div>
          ))}
          <button className="text-blue-600 text-xs hover:underline mt-1">
            + Add Subtask
          </button>
        </div>
      ))}
      <button className="text-blue-600 text-sm hover:underline mt-3">
        + Add Task
      </button>
    </div>
  );
}
