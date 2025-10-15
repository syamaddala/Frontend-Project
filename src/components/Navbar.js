import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ onLogout, role }) {
  const nav = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    nav("/login");
  };

  return (
    <nav
      style={{
        padding: "10px",
        background: "#333",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/dashboard" style={{ marginRight: "1rem", color: "#fff" }}>
          Dashboard
        </Link>
        <Link to="/tasks" style={{ marginRight: "1rem", color: "#fff" }}>
          Tasks
        </Link>

        {/* ✅ Visible only to Admins */}
        {role === "admin" && (
          <Link to="/admin" style={{ marginRight: "1rem", color: "#0ff" }}>
            Admin
          </Link>
        )}
      </div>

      <button
        onClick={handleLogoutClick}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
