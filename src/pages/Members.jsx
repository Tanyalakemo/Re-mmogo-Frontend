import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../Api";

function Members() {
  const [members, setMembers]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState("");
  const [groupId, setGroupId]     = useState("");
  const [searched, setSearched]   = useState(false);

  const fetchMembers = async (gId) => {
    try {
      setLoading(true);
      setServerError("");
      const response = await API.get(`/members/${gId}`);
      setMembers(response.data);
      setSearched(true);
    } catch (error) {
      setServerError(error.response?.data?.error || "Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!groupId.trim()) { setServerError("Please enter a Group ID"); return; }
    fetchMembers(groupId);
  };

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Group Members</h2>
          <span>Enroll and manage members in your motshelo group</span>
        </div>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter Group ID to search"
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cbd5f5", flex: 1 }}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        <Link to="/members/add" className="button-link">+ Add Member</Link>
      </section>

      <section className="table-container">
        <div className="card-header">
          <h3>Members List</h3>
          <span>All members currently in this group</span>
        </div>

        {serverError && <p style={{ color: "red" }}>{serverError}</p>}
        {loading && <p>Loading members...</p>}
        {!loading && searched && members.length === 0 && !serverError && (
          <p>No members found for this group.</p>
        )}
        {!loading && members.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined At</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
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