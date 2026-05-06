import React, { useState } from "react";
import API from "../Api";

function Reports() {
  const [groupId, setGroupId] = useState("");
  const [report, setReport]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setServerError("");
    setReport(null);

    if (!groupId) {
      setServerError("Group ID is required");
      return;
    }

    try {
      setLoading(true);
      const response = await API.get(`/reports/yearly/${groupId}`);
      setReport(response.data);
    } catch (error) {
      setServerError(error.response?.data?.error || "Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Year-End Reports</h2>
          <span>Generate annual summary for your Motshelo group</span>
        </div>

        {serverError && (
          <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>
        )}

        <form onSubmit={handleGenerateReport} noValidate>
          <label>Group ID</label>
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter group ID"
          />
          <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </form>
      </section>

      {report && (
        <>
          {/* Summary Cards */}
          <section className="card" style={{ marginTop: "16px" }}>
            <div className="card-header">
              <h3>Group Summary — Group ID: {groupId}</h3>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginBottom: "16px"
            }}>
              {[
                { label: "Total Members",         value: report.members?.length },
                { label: "Total Contributions",   value: `P${Number(report.totalContributions).toFixed(2)}` },
                { label: "Total Interest Earned", value: `P${Number(report.totalInterest).toFixed(2)}` },
                { label: "Total Payout Pool",     value: `P${Number(report.totalPayout).toFixed(2)}` },
                { label: "Payout Per Member",     value: `P${Number(report.payoutPerMember).toFixed(2)}` },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "#f0f9f4",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "#1a4a2e" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "4px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {report.topContributor && (
              <div style={{
                background: "#fff8e0", padding: "12px",
                borderRadius: "8px", marginBottom: "8px"
              }}>
                🏆 <strong>Most Contributions:</strong> {report.topContributor.name} —
                P{Number(report.topContributor.total_contributions).toFixed(2)}
              </div>
            )}

            {report.mostInterest && (
              <div style={{
                background: "#e8f5e9", padding: "12px", borderRadius: "8px"
              }}>
                💰 <strong>Most Interest Generated:</strong> {report.mostInterest.name} —
                P{Number(report.mostInterest.total_interest).toFixed(2)}
              </div>
            )}
          </section>

          {/* Member Breakdown Table */}
          <section className="table-container" style={{ marginTop: "16px" }}>
            <div className="card-header">
              <h3>Member Breakdown</h3>
              <span>Individual performance for the year</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Contributions Made</th>
                  <th>Total Contributed</th>
                  <th>Total Loaned</th>
                  <th>Interest Generated</th>
                  <th>Outstanding Balance</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody>
                {report.members?.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.contributions_count}</td>
                    <td>P{Number(member.total_contributions).toFixed(2)}</td>
                    <td>P{Number(member.total_loans).toFixed(2)}</td>
                    <td>P{Number(member.total_interest).toFixed(2)}</td>
                    <td>P{Number(member.outstanding_balance).toFixed(2)}</td>
                    <td>P{Number(report.payoutPerMember).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
}

export default Reports;