// src/lib/api.js

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function getProjects() {
  const res = await fetch(`${API}/projects`);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}

export async function getTasks() {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export async function getProjectById(id) {
  const res = await fetch(`${API}/projects/${id}?_embed=tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  return res.json();
}
