import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "In Progress",
    startDate: "",
  });
  const [newNote, setNewNote] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* ---------------- Fetch data ---------------- */
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/projects").then((r) => r.json()),
      fetch("http://localhost:3001/tasks").then((r) => r.json()),
    ])
      .then(([p, t]) => {
        setProjects(p);
        setTasks(t);
        setLoading(false);
      })
      .catch((e) => console.error("Error loading data:", e));
  }, []);

  /* ---------------- Dropdown behavior ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
      setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div className="text-cce-light">Loading projects...</div>;

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const projectTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject.id)
    : [];

  /* ---------------- Update helpers ---------------- */
  const handleUpdateTask = async (id, field, value) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, [field]: value, lastUpdated: new Date().toISOString() } : t
    );
    setTasks(updated);
    const task = updated.find((x) => x.id === id);
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  };

  /* ---------------- Add new task ---------------- */
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!selectedProject) return alert("Select a project first.");
    if (!newTask.name.trim()) return alert("Task name required.");
    const entry = {
      id: `T${Date.now()}`,
      projectId: selectedProject.id,
      ...newTask,
      startDate: newTask.startDate || new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString(),
      notes: [],
      subtasks: [],
    };
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (res.ok) {
      setTasks([...tasks, entry]);
      setNewTask({ name: "", description: "", status: "In Progress", startDate: "" });
    }
  };

  /* ---------------- Add note to task ---------------- */
  const handleAddNote = async (taskId) => {
    if (!newNote[taskId]?.trim()) return;
    const copy = [...tasks];
    const i = copy.findIndex((t) => t.id === taskId);
    const task = copy[i];
    const note = {
      id: `N${Date.now()}`,
      text: newNote[taskId],
      author: "System User",
      timestamp: new Date().toISOString(),
    };
    task.notes.push(note);
    await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    copy[i] = task;
    setTasks(copy);
    setNewNote({ ...newNote, [taskId]: "" });
  };

  return (
    <div className="space-y-6 relative text-white">
      <h1 className="text-2xl font-semibold text-cce-light">Projects</h1>

      {/* --- Search dropdown --- */}
      <div ref={dropdownRef} className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search or select a project..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full border border-cce-gray/60 bg-white text-cce-dark rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cce-light"
        />

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto bg-white text-cce-dark border border-cce-gray rounded-md shadow-2xl"
            >
              {filteredProjects.map((p) => (
                <li
                  key={p.id}
                  onMouseDown={() => {
                    setSelectedProject(p);
                    setSearchQuery(p.name);
                    setIsDropdownOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-cce-light/40 cursor-pointer"
                >
                  {p.name}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* --- Tasks Section --- */}
      {selectedProject && (
        <>
          <h2 className="text-lg font-semibold text-cce-light">
            Tasks for {selectedProject.name}
          </h2>

          {projectTasks.map((t) => (
            <div
              key={t.id}
              className="bg-white text-cce-dark border border-cce-gray rounded-xl shadow-card p-4 space-y-3 mt-4"
            >
              {/* Divider above task */}
              <div className="border-t border-cce-gray/70 mb-2"></div>

              {/* Task Header */}
              <h3 className="text-md font-semibold">{t.name}</h3>

              {/* Description and Status */}
              <textarea
                value={t.description}
                onChange={(e) => handleUpdateTask(t.id, "description", e.target.value)}
                className="w-full border border-cce-gray/70 rounded-md px-3 py-2 resize-none"
              />
              <select
                value={t.status}
                onChange={(e) => handleUpdateTask(t.id, "status", e.target.value)}
                className="border border-cce-gray/70 rounded-md px-3 py-2"
              >
                <option>In Progress</option>
                <option>Complete</option>
                <option>Waiting on Client</option>
              </select>

              {/* --- Task Notes --- */}
              <h4 className="font-semibold mt-2">Notes</h4>
              <ul className="text-sm space-y-1">
                {t.notes?.map((n) => (
                  <li key={n.id} className="border-b border-cce-gray/30 pb-1">
                    <span className="font-semibold">{n.author}:</span> {n.text}
                  </li>
                ))}
              </ul>

              <textarea
                placeholder="Add note..."
                value={newNote[t.id] || ""}
                onChange={(e) => setNewNote({ ...newNote, [t.id]: e.target.value })}
                className="w-full border border-cce-gray/70 rounded-md px-2 py-1 text-sm resize-none"
              />
              <button
                onClick={() => handleAddNote(t.id)}
                className="mt-1 bg-cce-light text-cce-dark px-2 py-1 rounded-md text-sm font-semibold hover:bg-cce-gray"
              >
                Add Note
              </button>

              {/* --- Subtasks --- */}
              <div className="mt-4 bg-cce-gray/10 p-3 rounded-md">
                <h4 className="font-semibold text-cce-dark mb-2">Subtasks</h4>
                {t.subtasks?.map((s) => (
                  <div
                    key={s.id}
                    className="border border-cce-gray/40 rounded-md p-2 mb-3 bg-white/90"
                  >
                    {/* Subtask header */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                      <input
                        value={s.name}
                        onChange={(e) => {
                          const updated = t.subtasks.map((x) =>
                            x.id === s.id ? { ...x, name: e.target.value } : x
                          );
                          handleUpdateTask(t.id, "subtasks", updated);
                        }}
                        className="flex-1 border border-cce-gray/60 rounded-md px-2 py-1 text-sm"
                      />
                      <select
                        value={s.status}
                        onChange={(e) => {
                          const updated = t.subtasks.map((x) =>
                            x.id === s.id ? { ...x, status: e.target.value } : x
                          );
                          handleUpdateTask(t.id, "subtasks", updated);
                        }}
                        className="border border-cce-gray/60 rounded-md px-2 py-1 text-sm"
                      >
                        <option>In Progress</option>
                        <option>Complete</option>
                        <option>Waiting</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Assign employee..."
                        value={s.assignedTo || ""}
                        onChange={(e) => {
                          const updated = t.subtasks.map((x) =>
                            x.id === s.id
                              ? { ...x, assignedTo: e.target.value }
                              : x
                          );
                          handleUpdateTask(t.id, "subtasks", updated);
                        }}
                        className="border border-cce-gray/60 rounded-md px-2 py-1 text-sm"
                      />
                    </div>

                    {/* Subtask notes */}
                    <ul className="mt-1 space-y-1 text-sm">
                      {s.notes?.map((n) => (
                        <li
                          key={n.id}
                          className="border-b border-cce-gray/30 pb-1"
                        >
                          <span className="font-semibold">{n.author}:</span>{" "}
                          {n.text}
                        </li>
                      ))}
                    </ul>

                    {/* Add subtask note */}
                    <textarea
                      placeholder="Add subtask note..."
                      value={newNote[`subtask-${s.id}`] || ""}
                      onChange={(e) =>
                        setNewNote({
                          ...newNote,
                          [`subtask-${s.id}`]: e.target.value,
                        })
                      }
                      className="w-full border border-cce-gray/70 rounded-md px-2 py-1 text-sm resize-none mt-1"
                    />
                    <button
                      onClick={async () => {
                        if (!newNote[`subtask-${s.id}`]?.trim()) return;
                        const note = {
                          id: `SN${Date.now()}`,
                          text: newNote[`subtask-${s.id}`],
                          author: "System User",
                          timestamp: new Date().toISOString(),
                        };
                        const updated = t.subtasks.map((x) =>
                          x.id === s.id
                            ? { ...x, notes: [...(x.notes || []), note] }
                            : x
                        );
                        await handleUpdateTask(t.id, "subtasks", updated);
                        setNewNote({ ...newNote, [`subtask-${s.id}`]: "" });
                      }}
                      className="mt-1 bg-cce-light text-cce-dark px-2 py-1 rounded-md text-sm font-semibold hover:bg-cce-gray"
                    >
                      Add Subtask Note
                    </button>
                  </div>
                ))}

                {/* Add new subtask */}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="New subtask name..."
                    value={newNote[`subtask-${t.id}`]?.name || ""}
                    onChange={(e) =>
                      setNewNote({
                        ...newNote,
                        [`subtask-${t.id}`]: { name: e.target.value },
                      })
                    }
                    className="w-full border border-cce-gray/70 rounded-md px-2 py-1 text-sm"
                  />
                  <button
                    onClick={async () => {
                      const name = newNote[`subtask-${t.id}`]?.name || "";
                      if (!name.trim()) return;
                      const sub = {
                        id: `S${Date.now()}`,
                        name,
                        assignedTo: "",
                        status: "In Progress",
                        notes: [],
                      };
                      const updated = [...(t.subtasks || []), sub];
                      await handleUpdateTask(t.id, "subtasks", updated);
                      setNewNote({ ...newNote, [`subtask-${t.id}`]: {} });
                    }}
                    className="mt-2 bg-cce-light text-cce-dark px-2 py-1 rounded-md text-sm font-semibold hover:bg-cce-gray"
                  >
                    Add Subtask
                  </button>
                </div>
              </div>

              {/* Divider below task */}
              <div className="border-t border-cce-gray/70 mt-2"></div>
            </div>
          ))}

          {/* --- Add new task form --- */}
          <form
            onSubmit={handleAddTask}
            className="bg-white text-cce-dark border border-cce-gray rounded-xl shadow-card p-4 space-y-3"
          >
            <h3 className="text-md font-semibold text-cce-dark">Add New Task</h3>
            <input
              type="text"
              placeholder="Task name"
              value={newTask.name}
              onChange={(e) =>
                setNewTask({ ...newTask, name: e.target.value })
              }
              className="w-full border border-cce-gray/70 rounded-md px-3 py-2"
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full border border-cce-gray/70 rounded-md px-3 py-2 resize-none"
            />
            <input
              type="date"
              value={newTask.startDate}
              onChange={(e) =>
                setNewTask({ ...newTask, startDate: e.target.value })
              }
              className="w-full border border-cce-gray/70 rounded-md px-3 py-2"
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="w-full border border-cce-gray/70 rounded-md px-3 py-2"
            >
              <option>In Progress</option>
              <option>Complete</option>
              <option>Waiting on Client</option>
            </select>
            <button
              type="submit"
              className="bg-cce-light text-cce-dark px-4 py-2 rounded-md font-semibold hover:bg-cce-gray transition-colors"
            >
              Save Task
            </button>
          </form>
        </>
      )}
    </div>
  );
}
