import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

function Contributions() {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("1000.00");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("pending");
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!memberId.trim()) {
      newErrors.memberId = "Member ID is required";
    }

    if (!groupId.trim()) {
      newErrors.groupId = "Group ID is required";
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }

    if (!month) {
      newErrors.month = "Month is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    setProofOfPayment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("member_id", memberId);
      formData.append("group_id", groupId);
      formData.append("amount", parseFloat(amount));
      formData.append("month", month);
      formData.append("status", status);
      if (proofOfPayment) {
        formData.append("proof_of_payment", proofOfPayment);
      }

      await API.post("/contributions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Contribution recorded successfully!");
      navigate("/contributions");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-container">
      <div className="card-header">
        <h2>Record Contribution</h2>
        <span>Log a monthly contribution for a group member</span>
      </div>

      {serverError && (
        <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>

        <label htmlFor="memberId">Member ID</label>
        <input
          id="memberId"
          type="text"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Enter the member ID"
        />
        {errors.memberId && (
          <small style={{ color: "red" }}>{errors.memberId}</small>
        )}

        <label htmlFor="groupId">Group ID</label>
        <input
          id="groupId"
          type="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          placeholder="Enter the group ID"
        />
        {errors.groupId && (
          <small style={{ color: "red" }}>{errors.groupId}</small>
        )}

        <label htmlFor="amount">Amount (P)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        {errors.amount && (
          <small style={{ color: "red" }}>{errors.amount}</small>
        )}

        <label htmlFor="month">Month</label>
        <input
          id="month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        {errors.month && (
          <small style={{ color: "red" }}>{errors.month}</small>
        )}

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="missed">Missed</option>
        </select>
        {errors.status && (
          <small style={{ color: "red" }}>{errors.status}</small>
        )}

        <label htmlFor="proofOfPayment">Proof of Payment</label>
        <input
          id="proofOfPayment"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
        <small style={{ color: "#6b7280" }}>
          Optional — upload a screenshot or PDF receipt
        </small>

        <button type="submit" disabled={loading}>
          {loading ? "Recording..." : "Record Contribution"}
        </button>

      </form>
    </section>
  );
}

export default Contributions;