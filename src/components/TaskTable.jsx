import React, { useState } from "react";

export default function TaskTable({ tasks, onDeleteTask, onEditTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditData(task);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    onEditTask(editData);
    cancelEdit();
  };

  if (tasks.length === 0) return <p>No tasks found for this project.</p>;

  return (
    <table className="border-collapse border w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1 text-left">Task</th>
          <th className="border px-2 py-1 text-left">Owner</th>
          <th className="border px-2 py-1 text-left">Deadline</th>
          <th className="border px-2 py-1 text-left">Status</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <td className="border px-2 py-1">
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    name="owner"
                    value={editData.owner}
                    onChange={handleChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="date"
                    name="deadline"
                    value={editData.deadline}
                    onChange={handleChange}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border px-2 py-1">
                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleChange}
                    className="border rounded p-1 w-full"
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Waiting on Client</option>
                    <option>In Review</option>
                    <option>Complete</option>
                  </select>
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 text-white px-2 py-1 rounded mr-1 hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="border px-2 py-1">{task.name}</td>
                <td className="border px-2 py-1">{task.owner}</td>
                <td className="border px-2 py-1">{task.deadline}</td>
                <td className="border px-2 py-1">{task.status}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-1 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}