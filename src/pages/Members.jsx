import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../Api";

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await API.get("/members");
        setMembers(response.data);
      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to load members. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Group Members</h2>
          <span>Enroll and manage members in your motshelo group</span>
        </div>
        <p>Here you can view all registered members and add new ones.</p>
        <Link to="/members/add" className="button-link">
          + Add Member
        </Link>
      </section>

      <section className="table-container">
        <div className="card-header">
          <h3>Members List</h3>
          <span>All members currently in this group</span>
        </div>

        {loading && <p>Loading members...</p>}

        {serverError && (
          <p style={{ color: "red" }}>{serverError}</p>
        )}

        {!loading && !serverError && members.length === 0 && (
          <p>No members registered yet.</p>
        )}

        {!loading && !serverError && members.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined At</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.member_id}>
                  <td>{member.full_name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone || "—"}</td>
                  <td>{member.role}</td>
                  <td>{new Date(member.joined_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>
    </>
  );
}

export default Members;