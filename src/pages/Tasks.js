import React, { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      alert("⚠️ Failed to load tasks. Check backend connection.");
    }
  };

  // Save or update a task
  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        // ✅ Use id (MySQL) instead of _id
        await api.put(`/tasks/${editingTask.id}`, taskData);
        alert("✅ Task updated successfully!");
      } else {
        await api.post("/tasks", taskData);
        alert("✅ Task created successfully!");
      }
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert("❌ Save failed. Please check your input or backend API.");
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      alert("🗑️ Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("❌ Delete failed. Check backend or task ID.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <h2>Manage Your Tasks</h2>

      <TaskForm
        onSubmit={handleSave}
        initialData={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <span
  className={`status ${task.status?.toLowerCase().replace(/\s+/g, "-")}`}
>
  {task.status}
</span>

              </div>
              <div className="task-actions">
                <button
                  className="btn edit-btn"
                  onClick={() => setEditingTask(task)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
