import React from "react";
import { Link } from "react-router-dom";

function Members() {
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

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row for now */}
            <tr>
              <td>Example Member</td>
              <td>member@example.com</td>
              <td>+267 71 000 000</td>
              <td>Member</td>
              <td>
                <span className="badge badge-success">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Members;