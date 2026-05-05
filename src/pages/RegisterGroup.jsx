import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

function RegisterGroup() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!groupName.trim()) {
      newErrors.groupName = "Group name is required";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      return;
    }

    const groupData = {
      group_name: groupName,
      start_date: startDate,
      status,
    };

    try {
      setLoading(true);
      await API.post("/groups", groupData);
      alert("Group registered successfully!");
      navigate("/groups");
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
        <h2>Register New Group</h2>
        <span>Create a new Motshelo group</span>
      </div>

      {serverError && (
        <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>

        <label htmlFor="groupName">Group Name</label>
        <input
          id="groupName"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
        />
        {errors.groupName && (
          <small style={{ color: "red" }}>{errors.groupName}</small>
        )}

        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && (
          <small style={{ color: "red" }}>{errors.startDate}</small>
        )}

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && (
          <small style={{ color: "red" }}>{errors.status}</small>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Group"}
        </button>

      </form>
    </section>
  );
}

export default RegisterGroup;