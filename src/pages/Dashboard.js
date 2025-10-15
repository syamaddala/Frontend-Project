import React from "react";
import "./Dashboard.css"; // optional, if you want custom styles

function Dashboard() {
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="dashboard-container">
      <h2>Welcome to PrimeTrade Dashboard</h2>
      <p className="lead">
        {userEmail ? `Logged in as ${userEmail}` : "You’re logged in!"}
      </p>
      <p>Use the navigation bar to view and manage your tasks.</p>
    </div>
  );
}

export default Dashboard;
