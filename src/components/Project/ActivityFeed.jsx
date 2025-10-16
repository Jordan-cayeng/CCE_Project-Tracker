import React from "react";

export default function ActivityFeed({ activePhases }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
      <h2 className="text-xl font-semibold mb-3">Activity Feed / Notes</h2>

      {activePhases?.length === 0 ? (
        <p className="text-gray-500">No active tasks right now.</p>
      ) : (
        activePhases.map((phase) => (
          <div key={phase.id} className="mb-5">
            <h3 className="font-semibold text-gray-800 mb-2">
              {phase.name} <span className="text-gray-500 text-sm">[Active]</span>
            </h3>

            {phase.tasks
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <div key={task.id} className="ml-4 mb-3">
                  <p className="font-medium text-gray-700">{task.name}</p>
                  <p className="text-gray-500 text-sm mb-1">
                    {task.notes?.[0] || "No notes yet."}
                  </p>
                  <button className="text-blue-600 text-sm hover:underline">
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
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
}
