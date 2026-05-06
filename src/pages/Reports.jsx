import React, { useState } from "react";
import API from "../Api";

function Reports() {
  const [groupId, setGroupId] = useState("");
  const [report, setReport] = useState(null);
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
      const [membersRes, contributionsRes, loansRes] = await Promise.all([
        API.get(`/members/${groupId}`),
        API.get(`/contributions/${groupId}`),
        API.get(`/loans/${groupId}`),
      ]);

      const members = membersRes.data;
      const contributions = contributionsRes.data;
      const loans = loansRes.data;

      // Calculate per-member stats
      const memberStats = members.map((member) => {
        const memberContributions = contributions.filter(
          (c) => c.member_id === member.id
        );
        const totalContributed = memberContributions.reduce(
          (sum, c) => sum + Number(c.amount), 0
        );

        const memberLoans = loans.filter((l) => l.member_id === member.id);
        const totalLoaned = memberLoans.reduce(
          (sum, l) => sum + Number(l.amount), 0
        );
        const totalInterest = memberLoans.reduce(
          (sum, l) => sum + (Number(l.amount) * 0.20), 0
        );
        const outstandingBalance = memberLoans
          .filter((l) => l.status !== "paid")
          .reduce((sum, l) => sum + Number(l.balance), 0);

        return {
          ...member,
          totalContributed,
          totalLoaned,
          totalInterest,
          outstandingBalance,
          contributionsMade: memberContributions.length,
          metTarget: totalContributed >= 12000,
        };
      });

      const totalContributions = contributions.reduce(
        (sum, c) => sum + Number(c.amount), 0
      );
      const totalInterestEarned = loans.reduce(
        (sum, l) => sum + (Number(l.amount) * 0.20), 0
      );
      const totalPayout = totalContributions + totalInterestEarned;
      const payoutPerMember = members.length > 0 ? totalPayout / members.length : 0;

      const topContributor = memberStats.reduce((top, m) =>
        m.totalContributed > (top?.totalContributed || 0) ? m : top, null
      );
      const mostInterest = memberStats.reduce((top, m) =>
        m.totalInterest > (top?.totalInterest || 0) ? m : top, null
      );

      setReport({
        members: memberStats,
        totalContributions,
        totalInterestEarned,
        totalPayout,
        payoutPerMember,
        topContributor,
        mostInterest,
        totalMembers: members.length,
      });
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

        {serverError && <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>}

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
              <h3>Group Summary</h3>
              <span>Group ID: {groupId}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              {[
                { label: "Total Members", value: report.totalMembers },
                { label: "Total Contributions", value: `P${report.totalContributions.toFixed(2)}` },
                { label: "Total Interest Earned", value: `P${report.totalInterestEarned.toFixed(2)}` },
                { label: "Total Payout Pool", value: `P${report.totalPayout.toFixed(2)}` },
                { label: "Payout Per Member", value: `P${report.payoutPerMember.toFixed(2)}` },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "#f0f9f4", borderRadius: "12px",
                  padding: "16px", textAlign: "center"
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
              <div style={{ background: "#fff8e0", padding: "12px", borderRadius: "8px", marginBottom: "8px" }}>
                🏆 <strong>Most Contributions:</strong> {report.topContributor.name} — P{report.topContributor.totalContributed.toFixed(2)}
              </div>
            )}
            {report.mostInterest && (
              <div style={{ background: "#e8f5e9", padding: "12px", borderRadius: "8px" }}>
                💰 <strong>Most Interest Generated:</strong> {report.mostInterest.name} — P{report.mostInterest.totalInterest.toFixed(2)}
              </div>
            )}
          </section>

          {/* Member Breakdown */}
          <section className="table-container" style={{ marginTop: "16px" }}>
            <div className="card-header">
              <h3>Member Breakdown</h3>
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
                  <th>P5000 Target</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody>
                {report.members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.contributionsMade}/12</td>
                    <td>P{member.totalContributed.toFixed(2)}</td>
                    <td>P{member.totalLoaned.toFixed(2)}</td>
                    <td>P{member.totalInterest.toFixed(2)}</td>
                    <td>P{member.outstandingBalance.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${member.metTarget ? "badge-success" : "badge-warning"}`}>
                        {member.metTarget ? "✅ Met" : "⚠️ Not Met"}
                      </span>
                    </td>
                    <td>P{report.payoutPerMember.toFixed(2)}</td>
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