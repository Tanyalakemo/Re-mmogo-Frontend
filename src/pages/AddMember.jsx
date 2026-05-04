import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMember() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

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

    if (!role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const memberData = { fullName, email, phone, role };
    console.log("New member:", memberData);

    alert("Member added (demo). Later this will save to the database.");
    navigate("/members");
  };

  return (
    <section className="form-container">
      <div className="card-header">
        <h2>Add Member</h2>
        <span>Enroll a new member into your motshelo group</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
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

        <button type="submit">Save Member</button>
      </form>
    </section>
  );
}

export default AddMember;