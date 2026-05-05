import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

function AddMember() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [groupId, setGroupId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Email is not valid";
    }

    if (!groupId.trim()) {
      newErrors.groupId = "Group ID is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm the password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!role) {
      newErrors.role = "Please select a role";
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

    const memberData = {
      full_name: fullName,
      email,
      phone,
      role,
      group_id: groupId,
      password,
    };

    try {
      setLoading(true);
      await API.post("/members", memberData);
      alert("Member added successfully!");
      navigate("/members");
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
        <h2>Add Member</h2>
        <span>Enroll a new member into your motshelo group</span>
      </div>

      {serverError && (
        <p style={{ color: "red", marginBottom: "10px" }}>{serverError}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>

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

        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && (
          <small style={{ color: "red" }}>{errors.fullName}</small>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <small style={{ color: "red" }}>{errors.email}</small>
        )}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Optional"
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select role</option>
          <option value="member">Member</option>
          <option value="signatory">Signatory</option>
        </select>
        {errors.role && (
          <small style={{ color: "red" }}>{errors.role}</small>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 6 characters"
        />
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <small style={{ color: "red" }}>{errors.confirmPassword}</small>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Member"}
        </button>

      </form>
    </section>
  );
}

export default AddMember;