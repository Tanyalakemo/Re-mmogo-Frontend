import React, { useState } from "react";
import API from "../Api";

function Contributions() {
  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId]   = useState("");
  const [amount, setAmount]     = useState("1000");
  const [month, setMonth]       = useState("");
  const [status, setStatus]     = useState("pending");
  const [contributions, setContributions] = useState([]);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [serverError, setServerError]   = useState("");
  const [successMsg, setSuccessMsg]     = useState("");

  const validate = () => {
    const newErrors = {};
    if (!memberId.trim()) newErrors.memberId = "Member ID is required";
    if (!groupId.trim())  newErrors.groupId  = "Group ID is required";
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0)
      newErrors.amount = "Valid amount is required";
    if (!month) newErrors.month = "Month is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");
    if (!validate()) return;
    try {
      setLoading(true);
      await API.post("/contributions", {
        member_id: memberId,
        group_id:  groupId,
        amount:    parseFloat(amount),
        month,
        status,
      });
      setSuccessMsg("Contribution recorded successfully!");
      setMemberId("");
      setAmount("1000");
      setMonth("");
      setStatus("pending");
    } catch (error) {
      setServerError(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchContributions = async () => {
    if (!groupId) { setServerError("Enter a Group ID to view contributions"); return; }
    try {
      setFetchLoading(true);
      setServerError("");
      const response = await API.get(`/contributions/${groupId}`);
      setContributions(response.data);
    } catch (error) {
      setServerError(error.response?.data?.error || "Failed to load contributions.");
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Record Contribution</h2>
          <span>Log a monthly contribution (P1000/member)</span>
        </div>

        {serverError && <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>}
        {successMsg  && <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <label>Group ID</label>
          <input type="text" value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter group ID" />
          {errors.groupId && <small style={{ color: "red" }}>{errors.groupId}</small>}

          <label>Member ID</label>
          <input type="text" value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Enter member ID" />
          {errors.memberId && <small style={{ color: "red" }}>{errors.memberId}</small>}

          <label>Amount (P)</label>
          <input type="number" value={amount}
            onChange={(e) => setAmount(e.target.value)} min="0" step="0.01" />
          {errors.amount && <small style={{ color: "red" }}>{errors.amount}</small>}

          <label>Month</label>
          <input type="month" value={month}
            onChange={(e) => setMonth(e.target.value)} />
          {errors.month && <small style={{ color: "red" }}>{errors.month}</small>}

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="missed">Missed</option>
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Recording..." : "Record Contribution"}
            </button>
            <button type="button" onClick={handleFetchContributions} disabled={fetchLoading}>
              {fetchLoading ? "Loading..." : "View Contributions"}
            </button>
          </div>
        </form>
      </section>

      {contributions.length > 0 && (
        <section className="table-container" style={{ marginTop: "16px" }}>
          <div className="card-header">
            <h3>Contributions List</h3>
            <span>Group ID: {groupId}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Member ID</th><th>Amount</th>
                <th>Month</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.member_id}</td>
                  <td>P{Number(c.amount).toFixed(2)}</td>
                  <td>{c.month?.slice(0, 7)}</td>
                  <td>
                    <span className={`badge ${
                      c.status === "paid"   ? "badge-success" :
                      c.status === "missed" ? "badge-error"   : "badge-warning"
                    }`}>{c.status}</span>
                  </td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

export default Contributions;