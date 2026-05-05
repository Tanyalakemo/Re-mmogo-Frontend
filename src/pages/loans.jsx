import React, { useState } from "react";
import API from "../Api";

function Loans() {
  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRequestLoan = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    if (!memberId || !groupId || !amount) {
      setServerError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/loans", { memberId, groupId, amount });
      setSuccessMsg("Loan requested successfully! Awaiting signatory approval.");
      setMemberId("");
      setGroupId("");
      setAmount("");
    } catch (error) {
      setServerError(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchLoans = async () => {
    if (!groupId) {
      setServerError("Enter a Group ID to fetch loans");
      return;
    }
    try {
      setFetchLoading(true);
      const response = await API.get(`/loans/${groupId}`);
      setLoans(response.data);
    } catch (error) {
      setServerError(error.response?.data?.error || "Failed to load loans.");
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Loans</h2>
          <span>Request and manage member loans (20% interest/month)</span>
        </div>

        {serverError && <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>}
        {successMsg && <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>}

        <form onSubmit={handleRequestLoan} noValidate>
          <label>Group ID</label>
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter group ID"
          />

          <label>Member ID</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Enter member ID"
          />

          <label>Loan Amount (P)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Requesting..." : "Request Loan"}
            </button>
            <button type="button" onClick={handleFetchLoans} disabled={fetchLoading}>
              {fetchLoading ? "Loading..." : "View Group Loans"}
            </button>
          </div>
        </form>
      </section>

      {loans.length > 0 && (
        <section className="table-container">
          <div className="card-header">
            <h3>Loans List</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Member ID</th>
                <th>Amount (P)</th>
                <th>Balance (P)</th>
                <th>Status</th>
                <th>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.member_id}</td>
                  <td>P{Number(loan.amount).toFixed(2)}</td>
                  <td>P{Number(loan.balance).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${
                      loan.status === "approved" ? "badge-success" :
                      loan.status === "rejected" ? "badge-error" :
                      "badge-warning"
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td>{new Date(loan.applied_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

export default Loans;