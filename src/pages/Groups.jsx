import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../Api";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await API.get("/groups");
        setGroups(response.data);
      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to load groups. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Motshelo Groups</h2>
          <span>Register and manage groups</span>
        </div>

        <Link to="/groups/new" className="button-link">
          + Register New Group
        </Link>
      </section>

      <section className="table-container">
        <div className="card-header">
          <h3>Groups List</h3>
          <span>All registered Motshelo groups</span>
        </div>

        {loading && <p>Loading groups...</p>}

        {serverError && (
          <p style={{ color: "red" }}>{serverError}</p>
        )}

        {!loading && !serverError && groups.length === 0 && (
          <p>No groups registered yet.</p>
        )}

        {!loading && !serverError && groups.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.group_id}>
                  <td>{group.group_id}</td>
                  <td>{group.group_name}</td>
                  <td>{group.start_date}</td>
                  <td>
                    <span className={`badge ${group.status === "active" ? "badge-success" : "badge-warning"}`}>
                      {group.status}
                    </span>
                  </td>
                  <td>{new Date(group.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>
    </>
  );
}

export default Groups;