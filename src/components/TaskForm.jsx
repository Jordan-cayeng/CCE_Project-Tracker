// src/components/TaskForm.jsx
import React, { useState } from "react";

export default function TaskForm({ onAddTask, projectId }) {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    deadline: "",
    status: "Not Started",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.owner || !formData.deadline) {
      alert("Please fill out all fields.");
      return;
    }

    const newTask = {
      id: Date.now().toString(), // temporary unique ID
      projectId,
      ...formData,
    };

    onAddTask(newTask);

    // Reset form
    setFormData({
      name: "",
      owner: "",
      deadline: "",
      status: "Not Started",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-3">Add New Task</h2>

      <div className="flex flex-wrap gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Task Name"
          className="border rounded p-2 flex-1 min-w-[150px]"
        />

        <input
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="Owner"
          className="border rounded p-2 flex-1 min-w-[150px]"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Waiting on Client</option>
          <option>In Review</option>
          <option>Complete</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>
    </form>
  );
}