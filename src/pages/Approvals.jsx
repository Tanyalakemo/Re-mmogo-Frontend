import React, { useState } from "react";
import API from "../Api";

function Approvals() {
  const [loanId, setLoanId]         = useState("");
  const [signatoryId, setSignatoryId] = useState("");
  const [approvals, setApprovals]   = useState([]);
  const [loading, setLoading]       = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [serverError, setServerError]   = useState("");
  const [successMsg, setSuccessMsg]     = useState("");

  const handleApprove = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");
    if (!loanId || !signatoryId) {
      setServerError("Loan ID and Signatory ID are required");
      return;
    }
    try {
      setLoading(true);
      const response = await API.post("/approvals", { loanId, signatoryId });
      setSuccessMsg(
        `Approval recorded! Total approvals: ${response.data.approvals}/2. ${
          response.data.approvals >= 2
            ? "✅ Loan is now APPROVED!"
            : "⏳ Waiting for second signatory."
        }`
      );
      setLoanId("");
      setSignatoryId("");
    } catch (error) {
      setServerError(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchApprovals = async () => {
    if (!loanId) { setServerError("Enter a Loan ID to view approvals"); return; }
    try {
      setFetchLoading(true);
      setServerError("");
      const response = await API.get(`/approvals/${loanId}`);
      setApprovals(response.data);
    } catch (error) {
      setServerError(error.response?.data?.error || "Failed to load approvals.");
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Approvals</h2>
          <span>Signatories approve loan requests (2 approvals required)</span>
        </div>

        <div style={{
          background: "#e0f0ff", padding: "12px", borderRadius: "8px",
          marginBottom: "16px", fontSize: "14px", color: "#1a3a5c"
        }}>
          ℹ️ Two signatories must approve each loan before it is disbursed.
        </div>

        {serverError && <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>}
        {successMsg  && <p style={{ color: "green", marginBottom: "10px", whiteSpace: "pre-line" }}>{successMsg}</p>}

        <form onSubmit={handleApprove} noValidate>
          <label>Loan ID</label>
          <input type="text" value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            placeholder="Enter loan ID to approve" />

          <label>Signatory ID</label>
          <input type="text" value={signatoryId}
            onChange={(e) => setSignatoryId(e.target.value)}
            placeholder="Enter your signatory ID" />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Approving..." : "Approve Loan"}
            </button>
            <button type="button" onClick={handleFetchApprovals} disabled={fetchLoading}>
              {fetchLoading ? "Loading..." : "View Approvals"}
            </button>
          </div>
        </form>
      </section>

      {approvals.length > 0 && (
        <section className="table-container" style={{ marginTop: "16px" }}>
          <div className="card-header">
            <h3>Approvals for Loan #{loanId}</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Approval ID</th><th>Loan ID</th>
                <th>Signatory ID</th><th>Decision</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((approval) => (
                <tr key={approval.approval_id}>
                  <td>{approval.approval_id}</td>
                  <td>{approval.loan_id}</td>
                  <td>{approval.signatory_id}</td>
                  <td>
                    <span className="badge badge-success">{approval.decision}</span>
                  </td>
                  <td>
                    {approval.approved_at
                      ? new Date(approval.approved_at).toLocaleDateString()
                      : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

export default Approvals;