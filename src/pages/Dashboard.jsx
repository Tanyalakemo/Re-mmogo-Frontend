import React, { useState, useEffect } from "react";
import API from "../Api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    monthlyContributions: 0,
    activeLoans: 0,
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="card">
      <div className="card-header">
        <h2>Dashboard</h2>
        <span>Overview of your motshelo activity</span>
      </div>
      <p>Welcome back. Here is a summary of your motshelo group.</p>

      {serverError && (
        <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>
      )}

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Total Members</div>
            <div className="summary-value">{stats.totalMembers}</div>
            <div className="summary-chip">Group size</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Monthly Contributions</div>
            <div className="summary-value">P{Number(stats.monthlyContributions).toFixed(2)}</div>
            <div className="summary-chip">Expected P1000/member</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Active Loans</div>
            <div className="summary-value">{stats.activeLoans}</div>
            <div className="summary-chip">20% interest monthly</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Pending Approvals</div>
            <div className="summary-value">{stats.pendingApprovals}</div>
            <div className="summary-chip">Loans & payments</div>
          </div>
        </div>
      )}

    </section>
  );
}

export default Dashboard;