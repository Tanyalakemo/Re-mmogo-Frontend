import React from "react";

function Dashboard() {
  return (
    <section className="card">
      <div className="card-header">
        <h2>Dashboard</h2>
        <span>Overview of your motshelo activity</span>
      </div>
      <p>Welcome back. Here is a summary of your motshelo group.</p>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Members</div>
          <div className="summary-value">0</div>
          <div className="summary-chip">Group size</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Monthly Contributions</div>
          <div className="summary-value">P0.00</div>
          <div className="summary-chip">Expected P1000/member</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Active Loans</div>
          <div className="summary-value">0</div>
          <div className="summary-chip">20% interest monthly</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Pending Approvals</div>
          <div className="summary-value">0</div>
          <div className="summary-chip">Loans & payments</div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;