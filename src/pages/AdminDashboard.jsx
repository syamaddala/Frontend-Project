import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
      alert("❌ Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id && task._id !== id));
      alert("🗑️ Task deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("❌ Failed to delete task.");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="admin-dashboard">
      <h2>🛠 Admin Dashboard</h2>
      <p>All tasks in the system</p>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.status}</td>
                <td>{t.userId || t.user_id}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(t._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
